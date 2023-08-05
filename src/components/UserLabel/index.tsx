import {Link, useNavigate} from 'react-router-dom';

import {SFC} from 'types';
import * as S from './Styles';

export interface UserLabelProps {
  avatar: string | null;
  description: string;
  id: number | null;
  username: string;
}

const UserLabel: SFC<UserLabelProps> = ({avatar, className, description, id, username}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (!id) return;
    navigate(`/profile/${id}`);
  };

  const renderAvatar = () => {
    if (!id) return <S.Avatar src={avatar} />;

    return (
      <Link to={`/profile/${id}`}>
        <S.Avatar src={avatar} />
      </Link>
    );
  };

  return (
    <S.Container className={className}>
      {renderAvatar()}
      <S.Right>
        <S.Username $id={id} onClick={handleClick}>
          {username}
        </S.Username>
        <S.Description>{description}</S.Description>
      </S.Right>
    </S.Container>
  );
};

export default UserLabel;
