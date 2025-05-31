import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import {mdiChevronDown, mdiChevronUp, mdiCommentTextOutline, mdiDotsVertical} from '@mdi/js';

import {ButtonColor} from 'components/Button';
import CurrencyLogo from 'components/CurrencyLogo';
import Linkify from 'components/Linkify';
import UserLabel from 'components/UserLabel';
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
  const currencies = useSelector(getCurrencies);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const self = useSelector(getSelf);
  const [imageModalIsOpen, toggleImageModal] = useToggle(false);
  const [isOpenCommentBox, setIsOpenCommentBox] = useState(true);
  const [postModalIsOpen, togglePostModal] = useToggle(false);
  const [showFullContent, setShowFullContent] = useState(false);

  const {content, created_date, id, image, owner, price_amount, price_currency, recipient} = post;
  const isTransferPost = !!(recipient && price_amount && price_currency);

  const handleDelete = async () => {
    try {
      await dispatch(deletePost(id));
      displayToast('Post deleted!', ToastType.SUCCESS);
    } catch (error) {
      displayErrorToast('Error deleting post');
    }
  };

  const handleClick = () => {
    if (!owner.id) return;
    navigate(`/profile/${owner.id}`);
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
              <S.Description>{shortDate(created_date, true)}</S.Description>
            </S.Right>
          </S.Text>
          {renderDropdownMenu()}
        </S.Top>
        {isTransferPost && (
          <S.TransferInfo>
            <S.TransferHeader>Coin Transfer</S.TransferHeader>
            <S.TransferDetails>
              <UserLabel avatar={owner.avatar} description="" id={owner.id} username={owner.username} />
              <S.TransferArrow>→</S.TransferArrow>
              <UserLabel avatar={recipient!.avatar} description="" id={recipient!.id} username={recipient!.username} />
            </S.TransferDetails>
            <S.TransferAmount>
              {price_currency && currencies[price_currency] && (
                <>
                  <CurrencyLogo logo={currencies[price_currency].logo} width="20px" />
                  <span>
                    {price_amount?.toLocaleString()} {currencies[price_currency].ticker}
                  </span>
                </>
              )}
            </S.TransferAmount>
          </S.TransferInfo>
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
                  {renderContent().slice(0, 400)}...
                  <S.TextLink onClick={toggleShowFullContent}>See more</S.TextLink>
                </S.TextContent>
              </>
            )}
          </Linkify>
        </S.Content>

        {image ? <S.Img onClick={handlePostImageClick} alt="image" src={image} /> : null}
        <S.Line />
        <S.Div>
          <S.BoxLeft>
            <S.Button
              text="Comment"
              color={ButtonColor.secondary}
              iconLeft={mdiCommentTextOutline}
              iconRight={isOpenCommentBox ? mdiChevronUp : mdiChevronDown}
              onClick={() => setIsOpenCommentBox(!isOpenCommentBox)}
              $isOpenCommentBox={isOpenCommentBox}
            />
          </S.BoxLeft>
        </S.Div>
        {isOpenCommentBox && <Comments postId={post.id} />}
      </S.Container>
      {postModalIsOpen ? <PostModal close={togglePostModal} post={post} /> : null}
      {imageModalIsOpen && image ? <FullScreenImageModal close={toggleImageModal} imageSrc={image} /> : null}
    </>
  );
};

export default Post;
