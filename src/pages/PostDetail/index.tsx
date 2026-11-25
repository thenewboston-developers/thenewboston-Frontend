import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate, useParams, useSearchParams} from 'react-router-dom';
import {mdiArrowLeft} from '@mdi/js';

import LeavesEmptyState from 'assets/leaves-empty-state.png';
import EmptyPage from 'components/EmptyPage';
import Icon from 'components/Icon';
import Post from 'components/Post';
import PostSkeleton from 'components/Post/PostSkeleton';
import {PATH_HOME, PATH_NOTIFICATIONS, POST_DETAIL_COMMENT_PARAM} from 'constants/paths';
import {getPost} from 'dispatchers/posts';
import {useIsAuthenticated} from 'hooks';
import {getPosts} from 'selectors/state';
import {AppDispatch, SFC} from 'types';
import {isNotFoundError} from 'utils/errors';
import {displayErrorToast} from 'utils/toasts';

import * as S from './Styles';

type LoadStatus = 'failed' | 'loaded' | 'loading' | 'notFound';

const PostDetail: SFC = ({className}) => {
  const [loadResult, setLoadResult] = useState<{postId: number; status: LoadStatus} | null>(null);
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  const highlightedCommentId = Number(searchParams.get(POST_DETAIL_COMMENT_PARAM)) || null;
  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();
  const {postId} = useParams<{postId: string}>();
  const postIdNumber = postId ? parseInt(postId, 10) : null;
  const posts = useSelector(getPosts);
  const post = postIdNumber ? posts.find((currentPost) => currentPost.id === postIdNumber) || null : null;
  // A result belongs to the post it was loaded for: the route can move on to another post while this page stays mounted
  const loadStatus = loadResult?.postId === postIdNumber ? loadResult.status : 'loading';
  // Also true once the post is deleted while it is open, which takes it out of the store
  const isDeleted = !post && (loadStatus === 'notFound' || loadStatus === 'loaded');

  useEffect(() => {
    (async () => {
      if (!postIdNumber) {
        displayErrorToast('Invalid post ID');
        return;
      }

      try {
        await dispatch(getPost(postIdNumber));
        setLoadResult({postId: postIdNumber, status: 'loaded'});
      } catch (error) {
        // Notifications and shared links can outlive the post they point to
        if (isNotFoundError(error)) {
          setLoadResult({postId: postIdNumber, status: 'notFound'});
          return;
        }

        setLoadResult({postId: postIdNumber, status: 'failed'});
        displayErrorToast('Failed to load post');
      }
    })();
  }, [dispatch, postIdNumber]);

  // Members usually arrive from their notifications, signed-out visitors have none to go back to
  const handleBackClick = () => {
    navigate(isAuthenticated ? PATH_NOTIFICATIONS : PATH_HOME);
  };

  const renderContent = () => {
    if (isDeleted) {
      return (
        <EmptyPage
          bottomText="The post and its comments are no longer available."
          graphic={LeavesEmptyState}
          topText="This post was deleted"
        />
      );
    }

    return (
      <S.ScrollableContent>
        <S.Content>
          {loadStatus === 'loading' ? (
            <PostSkeleton dataLength={1} />
          ) : (
            post && <Post highlightedCommentId={highlightedCommentId} post={post} />
          )}
        </S.Content>
      </S.ScrollableContent>
    );
  };

  return (
    <S.Container className={className}>
      <S.Header>
        <S.BackButton onClick={handleBackClick} type="button">
          <Icon icon={mdiArrowLeft} size={20} />
          <span>{isAuthenticated ? 'Back to Notifications' : 'Back to Home'}</span>
        </S.BackButton>
      </S.Header>
      {renderContent()}
    </S.Container>
  );
};

export default PostDetail;
