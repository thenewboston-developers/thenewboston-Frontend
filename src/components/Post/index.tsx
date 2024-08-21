import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import {
  mdiChevronDown,
  mdiChevronUp,
  mdiCommentTextOutline,
  mdiDeleteOutline,
  mdiDotsVertical,
  mdiSquareEditOutline,
} from '@mdi/js';

import Comments from './Comments';
import FullScreenImageModal from 'modals/FullScreenImageModal';
import Line from 'components/Line';
import Linkify from 'components/Linkify';
import PostModal from 'modals/PostModal';
import {AppDispatch, Post as TPost, SFC} from 'types';
import {ButtonColor} from 'components/Button';
import {ToastType} from 'enums';
import {deletePost} from 'dispatchers/posts';
import {displayErrorToast, displayToast} from 'utils/toasts';
import {getSelf} from 'selectors/state';
import {shortDate} from 'utils/dates';
import {useToggle} from 'hooks';

import * as S from './Styles';
import Reaction from './Reaction';

export interface PostProps {
  post: TPost;
}

const Post: SFC<PostProps> = ({className, post}) => {
  const navigate = useNavigate();
  const [isOpenCommentBox, setIsOpenCommentBox] = useState(true);
  const [postModalIsOpen, togglePostModal] = useToggle(false);
  const [showFullContent, setShowFullContent] = useState(true);
  const [imageModalIsOpen, toggleImageModal] = useToggle(false);

  const toggleShowFullContent = () => {
    setShowFullContent(!showFullContent);
  };

  const dispatch = useDispatch<AppDispatch>();
  const self = useSelector(getSelf);

  const {content, created_date, id, image, owner} = post;

  const handleDelete = async () => {
    try {
      await dispatch(deletePost(id));
      displayToast('Post deleted!', ToastType.SUCCESS);
    } catch (error) {
      console.error(error);
      displayErrorToast('Error deleting post');
    }
  };

  const menuOptions = [
    {
      label: 'Edit',
      menuIcon: mdiSquareEditOutline,
      onClick: togglePostModal,
    },
    {
      label: 'Delete',
      menuIcon: mdiDeleteOutline,
      onClick: handleDelete,
    },
  ];

  const renderDropdownMenu = () => {
    if (post.owner.id !== self.id) return null;
    return <S.DropdownMenu icon={mdiDotsVertical} options={menuOptions} />;
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
              <S.Dot>·</S.Dot>
              <S.Description>{shortDate(created_date, true)}</S.Description>
            </S.Right>
          </S.Text>
          {renderDropdownMenu()}
        </S.Top>
        <S.Content>
          <Linkify>
            {!showFullContent || content.length <= 400 ? (
              <>
                <S.TextContent>
                  {content}
                  {content.length > 400 && <S.TextLink onClick={toggleShowFullContent}>See less</S.TextLink>}
                </S.TextContent>
              </>
            ) : (
              <>
                <S.TextContent>
                  {`${content.slice(0, 400)}...`}
                  <S.TextLink onClick={toggleShowFullContent}>See more</S.TextLink>
                </S.TextContent>
              </>
            )}
          </Linkify>
        </S.Content>

        {image ? <S.Img onClick={handlePostImageClick} alt="image" src={image} /> : null}
        <Line />
        <S.Div>
          <S.BoxLeft>
            <Reaction postId={post.id} userReaction={post.user_reaction} userReactions={post.user_reactions} />
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
