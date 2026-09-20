import {Link} from 'react-router-dom';

import {SFC} from 'types';

import * as S from './Styles';

export interface UserLabelProps {
  avatar: string | null;
  avatarSize?: string;
  clickable?: boolean;
  description: string;
  id: number | null;
  username: string;
}

const UserLabel: SFC<UserLabelProps> = ({
  avatar,
  avatarSize = '44px',
  className,
  clickable = true,
  description,
  id,
  username,
}) => {
  const isClickable = !!id && clickable;
  const profilePath = `/profile/${id}`;

  const renderAvatar = () => {
    if (!isClickable) return <S.Avatar size={avatarSize} src={avatar} />;

    return (
      <S.AvatarLink aria-hidden="true" tabIndex={-1} to={profilePath}>
        <S.Avatar size={avatarSize} src={avatar} />
      </S.AvatarLink>
    );
  };

  const renderUsername = () => {
    if (!isClickable) return <S.Username $isClickable={false}>{username}</S.Username>;

    return (
      <S.Username $isClickable as={Link} to={profilePath}>
        {username}
      </S.Username>
    );
  };

  return (
    <S.Container className={className}>
      {renderAvatar()}
      <S.Right>
        {renderUsername()}
        {description ? <S.Description>{description}</S.Description> : null}
      </S.Right>
    </S.Container>
  );
};

export default UserLabel;
