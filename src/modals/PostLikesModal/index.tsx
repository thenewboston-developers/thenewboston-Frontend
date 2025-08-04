import {useEffect, useState} from 'react';
import InfiniteScrollComponent from 'react-infinite-scroll-component';

import {getPostLikes} from 'api/postLikes';
import EmptyText from 'components/EmptyText';
import Loader from 'components/Loader';
import {ModalBody} from 'components/Modal';
import UserLabel from 'components/UserLabel';
import {PostLike, SFC} from 'types';
import {displayErrorToast} from 'utils/toasts';

import * as S from './Styles';

export interface PostLikesModalProps {
  close(): void;
  postId: number;
}

const PostLikesModal: SFC<PostLikesModalProps> = ({className, close, postId}) => {
  const [_, setNextUrl] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [likes, setLikes] = useState<PostLike[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const response = await getPostLikes({post: postId, page: 1});
        setLikes(response.results);
        setNextUrl(response.next);
        setHasMore(!!response.next);
      } catch (error) {
        displayErrorToast('Error fetching likes');
      } finally {
        setIsLoading(false);
      }
    })();
  }, [postId]);

  const fetchMoreLikes = async () => {
    if (!hasMore || isLoading) return;

    try {
      const nextPage = page + 1;
      const response = await getPostLikes({post: postId, page: nextPage});
      setLikes((prevLikes) => [...prevLikes, ...response.results]);
      setNextUrl(response.next);
      setHasMore(!!response.next);
      setPage(nextPage);
    } catch (error) {
      displayErrorToast('Error fetching more likes');
    }
  };

  const renderContent = () => {
    if (isLoading && !likes.length) {
      return (
        <S.LoaderContainer>
          <Loader size={24} />
        </S.LoaderContainer>
      );
    }

    if (!likes.length) {
      return <EmptyText>No likes yet</EmptyText>;
    }

    return (
      <S.ScrollContainer>
        <InfiniteScrollComponent
          dataLength={likes.length}
          endMessage={null}
          hasMore={hasMore}
          height={400}
          loader={
            <S.LoaderWrapper>
              <Loader size={24} />
            </S.LoaderWrapper>
          }
          next={fetchMoreLikes}
        >
          <S.LikesList>
            {likes.map((like) => (
              <S.LikeItem key={like.id}>
                <UserLabel
                  avatar={like.user.avatar}
                  description={like.user.username}
                  id={like.user.id}
                  username={like.user.username}
                />
              </S.LikeItem>
            ))}
          </S.LikesList>
        </InfiniteScrollComponent>
      </S.ScrollContainer>
    );
  };

  return (
    <S.Modal className={className} close={close} header="Likes">
      <ModalBody>{renderContent()}</ModalBody>
    </S.Modal>
  );
};

export default PostLikesModal;
