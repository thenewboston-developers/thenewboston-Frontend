import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {mdiArrowLeft} from '@mdi/js';

import {getPost} from 'api/posts';
import Icon from 'components/Icon';
import Post from 'components/Post';
import PostSkeleton from 'components/Post/PostSkeleton';
import {Post as TPost, SFC} from 'types';
import {displayErrorToast} from 'utils/toasts';

import * as S from './Styles';

const PostDetail: SFC = ({className}) => {
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState<TPost | null>(null);
  const navigate = useNavigate();
  const {postId} = useParams<{postId: string}>();

  useEffect(() => {
    (async () => {
      if (!postId) {
        displayErrorToast('Invalid post ID');
        return;
      }

      try {
        setLoading(true);
        const postData = await getPost(parseInt(postId, 10));
        setPost(postData);
      } catch (error) {
        displayErrorToast('Failed to load post');
      } finally {
        setLoading(false);
      }
    })();
  }, [postId]);

  const handleBackClick = () => {
    navigate('/notifications');
  };

  return (
    <S.Container className={className}>
      <S.Header>
        <S.BackButton onClick={handleBackClick}>
          <Icon icon={mdiArrowLeft} size={20} />
          <span>Back to Notifications</span>
        </S.BackButton>
      </S.Header>
      <S.ScrollableContent>
        <S.Content>{loading ? <PostSkeleton dataLength={1} /> : post && <Post post={post} />}</S.Content>
      </S.ScrollableContent>
    </S.Container>
  );
};

export default PostDetail;
