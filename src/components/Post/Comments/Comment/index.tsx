import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {mdiDotsVertical} from '@mdi/js';

import Avatar from 'components/Avatar';
import Linkify from 'components/Linkify';
import {deleteComment} from 'dispatchers/comments';
import {ToastType} from 'enums';
import {useToggle} from 'hooks';
import CommentEditModal from 'modals/CommentEditModal';
import {getSelf} from 'selectors/state';
import {AppDispatch, Comment as TComment, SFC} from 'types';
import {shortDate} from 'utils/dates';
import {displayErrorToast, displayToast} from 'utils/toasts';
import * as S from './Styles';

export interface CommentProps {
  comment: TComment;
}

const Comment: SFC<CommentProps> = ({className, comment}) => {
  const [commentEditModalIsOpen, toggleCommentEditModal] = useToggle(false);
  const dispatch = useDispatch<AppDispatch>();
  const self = useSelector(getSelf);

  const {content, created_date, id, owner, price_amount, price_core} = comment;

  const handleDelete = async () => {
    try {
      await dispatch(deleteComment(id));
      displayToast('Comment deleted!', ToastType.SUCCESS);
    } catch (error) {
      console.error(error);
      displayErrorToast('Error deleting comment');
    }
  };

  const menuOptions = [
    {
      label: 'Edit',
      onClick: toggleCommentEditModal,
    },
    {
      label: 'Delete',
      onClick: handleDelete,
    },
  ];

  const renderDropdownMenu = () => {
    if (self.id !== owner.id) return null;
    return <S.DropdownMenu icon={mdiDotsVertical} options={menuOptions} />;
  };

  const renderNameDateContainer = () => {
    return (
      <S.UsernameDateContainer>
        <Link to={`/profile/${owner.id}`}>
          <S.Username>{owner.username}</S.Username>
        </Link>
        <S.Dot>·</S.Dot>
        <S.Date>{shortDate(created_date, true)}</S.Date>
      </S.UsernameDateContainer>
    );
  };

  const renderPriceMini = () => {
    if (!price_amount || !price_core) return null;
    return <S.PriceMini price={price_amount} coreId={price_core} />;
  };

  return (
    <>
      <S.Container className={className}>
        <Link to={`/profile/${owner.id}`}>
          <Avatar src={owner.avatar} />
        </Link>
        <S.Middle>
          {renderNameDateContainer()}
          <S.Content>
            <Linkify>{content}</Linkify>
          </S.Content>
          {renderPriceMini()}
        </S.Middle>
        <S.Right>{renderDropdownMenu()}</S.Right>
      </S.Container>
      {commentEditModalIsOpen ? <CommentEditModal close={toggleCommentEditModal} comment={comment} /> : null}
    </>
  );
};

export default Comment;
