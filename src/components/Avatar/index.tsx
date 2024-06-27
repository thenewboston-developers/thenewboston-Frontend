import DefaultAvatar from 'assets/default_avatar.svg';
import {SFC} from 'types';
import * as S from './Styles';

export interface AvatarProps {
  src: string | null;
  size?: string;
}

const Avatar: SFC<AvatarProps> = ({className, src, size = '36px'}) => {
  return (
    <S.Container className={className}>
      <S.Img alt="avatar" src={src || DefaultAvatar} $size={size} />
    </S.Container>
  );
};

export default Avatar;
