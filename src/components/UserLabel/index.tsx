import {SFC} from 'types';
import * as S from './Styles';

export interface UserLabelProps {
  avatar: string | null;
  description: string;
  username: string;
}

const UserLabel: SFC<UserLabelProps> = ({avatar, className, description, username}) => {
  return (
    <S.Container className={className}>
      <S.Avatar src={avatar} />
      <S.Right>
        <S.Username>{username}</S.Username>
        <S.Description>{description}</S.Description>
      </S.Right>
    </S.Container>
  );
};

export default UserLabel;
