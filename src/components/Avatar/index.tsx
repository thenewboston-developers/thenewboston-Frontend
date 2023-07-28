import DefaultAvatar from 'assets/default-avatar.png';
import {SFC} from 'types';
import * as S from './Styles';

const Avatar: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <S.Img alt="avatar" src={DefaultAvatar} />
    </S.Container>
  );
};

export default Avatar;
