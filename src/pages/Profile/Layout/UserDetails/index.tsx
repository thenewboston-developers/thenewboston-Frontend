import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';

import {getFollowers} from 'api/followers';
import DefaultAvatar from 'assets/default-avatar.png';
import {useToggle, useUser} from 'hooks';
import EditProfileModal from 'modals/EditProfileModal';
import {getSelf} from 'selectors/state';
import {SFC} from 'types';
import {displayErrorToast} from 'utils/toast';
import * as S from './Styles';

const UserDetails: SFC = ({className}) => {
  const [editProfileModalIsOpen, toggleEditProfileModal] = useToggle(false);
  const {id} = useParams();
  const [isFollowed, setIsFollowed] = useState(false);
  const self = useSelector(getSelf);
  const user = useUser(id);

  const userId = id ? parseInt(id, 10) : null;

  useEffect(() => {
    if (!self.id || !userId) return;
    if (self.id == userId) return;

    (async () => {
      try {
        const response = await getFollowers({follower: self.id!, following: userId});
        console.log(response);
        setIsFollowed(!!response.length);
      } catch (error) {
        console.error(error);
        displayErrorToast('Error fetching follow relationship');
      }
    })();
  }, [self.id, userId]);

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

  const renderFollowButton = () => {
    if (self.id === userId) return null;
    return <S.Button onClick={() => {}} text={isFollowed ? 'Unfollow' : 'Follow'} />;
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
        {renderFollowButton()}
      </S.Container>
      {editProfileModalIsOpen ? <EditProfileModal close={toggleEditProfileModal} /> : null}
    </>
  );
};

export default UserDetails;
