import {useEffect, useRef, useState} from 'react';
import {mdiChevronLeft, mdiChevronRight} from '@mdi/js';

import Button from 'components/Button';
import {useToggle} from 'hooks';
import ArtworkModal from 'modals/ArtworkModal';
import {SFC} from 'types';
import * as S from './Styles';

export interface ImageCarouselProps {
  description: string;
  imageUrls: string[];
}

const ImageCarousel: SFC<ImageCarouselProps> = ({className, description, imageUrls}) => {
  const [artworkModalIsOpen, toggleArtworkModal] = useToggle(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const imageUrlsRef = useRef<string[]>([]);

  useEffect(() => {
    if (JSON.stringify(imageUrlsRef.current) !== JSON.stringify(imageUrls)) {
      imageUrlsRef.current = imageUrls;
      setCurrentIndex(0);
    }
  }, [imageUrls]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : imageUrls.length - 1));
  };

  const renderToolbar = () => {
    return (
      <S.Toolbar>
        <S.ToolbarLeft>
          <S.ArrowContainer>
            <S.IconContainer onClick={handlePrevious}>
              <S.Icon path={mdiChevronLeft} size="26px" />
            </S.IconContainer>
            <S.IconContainer onClick={handleNext}>
              <S.Icon path={mdiChevronRight} size="26px" />
            </S.IconContainer>
          </S.ArrowContainer>
          <S.PositionIndicator>{`${currentIndex + 1} of ${imageUrls.length}`}</S.PositionIndicator>
        </S.ToolbarLeft>
        <S.ToolbarRight>
          <Button onClick={toggleArtworkModal} text="Save" />
        </S.ToolbarRight>
      </S.Toolbar>
    );
  };

  return (
    <>
      <S.Container className={className}>
        {renderToolbar()}
        <S.Img key={imageUrls[currentIndex]} src={imageUrls[currentIndex]} />
      </S.Container>
      {artworkModalIsOpen ? (
        <ArtworkModal close={toggleArtworkModal} description={description} imageUrl={imageUrls[currentIndex]} />
      ) : null}
    </>
  );
};

export default ImageCarousel;
