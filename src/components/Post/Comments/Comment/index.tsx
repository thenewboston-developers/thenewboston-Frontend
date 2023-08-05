import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {mdiDotsVertical} from '@mdi/js';

import Avatar from 'components/Avatar';
import {deleteComment} from 'dispatchers/comments';
import {ToastType} from 'enums';
import {getSelf} from 'selectors/state';
import {AppDispatch, Comment as TComment, SFC} from 'types';
import {shortDate} from 'utils/dates';
import {displayErrorToast, displayToast} from 'utils/toast';
import * as S from './Styles';

export interface CommentProps {
  comment: TComment;
}

const Comment: SFC<CommentProps> = ({className, comment}) => {
  const dispatch = useDispatch<AppDispatch>();
  const self = useSelector(getSelf);

  const {content, created_date, id, owner} = comment;

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
      onClick: () => {},
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

  return (
    <S.Container className={className}>
      <Link to={`/profile/${owner.id}`}>
        <Avatar src={owner.avatar} />
      </Link>
      <S.Middle>
        {renderNameDateContainer()}
        <S.Content>{content}</S.Content>
      </S.Middle>
      <S.Right>{renderDropdownMenu()}</S.Right>
    </S.Container>
  );
};

export default Comment;
