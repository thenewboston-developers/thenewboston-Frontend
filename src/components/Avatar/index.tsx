import {useSelfAvatar} from 'hooks';
import {SFC} from 'types';
import * as S from './Styles';

const Avatar: SFC = ({className}) => {
  const selfAvatar = useSelfAvatar();

  return (
    <S.Container className={className}>
      <S.Img alt="avatar" src={selfAvatar} />
    </S.Container>
  );
};

export default Avatar;
