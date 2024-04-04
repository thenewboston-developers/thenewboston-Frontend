import {useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import LeavesEmptyState from 'assets/leaves-empty-state.png';
import EmptyPage from 'components/EmptyPage';
import Post from 'components/Post';
import InfiniteScroll from 'components/InfiniteScroll';
import {getPosts as _getPosts, resetPosts as _resetPosts} from 'dispatchers/posts';
import {getPosts, hasMorePosts, isLoadingPosts} from 'selectors/state';
import {AppDispatch, SFC} from 'types';
import * as S from './Styles';

const Feed: SFC = ({className}) => {
  const dispatch = useDispatch<AppDispatch>();
  const posts = useSelector(getPosts);
  const hasMore = useSelector(hasMorePosts);
  const isLoading = useSelector(isLoadingPosts);
  const postList = useMemo(() => Object.values(posts), [posts]);

  useEffect(() => {
    dispatch(_resetPosts());
    dispatch(_getPosts());
  }, [dispatch]);

  const fetchMorePosts = () => {
    if (!isLoading) {
      dispatch(_getPosts());
    }
  };

  const renderContent = () => {
    if (postList.length) {
      return (
        <InfiniteScroll dataLength={postList.length} next={fetchMorePosts} hasMore={hasMore}>
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
