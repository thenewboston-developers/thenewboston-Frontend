import {useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import EmptyPage from 'components/EmptyPage';
import InfiniteScroll from 'components/InfiniteScroll';
import LeavesEmptyState from 'assets/leaves_empty_state.png';
import Post from 'components/Post';
import PostSkeleton from 'components/Post/PostSkeleton';
import {AppDispatch, SFC} from 'types';
import {displayErrorToast} from 'utils/toasts';
import {getPosts as _getPosts, resetPosts as _resetPosts} from 'dispatchers/posts';
import {getPosts, hasMorePosts, isLoadingPosts} from 'selectors/state';

import * as S from './Styles';

const Feed: SFC = ({className}) => {
  const dispatch = useDispatch<AppDispatch>();
  const posts = useSelector(getPosts);
  const hasMore = useSelector(hasMorePosts);
  const isLoading = useSelector(isLoadingPosts);

  const postList = useMemo(() => Object.values(posts), [posts]);

  useEffect(() => {
    (async () => {
      try {
        dispatch(_resetPosts());
        await dispatch(_getPosts());
      } catch (error) {
        console.error(error);
        displayErrorToast('Error fetching posts');
      }
    })();
  }, [dispatch]);

  const fetchMorePosts = async () => {
    if (!isLoading) {
      await dispatch(_getPosts());
    }
  };

  const getSkeleton = (n: number) => (
    <S.PostContainer>
      <PostSkeleton dataLength={n} />
    </S.PostContainer>
  );

  const renderContent = () => {
    if (isLoading && !postList.length) {
      return getSkeleton(3);
    }
    if (postList.length) {
      return (
        <InfiniteScroll
          dataLength={postList.length}
          hasMore={hasMore}
          next={fetchMorePosts}
          heightMargin={0}
          loader={getSkeleton(1)}
        >
          <S.PostContainer>
            {postList.map((post) => (
              <Post key={post.id} post={post} />
            ))}
          </S.PostContainer>
        </InfiniteScroll>
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
