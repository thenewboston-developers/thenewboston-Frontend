import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {mdiCommentTextOutline, mdiDotsVertical, mdiHeart, mdiHeartOutline} from '@mdi/js';

import Linkify from 'components/Linkify';
import OutlineButton from 'components/OutlineButton';
import UserLabel from 'components/UserLabel';
import {deletePost, likePost, unlikePost} from 'dispatchers/posts';
import {ToastType} from 'enums';
import {useToggle} from 'hooks';
import FullScreenImageModal from 'modals/FullScreenImageModal';
import PostLikesModal from 'modals/PostLikesModal';
import PostModal from 'modals/PostModal';
import {getSelf} from 'selectors/state';
import {AppDispatch, Post as TPost, SFC} from 'types';
import {shortDate} from 'utils/dates';
import {displayErrorToast, displayToast} from 'utils/toasts';

import Comments from './Comments';
import * as S from './Styles';
import TransferInfo from './TransferInfo';

export interface PostProps {
  post: TPost;
}

const Post: SFC<PostProps> = ({className, post}) => {
  const [animateLike, setAnimateLike] = useState(false);
  const [imageModalIsOpen, toggleImageModal] = useToggle(false);
  const [isOpenCommentBox, setIsOpenCommentBox] = useState(true);
  const [likesModalIsOpen, toggleLikesModal] = useToggle(false);
  const [postModalIsOpen, togglePostModal] = useToggle(false);
  const [showFullContent, setShowFullContent] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const self = useSelector(getSelf);

  const {content, created_date, id, image, is_liked, like_count, owner, price_amount, price_currency, recipient} = post;
  const isTransferPost = !!(recipient && price_amount && price_currency);

  const handleDelete = async () => {
    try {
      await dispatch(deletePost(id));
      displayToast('Post deleted!', ToastType.SUCCESS);
    } catch (error) {
      displayErrorToast('Error deleting post');
    }
  };

  const handleLikeClick = async () => {
    try {
      if (is_liked) {
        await dispatch(unlikePost(id));
      } else {
        // Trigger animation only when liking
        setAnimateLike(true);
        setTimeout(() => setAnimateLike(false), 600);
        await dispatch(likePost(id));
      }
    } catch (error) {
      displayErrorToast('Error updating like status');
    }
  };

  const handlePostImageClick = () => {
    toggleImageModal();
  };

  const renderContent = () => {
    const words = content.split(' ');
    return words.map((word, index) => {
      if (word.length > 30) return <S.LongContent key={index}>{word} </S.LongContent>;
      return word + ' ';
    });
  };

  const menuOptions = [
    {
      label: 'Edit',
      onClick: togglePostModal,
    },
    {
      label: 'Delete',
      onClick: handleDelete,
    },
  ];

  const renderDropdownMenu = () => {
    if (post.owner.id !== self.id) return null;
    return <S.DropdownMenu icon={mdiDotsVertical} options={menuOptions} />;
  };

  const toggleShowFullContent = () => {
    setShowFullContent(!showFullContent);
  };

  return (
    <>
      <S.Container className={className}>
        <S.Top>
          <UserLabel
            avatar={owner.avatar}
            description={shortDate(created_date, true)}
            id={owner.id}
            username={owner.username}
          />
          {renderDropdownMenu()}
        </S.Top>
        {isTransferPost && (
          <TransferInfo
            createdDate={created_date}
            owner={owner}
            priceAmount={price_amount!}
            priceCurrency={price_currency!}
            recipient={recipient!}
          />
        )}
        <S.Content>
          <Linkify>
            {showFullContent || content.length <= 400 ? (
              <>
                <S.TextContent>
                  {renderContent()}
                  {content.length > 400 && <S.TextLink onClick={toggleShowFullContent}>See less</S.TextLink>}
                </S.TextContent>
              </>
            ) : (
              <>
                <S.TextContent>
                  {renderContent().slice(0, 400)}... <S.TextLink onClick={toggleShowFullContent}>See more</S.TextLink>
                </S.TextContent>
              </>
            )}
          </Linkify>
        </S.Content>
        {image ? <S.Img alt="image" onClick={handlePostImageClick} src={image} /> : null}
        <S.ActionsContainer>
          <S.LikeWrapper>
            <S.LikeButton $animate={animateLike} onClick={handleLikeClick}>
              <S.LikeIcon
                $animate={animateLike}
                $isLiked={is_liked}
                icon={is_liked ? mdiHeart : mdiHeartOutline}
                size={20}
              />
            </S.LikeButton>
            <S.LikeCount onClick={toggleLikesModal}>
              {like_count} {like_count === 1 ? 'like' : 'likes'}
            </S.LikeCount>
          </S.LikeWrapper>
          <OutlineButton
            iconLeft={mdiCommentTextOutline}
            onClick={() => setIsOpenCommentBox(!isOpenCommentBox)}
            text={isOpenCommentBox ? 'Hide Comments' : 'Comment'}
          />
        </S.ActionsContainer>
        {isOpenCommentBox && <Comments postId={post.id} />}
      </S.Container>
      {imageModalIsOpen && image ? <FullScreenImageModal close={toggleImageModal} imageSrc={image} /> : null}
      {likesModalIsOpen ? <PostLikesModal close={toggleLikesModal} postId={post.id} /> : null}
      {postModalIsOpen ? <PostModal close={togglePostModal} post={post} /> : null}
    </>
  );
};

export default Post;
