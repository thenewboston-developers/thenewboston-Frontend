import {useEffect, useMemo, useRef, useState} from 'react';
import InfiniteScrollComponent from 'react-infinite-scroll-component';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';

import EmptyText from 'components/EmptyText';
import Loader from 'components/Loader';
import {getPosts as _getPosts, resetPosts as _resetPosts} from 'dispatchers/posts';
import PhotoLightboxModal from 'modals/PhotoLightboxModal';
import {getPosts, hasMorePosts, isLoadingPosts} from 'selectors/state';
import {AppDispatch, Post as TPost, SFC} from 'types';
import {isCancellationError} from 'utils/errors';
import {displayErrorToast} from 'utils/toasts';

import * as S from './Styles';

const Photos: SFC = ({className}) => {
  const [selectedPost, setSelectedPost] = useState<TPost | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const hasMore = useSelector(hasMorePosts);
  const {id} = useParams();
  const isLoading = useSelector(isLoadingPosts);
  const posts = useSelector(getPosts);
  const photoPosts = useMemo(() => posts.filter((post) => post.image), [posts]);
  const userId = id ? parseInt(id, 10) : null;

  useEffect(() => {
    if (!userId) return;

    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    (async () => {
      try {
        dispatch(_resetPosts());
        await dispatch(_getPosts({user: userId}, abortController.signal));
      } catch (error: any) {
        if (!isCancellationError(error)) {
          displayErrorToast('Error fetching photos');
        }
      }
    })();

    return () => {
      abortController.abort();
    };
  }, [dispatch, userId]);

  useEffect(() => {
    if (!userId || isLoading || !hasMore || photoPosts.length) return;
    if (!abortControllerRef.current) return;

    (async () => {
      try {
        await dispatch(_getPosts({user: userId}, abortControllerRef.current!.signal));
      } catch (error: any) {
        if (!isCancellationError(error)) {
          displayErrorToast('Error fetching more photos');
        }
      }
    })();
  }, [dispatch, hasMore, isLoading, photoPosts.length, userId]);

  const fetchMorePosts = async () => {
    if (!isLoading && userId && abortControllerRef.current) {
      try {
        await dispatch(_getPosts({user: userId}, abortControllerRef.current.signal));
      } catch (error: any) {
        if (!isCancellationError(error)) {
          displayErrorToast('Error fetching more photos');
        }
      }
    }
  };

  const handleModalClose = () => {
    setSelectedPost(null);
  };

  const handlePhotoClick = (post: TPost) => {
    setSelectedPost(post);
  };

  const renderContent = () => {
    if (isLoading && !posts.length) {
      return (
        <S.LoaderContainer>
          <Loader size={32} />
        </S.LoaderContainer>
      );
    }

    if (!photoPosts.length && !isLoading && !hasMore) {
      return <EmptyText>No photos to display.</EmptyText>;
    }

    return (
      <InfiniteScrollComponent
        dataLength={posts.length}
        endMessage={
          photoPosts.length ? (
            <S.EndMessageContainer>
              <EmptyText>No more photos to show.</EmptyText>
            </S.EndMessageContainer>
          ) : null
        }
        hasMore={hasMore}
        loader={
          isLoading ? (
            <S.LoaderContainer>
              <Loader size={24} />
            </S.LoaderContainer>
          ) : null
        }
        next={fetchMorePosts}
        scrollableTarget="main-scrollable-area"
        scrollThreshold={0.9}
      >
        <S.Grid>
          {photoPosts.map((post) => (
            <S.PhotoButton
              aria-label={`Open photo from ${post.owner.username}`}
              key={post.id}
              onClick={() => handlePhotoClick(post)}
              type="button"
            >
              <S.PhotoImage alt={`Post photo by ${post.owner.username}`} src={post.image ?? ''} />
            </S.PhotoButton>
          ))}
        </S.Grid>
      </InfiniteScrollComponent>
    );
  };

  return (
    <S.Container className={className}>
      {renderContent()}
      {selectedPost ? <PhotoLightboxModal close={handleModalClose} post={selectedPost} /> : null}
    </S.Container>
  );
};

export default Photos;
