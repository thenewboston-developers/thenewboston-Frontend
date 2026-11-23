import {createPostImage} from 'api/postImages';
import {PostImageDraft} from 'types';

import {getPostImageDraft, getPostImagesErrorMessage, uploadPostImages} from './postImages';

jest.mock('api/postImages', () => ({
  createPostImage: jest.fn(),
}));

const upload = createPostImage as jest.MockedFunction<typeof createPostImage>;

const makeFileDraft = (key: string): PostImageDraft => ({
  file: new File(['image'], `${key}.png`, {type: 'image/png'}),
  key,
  url: `blob:${key}`,
});

describe('uploadPostImages', () => {
  it('uploads only the new images, one at a time, and returns every id in form order', async () => {
    const existing = getPostImageDraft({id: 5, image: 'https://example.test/media/images/five.png'});
    const first = makeFileDraft('first');
    const second = makeFileDraft('second');
    const uploadedImageIds = new Map<string, number>();
    const onProgress = jest.fn();
    let activeUploads = 0;
    let nextId = 10;

    upload.mockImplementation(async () => {
      activeUploads += 1;
      expect(activeUploads).toBe(1);
      await Promise.resolve();
      activeUploads -= 1;
      nextId += 1;
      return {id: nextId, image: `https://example.test/media/images/${nextId}.png`};
    });

    const imageIds = await uploadPostImages([first, existing, second], uploadedImageIds, onProgress);

    expect(imageIds).toEqual([11, 5, 12]);
    expect(upload.mock.calls).toEqual([
      [first.file, undefined],
      [second.file, undefined],
    ]);
    expect(onProgress.mock.calls).toEqual([[{current: 1, total: 2}], [{current: 2, total: 2}]]);
    expect(Array.from(uploadedImageIds)).toEqual([
      ['first', 11],
      ['second', 12],
    ]);
  });

  it('does not upload a file again when the form is submitted after a failure', async () => {
    const drafts = [makeFileDraft('first'), makeFileDraft('second'), makeFileDraft('third')];
    const uploadedImageIds = new Map<string, number>();

    upload.mockResolvedValueOnce({id: 1, image: 'https://example.test/media/images/1.png'});
    upload.mockRejectedValueOnce(new Error('Network Error'));

    await expect(uploadPostImages(drafts, uploadedImageIds, jest.fn())).rejects.toThrow('Error uploading image 2');
    expect(upload).toHaveBeenCalledTimes(2);

    upload.mockResolvedValueOnce({id: 2, image: 'https://example.test/media/images/2.png'});
    upload.mockResolvedValueOnce({id: 3, image: 'https://example.test/media/images/3.png'});
    const onProgress = jest.fn();

    expect(await uploadPostImages(drafts, uploadedImageIds, onProgress)).toEqual([1, 2, 3]);
    expect(upload).toHaveBeenCalledTimes(4);
    expect(upload.mock.calls.map(([file]) => file.name)).toEqual([
      'first.png',
      'second.png',
      'second.png',
      'third.png',
    ]);
    expect(onProgress.mock.calls).toEqual([[{current: 1, total: 2}], [{current: 2, total: 2}]]);
  });

  it('reports the reason the API gives for rejecting an image and the position of that image in the form', async () => {
    const drafts = [
      getPostImageDraft({id: 5, image: 'https://example.test/media/images/five.png'}),
      makeFileDraft('new'),
    ];
    upload.mockRejectedValueOnce({
      response: {data: {image: [{code: 'invalid_image', message: 'Upload a valid image.'}]}},
    });

    await expect(uploadPostImages(drafts, new Map(), jest.fn())).rejects.toThrow('Image 2: Upload a valid image.');
  });

  it('stops uploading when it is aborted and reports that as a cancellation', async () => {
    const abortController = new AbortController();
    const cancellation = Object.assign(new Error('canceled'), {code: 'ERR_CANCELED'});
    const drafts = [makeFileDraft('first'), makeFileDraft('second'), makeFileDraft('third')];
    const uploadedImageIds = new Map<string, number>();

    upload.mockResolvedValueOnce({id: 1, image: 'https://example.test/media/images/1.png'});
    upload.mockImplementationOnce(async () => {
      abortController.abort();
      throw cancellation;
    });

    await expect(uploadPostImages(drafts, uploadedImageIds, jest.fn(), abortController.signal)).rejects.toBe(
      cancellation,
    );
    expect(upload).toHaveBeenCalledTimes(2);
    expect(upload.mock.calls[1]).toEqual([drafts[1].file, abortController.signal]);
    expect(Array.from(uploadedImageIds)).toEqual([['first', 1]]);
  });

  it('reports the reason the API gives for refusing uploads', async () => {
    upload.mockRejectedValueOnce({
      response: {data: {non_field_errors: [{code: 'invalid', message: 'You have too many images.'}]}},
    });

    await expect(uploadPostImages([makeFileDraft('first')], new Map(), jest.fn())).rejects.toThrow(
      'You have too many images.',
    );
  });
});

describe('getPostImagesErrorMessage', () => {
  it('reads the error about the listed images from a post API error', () => {
    const error = {response: {data: {image_ids: [{code: 'invalid', message: 'Invalid image ids: 4'}]}}};

    expect(getPostImagesErrorMessage(error)).toBe('Invalid image ids: 4');
  });

  it('ignores other errors', () => {
    expect(getPostImagesErrorMessage({response: {data: {content: [{message: 'This field is required.'}]}}})).toBeNull();
    expect(getPostImagesErrorMessage(new Error('Network Error'))).toBeNull();
  });
});
