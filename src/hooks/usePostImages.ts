import {useEffect, useRef, useState} from 'react';

import {MAX_POST_IMAGES} from 'constants/general';
import {PostImage, PostImageDraft, PostImageUploadProgress} from 'types';
import {createPostImageDraft, getPostImageDraft, releasePostImageDraft, uploadPostImages} from 'utils/postImages';
import {displayErrorToast} from 'utils/toasts';

const getKeys = (images: PostImageDraft[]): string => images.map(({key}) => key).join();

/**
 * The images of a post form: the ones the post already has and the files picked for it, which are uploaded when the
 * form is submitted.
 */
const usePostImages = (initialImages: PostImage[] = []) => {
  const [images, setImages] = useState<PostImageDraft[]>(() => initialImages.map(getPostImageDraft));
  const [uploadProgress, setUploadProgress] = useState<PostImageUploadProgress | null>(null);
  const imagesRef = useRef(images);
  const initialKeysRef = useRef(getKeys(images));
  const uploadedImageIdsRef = useRef(new Map<string, number>());

  useEffect(() => {
    imagesRef.current = images;
  }, [images]);

  useEffect(() => {
    return () => imagesRef.current.forEach(releasePostImageDraft);
  }, []);

  const addImages = (files: File[]) => {
    const imageFiles = files.filter((file) => file.type.startsWith('image/'));
    const availableCount = MAX_POST_IMAGES - images.length;

    if (imageFiles.length > availableCount) {
      displayErrorToast(`A post can have up to ${MAX_POST_IMAGES} images`);
    }

    setImages([...images, ...imageFiles.slice(0, availableCount).map(createPostImageDraft)]);
  };

  const removeImage = (key: string) => {
    images.filter((image) => image.key === key).forEach(releasePostImageDraft);
    setImages(images.filter((image) => image.key !== key));
  };

  /**
   * Returns the ids of the images in their current order, or null when an upload failed. The failure has been shown
   * to the user by then.
   */
  const uploadImages = async (): Promise<number[] | null> => {
    try {
      return await uploadPostImages(images, uploadedImageIdsRef.current, setUploadProgress);
    } catch (error: any) {
      displayErrorToast(error.message);
      return null;
    } finally {
      setUploadProgress(null);
    }
  };

  return {
    addImages,
    hasImageChanges: getKeys(images) !== initialKeysRef.current,
    images,
    removeImage,
    uploadImages,
    uploadProgress,
  };
};

export default usePostImages;
