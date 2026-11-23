import {createPostImage} from 'api/postImages';
import {PostImage, PostImageDraft, PostImageUploadProgress} from 'types';
import {isCancellationError} from 'utils/errors';
import {extractErrorMessage} from 'utils/forms';

let draftCount = 0;

export const createPostImageDraft = (file: File): PostImageDraft => {
  draftCount += 1;
  return {file, key: `file-${draftCount}`, url: URL.createObjectURL(file)};
};

export const getPostImageDraft = ({id, image}: PostImage): PostImageDraft => {
  return {id, key: `image-${id}`, url: image};
};

/**
 * The message of an API error about the images listed for a post, which no field of the post form can display.
 */
export const getPostImagesErrorMessage = (error: any): string | null => {
  return extractErrorMessage(error?.response?.data?.image_ids);
};

export const releasePostImageDraft = (draft: PostImageDraft): void => {
  if (draft.file) URL.revokeObjectURL(draft.url);
};

/**
 * Uploads the images the API does not have yet and returns the ids of all images in the order of the drafts.
 *
 * Images are uploaded one request at a time, so the size of a request does not grow with the number of images. The
 * ids of finished uploads are kept in uploadedImageIds, so submitting the form again after a failure does not upload
 * the same file twice. The error that is thrown when an upload fails has a message that can be shown to the user.
 * Aborting the signal stops the uploads with a cancellation error.
 */
export const uploadPostImages = async (
  drafts: PostImageDraft[],
  uploadedImageIds: Map<string, number>,
  onProgress: (progress: PostImageUploadProgress) => void,
  signal?: AbortSignal,
): Promise<number[]> => {
  const total = drafts.filter((draft) => draft.id === undefined && !uploadedImageIds.has(draft.key)).length;
  const imageIds: number[] = [];
  let current = 0;

  for (const [index, draft] of drafts.entries()) {
    let imageId = draft.id ?? uploadedImageIds.get(draft.key);

    if (imageId === undefined) {
      current += 1;
      onProgress({current, total});

      try {
        // eslint-disable-next-line no-await-in-loop
        imageId = (await createPostImage(draft.file!, signal)).id;
      } catch (error: any) {
        if (isCancellationError(error)) throw error;

        // The position is the one the form shows for the image, so the user can tell which one to replace
        const errorData = error?.response?.data;
        const imageMessage = extractErrorMessage(errorData?.image);
        const message = imageMessage ? `Image ${index + 1}: ${imageMessage}` : null;
        throw new Error(
          message || extractErrorMessage(errorData?.non_field_errors) || `Error uploading image ${index + 1}`,
        );
      }

      uploadedImageIds.set(draft.key, imageId);
    }

    imageIds.push(imageId);
  }

  return imageIds;
};
