import {useEffect, useMemo, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';

import EmptyText from 'components/EmptyText';
import InfiniteScroll from 'components/InfiniteScroll';
import Post from 'components/Post';
import PostSkeleton from 'components/Post/PostSkeleton';
import {AppDispatch, SFC} from 'types';
import {displayErrorToast} from 'utils/toasts';
import {getPosts as _getPosts, resetPosts as _resetPosts} from 'dispatchers/posts';
import {getPosts, hasMorePosts, isLoadingPosts} from 'selectors/state';

import * as S from './Styles';
import ScrollToTopButton from 'components/ScrollUpButton';

const Posts: SFC = ({className}) => {
  const {id} = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const hasMore = useSelector(hasMorePosts);
  const isLoading = useSelector(isLoadingPosts);
  const posts = useSelector(getPosts);
  const scrollableDivRef = useRef<HTMLDivElement>(null!);

  const userId = id ? parseInt(id, 10) : null;

  const postList = useMemo(() => {
    return Object.values(posts).filter(({owner}) => owner.id === userId);
  }, [posts, userId]);

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

  const getSkeleton = (n: number) => (
    <S.PostContainer>
      <PostSkeleton dataLength={n} />
    </S.PostContainer>
  );

  const fetchMorePosts = async () => {
    if (!isLoading) {
      await dispatch(_getPosts());
    }
  };

  const renderContent = () => {
    if (isLoading && !postList.length) {
      return getSkeleton(3);
    }
    if (postList.length) {
      return (
        <InfiniteScroll
          ref={scrollableDivRef}
          dataLength={postList.length}
          hasMore={hasMore}
          next={fetchMorePosts}
          loader={getSkeleton(1)}
        >
          <ScrollToTopButton targetRef={scrollableDivRef} />
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
