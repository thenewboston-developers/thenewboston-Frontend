import {useEffect, useMemo, useRef} from 'react';
import InfiniteScrollComponent from 'react-infinite-scroll-component';
import {useDispatch, useSelector} from 'react-redux';

import LeavesEmptyState from 'assets/leaves-empty-state.png';
import EmptyPage from 'components/EmptyPage';
import EmptyText from 'components/EmptyText';
import Post from 'components/Post';
import PostSkeleton from 'components/Post/PostSkeleton';
import {getPosts as _getPosts, resetPosts as _resetPosts} from 'dispatchers/posts';
import {getPosts, hasMorePosts, isLoadingPosts} from 'selectors/state';
import {AppDispatch, SFC} from 'types';
import {isCancellationError} from 'utils/errors';
import {displayErrorToast} from 'utils/toasts';

import * as S from './Styles';

const Feed: SFC = ({className}) => {
  const abortControllerRef = useRef<AbortController | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const hasMore = useSelector(hasMorePosts);
  const isLoading = useSelector(isLoadingPosts);
  const posts = useSelector(getPosts);

  const postList = useMemo(() => Object.values(posts), [posts]);

  useEffect(() => {
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    (async () => {
      try {
        dispatch(_resetPosts());
        await dispatch(_getPosts(undefined, abortController.signal));
      } catch (error: any) {
        if (!isCancellationError(error)) {
          displayErrorToast('Error fetching posts');
        }
      }
    })();

    return () => {
      abortController.abort();
    };
  }, [dispatch]);

  const fetchMorePosts = async () => {
    if (!isLoading && abortControllerRef.current) {
      try {
        await dispatch(_getPosts(undefined, abortControllerRef.current.signal));
      } catch (error: any) {
        if (!isCancellationError(error)) {
          displayErrorToast('Error fetching more posts');
        }
      }
    }
  };

  const renderContent = () => {
    if (isLoading && !postList.length) {
      return (
        <S.PostContainer>
          <S.PostsWrapper>
            <PostSkeleton dataLength={3} />
          </S.PostsWrapper>
        </S.PostContainer>
      );
    }

    if (postList.length) {
      return (
        <S.PostContainer>
          <InfiniteScrollComponent
            dataLength={postList.length}
            endMessage={
              <S.EndMessageContainer>
                <EmptyText>No more posts to show.</EmptyText>
              </S.EndMessageContainer>
            }
            hasMore={hasMore}
            loader={
              <S.LoaderContainer>
                <S.SkeletonContainer>
                  <PostSkeleton dataLength={1} />
                </S.SkeletonContainer>
              </S.LoaderContainer>
            }
            next={fetchMorePosts}
            scrollThreshold={0.9}
            scrollableTarget="main-scrollable-area"
          >
            <S.PostsWrapper>
              {postList.map((post) => (
                <Post key={post.id} post={post} />
              ))}
            </S.PostsWrapper>
          </InfiniteScrollComponent>
        </S.PostContainer>
      );
    }

    return (
      <EmptyPage
        bottomText="Try following some users to see their posts here!"
        graphic={LeavesEmptyState}
        topText="Nothing here!"
      />
    );
  };

  return <S.Container className={className}>{renderContent()}</S.Container>;
};

export default Feed;
