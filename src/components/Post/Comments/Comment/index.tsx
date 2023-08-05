import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {mdiDotsVertical} from '@mdi/js';

import Avatar from 'components/Avatar';
import {getSelf} from 'selectors/state';
import {Comment as TComment, SFC} from 'types';
import {shortDate} from 'utils/dates';
import * as S from './Styles';

export interface CommentProps {
  comment: TComment;
}

const Comment: SFC<CommentProps> = ({className, comment}) => {
  const self = useSelector(getSelf);

  const {content, created_date, owner} = comment;

  const menuOptions = [
    {
      label: 'Edit',
      onClick: () => {},
    },
    {
      label: 'Delete',
      onClick: () => {},
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
