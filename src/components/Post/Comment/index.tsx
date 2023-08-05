import {Link} from 'react-router-dom';
import {mdiDotsVertical} from '@mdi/js';

import Avatar from 'components/Avatar';
import {SFC} from 'types';
import * as S from './Styles';

const Comment: SFC = ({className}) => {
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
    return <S.DropdownMenu icon={mdiDotsVertical} options={menuOptions} />;
  };

  const renderNameDateContainer = () => {
    return (
      <S.UsernameDateContainer>
        <Link to={`/profile/1`}>
          <S.Username>bucky</S.Username>
        </Link>
        <S.Dot>·</S.Dot>
        <S.Date>12/12/12</S.Date>
      </S.UsernameDateContainer>
    );
  };

  return (
    <S.Container className={className}>
      <Link to={`/profile/1`}>
        <Avatar src="https://avatars.githubusercontent.com/u/8547538?v=4" />
      </Link>
      <S.Middle>
        {renderNameDateContainer()}
        <S.Content>Hey now</S.Content>
      </S.Middle>
      <S.Right>{renderDropdownMenu()}</S.Right>
    </S.Container>
  );
};

export default Comment;
