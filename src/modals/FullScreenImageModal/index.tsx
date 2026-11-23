import {useEffect, useState} from 'react';
import {createPortal} from 'react-dom';

import ImageNavigation from 'components/ImageNavigation';
import {SFC} from 'types';

import * as S from './Styles';

export interface ImageModalProps {
  close(): void;
  images: string[];
  initialIndex?: number;
}

const FullScreenImageModal: SFC<ImageModalProps> = ({close, images, initialIndex = 0}) => {
  const [index, setIndex] = useState(initialIndex);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [close]);

  return createPortal(
    <>
      <S.Overlay onClick={close} />
      <S.Modal>
        <S.FullScreenImage onClick={close} src={images[index]} />
        <ImageNavigation count={images.length} index={index} onIndexChange={setIndex} />
      </S.Modal>
    </>,
    document.getElementById('modal-root') as HTMLElement,
  );
};

export default FullScreenImageModal;
