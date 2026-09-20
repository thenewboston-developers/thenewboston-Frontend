import {useDispatch, useSelector} from 'react-redux';
import {mdiDotsVertical} from '@mdi/js';

import Avatar from 'components/Avatar';
import ContentWithMentions from 'components/ContentWithMentions';
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
  isFirst: boolean;
}

const Comment: SFC<CommentProps> = ({className, comment, isFirst = false}) => {
  const [commentEditModalIsOpen, toggleCommentEditModal] = useToggle(false);
  const dispatch = useDispatch<AppDispatch>();
  const self = useSelector(getSelf);

  const {content, created_date, id, mentioned_users, owner, price_amount, price_currency} = comment;
  const profilePath = `/profile/${owner.id}`;

  const handleDelete = async () => {
    try {
      await dispatch(deleteComment(id));
      displayToast('Comment deleted!', ToastType.SUCCESS);
    } catch (error) {
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

  const renderMetadata = () => {
    return (
      <S.Metadata>
        <S.Date>{shortDate(created_date, true)}</S.Date>
        {renderPriceMini()}
      </S.Metadata>
    );
  };

  const renderPriceMini = () => {
    if (!price_amount || !price_currency) return null;

    return (
      <>
        <S.Dot aria-hidden="true">·</S.Dot>
        <S.PriceMini currency={price_currency} price={price_amount} />
      </>
    );
  };

  return (
    <>
      <S.Container $isFirst={isFirst} className={className}>
        <S.AvatarLink aria-hidden="true" tabIndex={-1} to={profilePath}>
          <Avatar size="32px" src={owner.avatar} />
        </S.AvatarLink>
        <S.Main>
          <S.BubbleRow>
            <S.Bubble>
              <S.Username to={profilePath}>{owner.username}</S.Username>
              <S.Content>
                <ContentWithMentions content={content} mentionedUsers={mentioned_users || []} />
              </S.Content>
            </S.Bubble>
            {renderDropdownMenu()}
          </S.BubbleRow>
          {renderMetadata()}
        </S.Main>
      </S.Container>
      {commentEditModalIsOpen ? <CommentEditModal close={toggleCommentEditModal} comment={comment} /> : null}
    </>
  );
};

export default Comment;
