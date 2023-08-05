import {useDispatch, useSelector} from 'react-redux';
import {mdiDotsVertical} from '@mdi/js';

import UserLabel from 'components/UserLabel';
import {useToggle} from 'hooks';
import {deletePost} from 'dispatchers/posts';
import {ToastType} from 'enums';
import PostModal from 'modals/PostModal';
import {getSelf} from 'selectors/state';
import {AppDispatch, Post as TPost, SFC} from 'types';
import {shortDate} from 'utils/dates';
import {displayErrorToast, displayToast} from 'utils/toast';
import Comments from './Comments';
import * as S from './Styles';

export interface PostProps {
  post: TPost;
}

const Post: SFC<PostProps> = ({className, post}) => {
  const [postModalIsOpen, togglePostModal] = useToggle(false);
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
        <S.Content>{content}</S.Content>
        {image ? <S.Img alt="image" src={image} /> : null}
        <Comments postId={post.id} />
      </S.Container>
      {postModalIsOpen ? <PostModal close={togglePostModal} post={post} /> : null}
    </>
  );
};

export default Post;
