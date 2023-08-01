import DefaultAvatar from 'assets/default-avatar.png';
import {SFC} from 'types';
import * as S from './Styles';

export interface AvatarProps {
  src: string | null;
}

const Avatar: SFC<AvatarProps> = ({className, src}) => {
  return (
    <S.Container className={className}>
      <S.Img alt="avatar" src={src || DefaultAvatar} />
    </S.Container>
  );
};

export default Avatar;
