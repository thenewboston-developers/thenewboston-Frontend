import {useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';

import EmptyText from 'components/EmptyText';
import InfiniteScroll from 'components/InfiniteScroll';
import Post from 'components/Post';
import {getPosts as _getPosts, resetPosts as _resetPosts} from 'dispatchers/posts';
import {getPosts, hasMorePosts, isLoadingPosts} from 'selectors/state';
import {AppDispatch, SFC} from 'types';
import {displayErrorToast} from 'utils/toasts';
import * as S from './Styles';

const Posts: SFC = ({className}) => {
  const {id} = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const hasMore = useSelector(hasMorePosts);
  const isLoading = useSelector(isLoadingPosts);
  const posts = useSelector(getPosts);

  const userId = id ? parseInt(id, 10) : null;

  const postsData = posts && posts.posts;

  const postList = useMemo(() => {
    return Object.values(postsData).filter(({owner}) => owner.id === userId);
  }, [postsData, userId]);

  useEffect(() => {
    (async () => {
      try {
        if (!userId) return;
        dispatch(_resetPosts());
        await dispatch(_getPosts({owner: userId}));
      } catch (error) {
        console.error(error);
        displayErrorToast('Error fetching posts');
      }
    })();
  }, [dispatch, userId]);

  const fetchMorePosts = async () => {
    if (!isLoading) {
      await dispatch(_getPosts());
    }
  };

  const renderContent = () => {
    if (postList.length) {
      return (
        <InfiniteScroll dataLength={postList.length} hasMore={hasMore} next={fetchMorePosts}>
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
