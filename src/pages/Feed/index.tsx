import {useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import LeavesEmptyState from 'assets/leaves-empty-state.png';
import EmptyPage from 'components/EmptyPage';
import InfiniteScroll from 'components/InfiniteScroll';
import Post from 'components/Post';
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

  const postsData = posts && posts.posts;
  const postList = useMemo(() => Object.values(postsData), [postsData]);

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

  const renderContent = () => {
    if (postList.length) {
      return (
        <InfiniteScroll dataLength={postList.length} hasMore={hasMore} next={fetchMorePosts} heightMargin={0}>
          <S.PostContainer>
            {postList.map((post, index) => (
              <Post key={index} post={post} />
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
