import {useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';

import DefaultAvatar from 'assets/default-avatar.png';
import {useToggle, useUser} from 'hooks';
import EditProfileModal from 'modals/EditProfileModal';
import {getSelf} from 'selectors/state';
import {SFC} from 'types';
import * as S from './Styles';

const UserDetails: SFC = ({className}) => {
  const [editProfileModalIsOpen, toggleEditProfileModal] = useToggle(false);
  const {id} = useParams();
  const self = useSelector(getSelf);
  const user = useUser(id);

  const userId = id ? parseInt(id, 10) : null;

  const renderAvatar = () => {
    if (!user) return;
    return (
      <S.ImgWrapper>
        <S.Img alt="image" src={user.avatar || DefaultAvatar} />
      </S.ImgWrapper>
    );
  };

  const renderEditProfileButton = () => {
    if (self.id !== userId) return null;
    return <S.Button onClick={toggleEditProfileModal} text="Edit Profile" />;
  };

  const renderUsername = () => {
    if (!user) return null;
    return <S.Username>{user.username}</S.Username>;
  };

  return (
    <>
      <S.Container className={className}>
        {renderAvatar()}
        {renderUsername()}
        {renderEditProfileButton()}
      </S.Container>
      {editProfileModalIsOpen ? <EditProfileModal close={toggleEditProfileModal} /> : null}
    </>
  );
};

export default UserDetails;
