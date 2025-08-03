import {Link, useNavigate} from 'react-router-dom';

import {SFC} from 'types';

import * as S from './Styles';

export interface UserLabelProps {
  avatar: string | null;
  clickable?: boolean;
  description: string;
  id: number | null;
  username: string;
}

const UserLabel: SFC<UserLabelProps> = ({avatar, className, clickable = true, description, id, username}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (!id || !clickable) return;
    navigate(`/profile/${id}`);
  };

  const renderAvatar = () => {
    if (!id || !clickable) return <S.Avatar src={avatar} size={'44px'} />;

    return (
      <Link to={`/profile/${id}`}>
        <S.Avatar src={avatar} size={'44px'} />
      </Link>
    );
  };

  return (
    <S.Container className={className}>
      {renderAvatar()}
      <S.Right>
        <S.Username $id={clickable ? id : null} onClick={handleClick}>
          {username}
        </S.Username>
        <S.Description>{description}</S.Description>
      </S.Right>
    </S.Container>
  );
};

export default UserLabel;
