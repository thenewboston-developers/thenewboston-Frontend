import {useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';

import EmptyText from 'components/EmptyText';
import Post from 'components/Post';
import InfiniteScroll from 'components/InfiniteScroll';
import {getPosts as _getPosts, resetPosts as _resetPosts} from 'dispatchers/posts';
import {getPosts, hasMorePosts, isLoadingPosts} from 'selectors/state';
import {AppDispatch, SFC} from 'types';
import * as S from './Styles';

const Posts: SFC = ({className}) => {
  const dispatch = useDispatch<AppDispatch>();
  const posts = useSelector(getPosts);
  const hasMore = useSelector(hasMorePosts);
  const isLoading = useSelector(isLoadingPosts);

  const {id} = useParams();
  const userId = id ? parseInt(id, 10) : null;

  const postList = useMemo(() => {
    return Object.values(posts).filter(({owner}) => owner.id === userId);
  }, [posts, userId]);

  useEffect(() => {
    (async () => {
      if (!userId) return;
      await dispatch(_resetPosts());
      await dispatch(_getPosts({owner: userId}));
    })();
  }, [dispatch, userId]);

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

    return <EmptyText>No posts to display.</EmptyText>;
  };

  return <S.Container className={className}>{renderContent()}</S.Container>;
};

export default Posts;
