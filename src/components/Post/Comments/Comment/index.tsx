import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {mdiDotsVertical} from '@mdi/js';

import Avatar from 'components/Avatar';
import DropdownMenu from 'components/DropdownMenu';
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

  const {content, created_date, id, owner, price_amount, price_currency} = comment;

  const handleDelete = async () => {
    try {
      await dispatch(deleteComment(id));
      displayToast('Comment deleted!', ToastType.SUCCESS);
    } catch (error) {
      displayErrorToast('Error deleting comment');
    }
  };

  const renderContent = () => {
    const words = content.split(' ');
    return words.map((word, index) => {
      if (word.length > 30) {
        return <S.LongContent key={index}>{word} </S.LongContent>;
      }
      return word + ' ';
    });
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
    return <DropdownMenu icon={mdiDotsVertical} options={menuOptions} />;
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
    if (!price_amount || !price_currency) return null;
    return <S.PriceMini currencyId={price_currency} price={price_amount} />;
  };

  return (
    <>
      <S.Container className={className}>
        <Link to={`/profile/${owner.id}`}>
          <Avatar src={owner.avatar} />
        </Link>
        <S.CommentSection>
          <S.HeadSection>
            {renderNameDateContainer()}
            <S.ActionsContainer>
              {renderPriceMini()}
              {renderDropdownMenu()}
            </S.ActionsContainer>
          </S.HeadSection>
          <S.Content>
            <Linkify>{renderContent()}</Linkify>
          </S.Content>
        </S.CommentSection>
      </S.Container>
      {commentEditModalIsOpen ? <CommentEditModal close={toggleCommentEditModal} comment={comment} /> : null}
    </>
  );
};

export default Comment;
