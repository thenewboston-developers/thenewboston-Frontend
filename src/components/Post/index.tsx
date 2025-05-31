import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import {mdiCommentTextOutline, mdiDotsVertical, mdiSwapHorizontal} from '@mdi/js';

import {ButtonColor} from 'components/Button';
import CurrencyLogo from 'components/CurrencyLogo';
import Linkify from 'components/Linkify';
import {deletePost} from 'dispatchers/posts';
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
  const navigate = useNavigate();
  const self = useSelector(getSelf);

  const {content, created_date, id, image, owner, price_amount, price_currency, recipient} = post;
  const isTransferPost = !!(recipient && price_amount && price_currency);

  const handleClick = () => {
    if (!owner.id) return;
    navigate(`/profile/${owner.id}`);
  };

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

  const renderAvatar = () => {
    if (!owner.id) return <S.Avatar src={owner.avatar} />;

    return (
      <Link to={`/profile/${owner.id}`}>
        <S.Avatar src={owner.avatar} />
      </Link>
    );
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
          <S.Text>
            {renderAvatar()}
            <S.Right>
              <S.Username $id={owner.id} onClick={handleClick}>
                {owner.username}
              </S.Username>
              <S.Date>{shortDate(created_date, true)}</S.Date>
            </S.Right>
          </S.Text>
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
            <S.Button
              $isOpenCommentBox={isOpenCommentBox}
              color={ButtonColor.secondary}
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
