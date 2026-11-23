import {ChangeEvent} from 'react';
import {mdiClose, mdiImagePlus} from '@mdi/js';
import MdiIcon from '@mdi/react';

import {MAX_POST_IMAGES} from 'constants/general';
import {PostImageDraft, PostImageUploadProgress, SFC} from 'types';

import * as S from './Styles';

export interface PostImagesInputProps {
  disabled?: boolean;
  images: PostImageDraft[];
  onAdd(files: File[]): void;
  onRemove(key: string): void;
  uploadProgress: PostImageUploadProgress | null;
}

const PostImagesInput: SFC<PostImagesInputProps> = ({
  className,
  disabled = false,
  images,
  onAdd,
  onRemove,
  uploadProgress,
}) => {
  const canAddImages = images.length < MAX_POST_IMAGES;

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    onAdd(Array.from(event.target.files || []));
    // Lets the same file be picked again after its image was removed
    event.target.value = '';
  };

  const renderPreviews = () => {
    if (!images.length) return null;

    return (
      <S.Previews>
        {images.map((image, index) => (
          <S.Preview key={image.key}>
            <S.PreviewImage alt={`Image ${index + 1}`} src={image.url} />
            <S.RemoveButton
              aria-label={`Remove image ${index + 1}`}
              disabled={disabled}
              onClick={() => onRemove(image.key)}
              type="button"
            >
              <MdiIcon path={mdiClose} size="16px" />
            </S.RemoveButton>
          </S.Preview>
        ))}
      </S.Previews>
    );
  };

  const renderStatus = () => {
    if (uploadProgress) {
      return `Uploading image ${uploadProgress.current} of ${uploadProgress.total}...`;
    }

    if (!images.length) return null;

    return `${images.length} of ${MAX_POST_IMAGES} images`;
  };

  return (
    <S.Container className={className}>
      {renderPreviews()}
      <S.Footer>
        {canAddImages && (
          <S.UploadButton $disabled={disabled}>
            <S.UploadIcon path={mdiImagePlus} size={0.75} />
            <S.UploadText>Add images</S.UploadText>
            <S.FileInput accept="image/*" disabled={disabled} multiple onChange={handleFileChange} type="file" />
          </S.UploadButton>
        )}
        <S.Status aria-live="polite">{renderStatus()}</S.Status>
      </S.Footer>
    </S.Container>
  );
};

export default PostImagesInput;
