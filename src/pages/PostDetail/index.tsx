import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';
import {mdiArrowLeft} from '@mdi/js';

import Icon from 'components/Icon';
import Post from 'components/Post';
import PostSkeleton from 'components/Post/PostSkeleton';
import {PATH_HOME, PATH_NOTIFICATIONS} from 'constants/paths';
import {getPost} from 'dispatchers/posts';
import {useIsAuthenticated} from 'hooks';
import {getPosts} from 'selectors/state';
import {AppDispatch, SFC} from 'types';
import {displayErrorToast} from 'utils/toasts';

import * as S from './Styles';

const PostDetail: SFC = ({className}) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();
  const {postId} = useParams<{postId: string}>();
  const postIdNumber = postId ? parseInt(postId, 10) : null;
  const posts = useSelector(getPosts);
  const post = postIdNumber ? posts.find((currentPost) => currentPost.id === postIdNumber) || null : null;

  useEffect(() => {
    (async () => {
      if (!postIdNumber) {
        displayErrorToast('Invalid post ID');
        return;
      }

      try {
        setLoading(true);
        await dispatch(getPost(postIdNumber));
      } catch (error) {
        displayErrorToast('Failed to load post');
      } finally {
        setLoading(false);
      }
    })();
  }, [dispatch, postIdNumber]);

  // Members usually arrive from their notifications, signed-out visitors have none to go back to
  const handleBackClick = () => {
    navigate(isAuthenticated ? PATH_NOTIFICATIONS : PATH_HOME);
  };

  return (
    <S.Container className={className}>
      <S.Header>
        <S.BackButton onClick={handleBackClick} type="button">
          <Icon icon={mdiArrowLeft} size={20} />
          <span>{isAuthenticated ? 'Back to Notifications' : 'Back to Home'}</span>
        </S.BackButton>
      </S.Header>
      <S.ScrollableContent>
        <S.Content>{loading ? <PostSkeleton dataLength={1} /> : post && <Post post={post} />}</S.Content>
      </S.ScrollableContent>
    </S.Container>
  );
};

export default PostDetail;
