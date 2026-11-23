import {act} from 'react';
import {createRoot, Root} from 'react-dom/client';

import {createPostImage} from 'api/postImages';
import {MAX_POST_IMAGES} from 'constants/general';
import {PostImage} from 'types';
import {displayErrorToast} from 'utils/toasts';

import usePostImages from './usePostImages';

jest.mock('api/postImages', () => ({createPostImage: jest.fn()}));
jest.mock('utils/toasts', () => ({displayErrorToast: jest.fn()}));

(globalThis as {IS_REACT_ACT_ENVIRONMENT?: boolean}).IS_REACT_ACT_ENVIRONMENT = true;

const upload = createPostImage as jest.MockedFunction<typeof createPostImage>;

const existingImages: PostImage[] = [
  {id: 1, image: 'https://example.test/media/images/1.png'},
  {id: 2, image: 'https://example.test/media/images/2.png'},
];

let container: HTMLDivElement;
let hook: ReturnType<typeof usePostImages>;
let root: Root;

const Form = ({initialImages}: {initialImages?: PostImage[]}) => {
  hook = usePostImages(initialImages);
  return null;
};

const makeFile = (name: string, type = 'image/png') => new File(['content'], name, {type});

const renderForm = (initialImages?: PostImage[]) => {
  act(() => {
    root.render(<Form initialImages={initialImages} />);
  });
};

beforeEach(() => {
  let objectUrlCount = 0;
  URL.createObjectURL = jest.fn(() => {
    objectUrlCount += 1;
    return `blob:${objectUrlCount}`;
  });
  URL.revokeObjectURL = jest.fn();
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
});

describe('usePostImages', () => {
  it('starts with the images of the post and tracks whether they changed', () => {
    renderForm(existingImages);
    expect(hook.images.map(({id, url}) => [id, url])).toEqual(existingImages.map(({id, image}) => [id, image]));
    expect(hook.hasImageChanges).toBe(false);

    act(() => hook.addImages([makeFile('new.png')]));
    expect(hook.images).toHaveLength(3);
    expect(hook.hasImageChanges).toBe(true);

    act(() => hook.removeImage(hook.images[2].key));
    expect(hook.hasImageChanges).toBe(false);
    expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:1');

    act(() => hook.removeImage(hook.images[0].key));
    expect(hook.images.map(({id}) => id)).toEqual([2]);
    expect(hook.hasImageChanges).toBe(true);
  });

  it('takes only image files and no more images than a post can have', () => {
    renderForm(existingImages);

    act(() => hook.addImages([makeFile('notes.txt', 'text/plain'), makeFile('photo.png')]));
    expect(hook.images).toHaveLength(3);
    expect(displayErrorToast).not.toHaveBeenCalled();

    act(() => hook.addImages(Array.from({length: MAX_POST_IMAGES}, (_, index) => makeFile(`${index}.png`))));
    expect(hook.images).toHaveLength(MAX_POST_IMAGES);
    expect(displayErrorToast).toHaveBeenCalledWith(`A post can have up to ${MAX_POST_IMAGES} images`);
  });

  it('uploads the new images and returns every id in order', async () => {
    upload.mockResolvedValueOnce({id: 7, image: 'https://example.test/media/images/7.png'});
    renderForm(existingImages);
    act(() => hook.addImages([makeFile('new.png')]));

    let imageIds: number[] | null = null;
    await act(async () => {
      imageIds = await hook.uploadImages();
    });

    expect(imageIds).toEqual([1, 2, 7]);
    expect(hook.uploadProgress).toBeNull();
  });

  it('shows why an upload failed and returns nothing to submit', async () => {
    upload.mockRejectedValueOnce(new Error('Network Error'));
    renderForm();
    act(() => hook.addImages([makeFile('new.png')]));

    let imageIds: number[] | null = [];
    await act(async () => {
      imageIds = await hook.uploadImages();
    });

    expect(imageIds).toBeNull();
    expect(displayErrorToast).toHaveBeenCalledWith('Error uploading image 1');
  });

  it('cancels the upload and the submission when the form is closed meanwhile', async () => {
    upload.mockImplementation(
      (_file, signal) =>
        new Promise((_resolve, reject) => {
          signal?.addEventListener('abort', () => reject(Object.assign(new Error('canceled'), {code: 'ERR_CANCELED'})));
        }),
    );
    renderForm();
    act(() => hook.addImages([makeFile('first.png'), makeFile('second.png')]));

    let submission: Promise<number[] | null> = Promise.resolve([]);
    act(() => {
      submission = hook.uploadImages();
    });
    act(() => root.unmount());

    expect(await submission).toBeNull();
    expect(upload).toHaveBeenCalledTimes(1);
    expect(displayErrorToast).not.toHaveBeenCalled();
    expect(URL.revokeObjectURL).toHaveBeenCalledTimes(2);
  });

  it('does not submit when the form is closed just as the last upload finishes', async () => {
    let finishUpload: (image: PostImage) => void = () => undefined;
    upload.mockImplementation(
      () =>
        new Promise((resolve) => {
          finishUpload = resolve;
        }),
    );
    renderForm();
    act(() => hook.addImages([makeFile('only.png')]));

    let submission: Promise<number[] | null> = Promise.resolve([]);
    act(() => {
      submission = hook.uploadImages();
    });
    act(() => root.unmount());
    finishUpload({id: 9, image: 'https://example.test/media/images/9.png'});

    expect(await submission).toBeNull();
  });
});
