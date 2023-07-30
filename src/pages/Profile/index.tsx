import {useSelfAvatar} from 'hooks';
import {SFC} from 'types';
import * as S from './Styles';

const Profile: SFC = ({className}) => {
  const selfAvatar = useSelfAvatar();

  const renderAvatar = () => {
    return (
      <S.ImgWrapper>
        <S.Img alt="image" src={selfAvatar} />
      </S.ImgWrapper>
    );
  };

  return (
    <S.Container className={className}>
      <S.Left>{renderAvatar()}</S.Left>
      <S.Right>right</S.Right>
    </S.Container>
  );
};

export default Profile;
