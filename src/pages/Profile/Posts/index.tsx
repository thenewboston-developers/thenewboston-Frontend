import {useEffect, useMemo} from 'react';
import InfiniteScrollComponent from 'react-infinite-scroll-component';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';

import EmptyText from 'components/EmptyText';
import Post from 'components/Post';
import PostSkeleton from 'components/Post/PostSkeleton';
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

  const postList = useMemo(() => {
    return Object.values(posts);
  }, [posts]);

  useEffect(() => {
    (async () => {
      try {
        if (!userId) return;
        dispatch(_resetPosts());
        await dispatch(_getPosts({user: userId}));
      } catch (error) {
        displayErrorToast('Error fetching posts');
      }
    })();
  }, [dispatch, userId]);

  const fetchMorePosts = async () => {
    if (!isLoading && userId) {
      try {
        await dispatch(_getPosts({user: userId}));
      } catch (error) {
        displayErrorToast('Error fetching more posts');
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

    return <EmptyText>No posts to display.</EmptyText>;
  };

  return <S.Container className={className}>{renderContent()}</S.Container>;
};

export default Posts;
