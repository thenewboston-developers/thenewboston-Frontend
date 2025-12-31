import {MouseEvent, useEffect, useRef} from 'react';
import {createPortal} from 'react-dom';
import {useSelector} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';
import {mdiClose} from '@mdi/js';

import Icon from 'components/Icon';
import {useIsMobile} from 'hooks';
import {getPosts} from 'selectors/state';
import {Post as TPost, SFC} from 'types';

import * as S from './Styles';

export interface PhotoLightboxModalProps {
  close(): void;
  post: TPost;
}

const PhotoLightboxModal: SFC<PhotoLightboxModalProps> = ({className, close, post}) => {
  const hasSeenPostRef = useRef(false);
  const {id} = useParams();
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const posts = useSelector(getPosts);
  const profileId = id || `${post.owner.id}`;
  const storedPost = posts.find((postData) => postData.id === post.id);
  const activePost = storedPost || post;

  useEffect(() => {
    if (storedPost) {
      hasSeenPostRef.current = true;
    }
  }, [storedPost]);

  useEffect(() => {
    if (storedPost) {
      if (!storedPost.image) {
        close();
      }
      return;
    }

    if (hasSeenPostRef.current) {
      close();
      navigate(`/profile/${profileId}/photos`);
    }
  }, [close, navigate, profileId, storedPost]);

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
            <S.Photo
              alt={`Post photo by ${activePost.owner.username}`}
              onClick={handlePhotoClick}
              src={activePost.image ?? ''}
            />
          </S.ImagePanel>
          {!isMobile && (
            <S.DetailsPanel>
              <S.Post post={activePost} />
            </S.DetailsPanel>
          )}
        </S.Content>
      </S.Modal>
    </>,
    document.getElementById('modal-root') as HTMLElement,
  );
};

export default PhotoLightboxModal;
