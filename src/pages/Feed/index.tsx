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
import {displayErrorToast} from 'utils/toasts';

import * as S from './Styles';

const Feed: SFC = ({className}) => {
  const dispatch = useDispatch<AppDispatch>();
  const posts = useSelector(getPosts);
  const hasMore = useSelector(hasMorePosts);
  const isLoading = useSelector(isLoadingPosts);
  const abortControllerRef = useRef<AbortController | null>(null);

  const postList = useMemo(() => Object.values(posts), [posts]);

  useEffect(() => {
    // Create a new AbortController for this component instance
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    (async () => {
      try {
        dispatch(_resetPosts());
        await dispatch(_getPosts(undefined, abortController.signal));
      } catch (error: any) {
        // Only show error toast if it's not a cancelled request
        // Axios with AbortController throws 'CanceledError' with code 'ERR_CANCELED'
        if (error?.code !== 'ERR_CANCELED' && error?.name !== 'CanceledError' && error?.name !== 'AbortError') {
          displayErrorToast('Error fetching posts');
        }
      }
    })();

    // Cleanup: cancel any pending requests when component unmounts
    return () => {
      abortController.abort();
    };
  }, [dispatch]);

  const fetchMorePosts = async () => {
    if (!isLoading && abortControllerRef.current) {
      await dispatch(_getPosts(undefined, abortControllerRef.current.signal));
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
