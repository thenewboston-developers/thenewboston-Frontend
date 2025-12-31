import {MouseEvent, useEffect, useMemo} from 'react';
import {createPortal} from 'react-dom';
import {mdiClose} from '@mdi/js';

import Icon from 'components/Icon';
import {useIsMobile} from 'hooks';
import {Post as TPost, SFC} from 'types';

import * as S from './Styles';

export interface PhotoLightboxModalProps {
  close(): void;
  post: TPost;
}

const PhotoLightboxModal: SFC<PhotoLightboxModalProps> = ({className, close, post}) => {
  const isMobile = useIsMobile();
  const postWithoutImage = useMemo(() => ({...post, image: null}), [post]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [close]);

  const handleImagePanelClick = () => {
    close();
  };

  const handlePhotoClick = (event: MouseEvent<HTMLImageElement>) => {
    event.stopPropagation();
  };

  return createPortal(
    <>
      <S.Overlay onClick={close} />
      <S.Modal className={className}>
        <S.Content>
          <S.CloseButton aria-label="Close photo" onClick={close} type="button">
            <Icon icon={mdiClose} size={20} />
          </S.CloseButton>
          <S.ImagePanel onClick={handleImagePanelClick}>
            <S.Photo alt={`Post photo by ${post.owner.username}`} onClick={handlePhotoClick} src={post.image ?? ''} />
          </S.ImagePanel>
          {!isMobile && (
            <S.DetailsPanel>
              <S.Post post={postWithoutImage} />
            </S.DetailsPanel>
          )}
        </S.Content>
      </S.Modal>
    </>,
    document.getElementById('modal-root') as HTMLElement,
  );
};

export default PhotoLightboxModal;
