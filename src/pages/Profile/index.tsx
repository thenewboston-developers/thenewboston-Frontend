import {useSelfAvatar, useToggle} from 'hooks';
import EditProfileModal from 'modals/EditProfileModal';
import {SFC} from 'types';
import * as S from './Styles';

const Profile: SFC = ({className}) => {
  const [editProfileModalIsOpen, toggleEditProfileModal] = useToggle(false);
  const selfAvatar = useSelfAvatar();

  const renderAvatar = () => {
    return (
      <S.ImgWrapper>
        <S.Img alt="image" src={selfAvatar} />
      </S.ImgWrapper>
    );
  };

  return (
    <>
      <S.Container className={className}>
        <S.Left>
          {renderAvatar()}
          <S.Button onClick={toggleEditProfileModal} text="Edit Profile" />
        </S.Left>
        <S.Right>right</S.Right>
      </S.Container>
      {editProfileModalIsOpen ? <EditProfileModal close={toggleEditProfileModal} /> : null}
    </>
  );
};

export default Profile;
