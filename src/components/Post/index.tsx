import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {mdiCommentTextOutline, mdiDotsVertical, mdiHeart, mdiHeartOutline, mdiSwapHorizontal} from '@mdi/js';

import Linkify from 'components/Linkify';
import OutlineButton from 'components/OutlineButton';
import UserLabel from 'components/UserLabel';
import {deletePost, likePost, unlikePost} from 'dispatchers/posts';
import {ToastType} from 'enums';
import {useToggle} from 'hooks';
import FullScreenImageModal from 'modals/FullScreenImageModal';
import PostModal from 'modals/PostModal';
import {getCurrencies, getSelf} from 'selectors/state';
import {AppDispatch, Post as TPost, SFC} from 'types';
import {shortDate} from 'utils/dates';
import {displayErrorToast, displayToast} from 'utils/toasts';

import Comments from './Comments';
import * as S from './Styles';

export interface PostProps {
  post: TPost;
}

const Post: SFC<PostProps> = ({className, post}) => {
  const [imageModalIsOpen, toggleImageModal] = useToggle(false);
  const [isOpenCommentBox, setIsOpenCommentBox] = useState(true);
  const [postModalIsOpen, togglePostModal] = useToggle(false);
  const [showFullContent, setShowFullContent] = useState(false);
  const currencies = useSelector(getCurrencies);
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

  const handlePostImageClick = () => {
    toggleImageModal();
  };

  const handleLikeClick = async () => {
    try {
      if (is_liked) {
        await dispatch(unlikePost(id));
      } else {
        await dispatch(likePost(id));
      }
    } catch (error) {
      displayErrorToast('Error updating like status');
    }
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

  const renderTransferInfo = () => {
    if (!isTransferPost) return null;

    return (
      <S.TransferInfo>
        <S.TransferIconWrapper>
          <S.TransferIcon icon={mdiSwapHorizontal} size={24} />
        </S.TransferIconWrapper>
        <S.TransferContent>
          <S.TransferText>
            <S.TransferLink to={`/profile/${owner.id}`}>{owner.username}</S.TransferLink> sent{' '}
            <strong>
              {price_amount?.toLocaleString()} {currencies[price_currency!]?.ticker}
            </strong>{' '}
            to <S.TransferLink to={`/profile/${recipient!.id}`}>{recipient!.username}</S.TransferLink>
          </S.TransferText>
          <S.TransferDate>{shortDate(created_date, true)}</S.TransferDate>
        </S.TransferContent>
      </S.TransferInfo>
    );
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
        {renderTransferInfo()}
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
        <S.Div>
          <S.BoxLeft>
            <S.LikeButton onClick={handleLikeClick}>
              <S.LikeIcon $isLiked={is_liked} icon={is_liked ? mdiHeart : mdiHeartOutline} size={20} />
              <S.LikeCount>{like_count}</S.LikeCount>
            </S.LikeButton>
            <OutlineButton
              iconLeft={mdiCommentTextOutline}
              onClick={() => setIsOpenCommentBox(!isOpenCommentBox)}
              text={isOpenCommentBox ? 'Hide Comments' : 'Comment'}
            />
          </S.BoxLeft>
        </S.Div>
        {isOpenCommentBox && <Comments postId={post.id} />}
      </S.Container>
      {imageModalIsOpen && image ? <FullScreenImageModal close={toggleImageModal} imageSrc={image} /> : null}
      {postModalIsOpen ? <PostModal close={togglePostModal} post={post} /> : null}
    </>
  );
};

export default Post;
