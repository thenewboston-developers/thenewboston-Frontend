import {useEffect, useState} from 'react';
import {createPortal} from 'react-dom';

import {getPost} from 'api/posts';
import Post from 'components/Post';
import PostSkeleton from 'components/Post/PostSkeleton';
import {Post as TPost, SFC} from 'types';
import {displayErrorToast} from 'utils/toasts';

import * as S from './Styles';

export interface PostModalProps {
  onClose(): void;
  postId: number;
}

const PostModal: SFC<PostModalProps> = ({className, onClose, postId}) => {
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState<TPost | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const postData = await getPost(postId);
        setPost(postData);
      } catch (error) {
        displayErrorToast('Failed to load post');
        onClose();
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [onClose, postId]);

  return createPortal(
    <S.Overlay className={className} onClick={onClose}>
      <S.PostContainer onClick={(e) => e.stopPropagation()}>
        <S.ScrollableContent>
          {loading ? <PostSkeleton dataLength={1} /> : post && <Post noBorderRadius post={post} />}
        </S.ScrollableContent>
      </S.PostContainer>
    </S.Overlay>,
    document.getElementById('modal-root') as HTMLElement,
  );
};

export default PostModal;
