import {KeyboardEvent, useState} from 'react';

import FullScreenImageModal from 'modals/FullScreenImageModal';
import {PostImage, SFC} from 'types';
import {analyticsTarget} from 'utils/analyticsAttributes';

import * as S from './Styles';

export interface PostImagesProps {
  images: PostImage[];
}

const MAX_VISIBLE_IMAGES = 4;

const PostImages: SFC<PostImagesProps> = ({className, images}) => {
  const [openImageIndex, setOpenImageIndex] = useState<number | null>(null);

  const handleModalClose = () => {
    setOpenImageIndex(null);
  };

  const handleSingleImageKeyDown = (event: KeyboardEvent<HTMLImageElement>) => {
    if (event.repeat) return;
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    setOpenImageIndex(0);
  };

  const renderGrid = () => {
    const visibleImages = images.slice(0, MAX_VISIBLE_IMAGES);
    const hiddenCount = images.length - visibleImages.length;

    return (
      <S.Grid $count={visibleImages.length}>
        {visibleImages.map((image, index) => (
          <S.Tile
            {...analyticsTarget('image')}
            $isTall={visibleImages.length === 3 && index === 0}
            aria-label={`View image ${index + 1} of ${images.length}`}
            key={image.id}
            onClick={() => setOpenImageIndex(index)}
            type="button"
          >
            <S.TileImage alt="" src={image.image} />
            {hiddenCount > 0 && index === visibleImages.length - 1 && <S.HiddenCount>+{hiddenCount}</S.HiddenCount>}
          </S.Tile>
        ))}
      </S.Grid>
    );
  };

  const renderSingleImage = () => (
    <S.SingleImage
      {...analyticsTarget('image')}
      alt="Post image"
      aria-label="View image full screen"
      onClick={() => setOpenImageIndex(0)}
      onKeyDown={handleSingleImageKeyDown}
      role="button"
      src={images[0].image}
      tabIndex={0}
    />
  );

  if (!images.length) return null;

  return (
    <>
      <S.Container className={className}>{images.length === 1 ? renderSingleImage() : renderGrid()}</S.Container>
      {openImageIndex !== null && (
        <FullScreenImageModal
          close={handleModalClose}
          images={images.map(({image}) => image)}
          initialIndex={openImageIndex}
        />
      )}
    </>
  );
};

export default PostImages;
