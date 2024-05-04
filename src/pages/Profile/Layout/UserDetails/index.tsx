import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';

import {createFollower, deleteFollower, getFollowers} from 'api/followers';
import {displayErrorToast} from 'utils/toasts';
import {FollowerReadSerializer, SFC} from 'types';
import {formatNumber} from 'utils/numbers';
import {getSelf, getUserStats} from 'selectors/state';
import {useToggle, useUser} from 'hooks';
import DefaultAvatar from 'assets/default-avatar.png';
import logo from 'assets/logo192.png';
import ProfileEditModal from 'modals/ProfileEditModal';
import * as S from './Styles';

const UserDetails: SFC = ({className}) => {
  const [follower, setFollower] = useState<FollowerReadSerializer | null>(null);
  const [profileEditModalIsOpen, toggleProfileEditModal] = useToggle(false);
  const {id} = useParams();
  const self = useSelector(getSelf);
  const userStats = useSelector(getUserStats);
  const user = useUser(id);

  const userId = id ? parseInt(id, 10) : null;

  const {
    following_count = 0,
    followers_count = 0,
    default_wallet_balance = 0,
  } = id && userStats[id] ? userStats[id] : {};

  useEffect(() => {
    setFollower(null);

    if (!self.id || !userId) return;
    if (self.id == userId) return;

    (async () => {
      try {
        const response = await getFollowers({follower: self.id!, following: userId});
        setFollower(!!response.length ? response[0] : null);
      } catch (error) {
        console.error(error);
        displayErrorToast('Error fetching follow relationship');
      }
    })();
  }, [self.id, userId]);

  const handleFollowButtonClick = async () => {
    if (!userId || self.id === userId) return null;

    if (follower) {
      try {
        await deleteFollower(follower.id);
        setFollower(null);
      } catch (error) {
        console.error(error);
        displayErrorToast('Error unfollowing user');
      }
    } else {
      try {
        const response = await createFollower({following: userId});
        setFollower(response);
      } catch (error) {
        console.error(error);
        displayErrorToast('Error unfollowing user');
      }
    }
  };

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
    return <S.Button onClick={toggleProfileEditModal} text="Edit Profile" />;
  };

  const renderFollowButton = () => {
    if (self.id === userId) return null;
    return <S.Button onClick={handleFollowButtonClick} text={follower ? 'Unfollow' : 'Follow'} />;
  };

  const renderUsername = () => {
    if (!user) return null;
    return <S.Username>{user.username}</S.Username>;
  };

  const renderStats = () => {
    if (!user) return null;
    return (
      <S.Stats>
        Followings: <b>{following_count ?? 0}</b> | Followers: <b>{followers_count}</b>
      </S.Stats>
    );
  };

  const renderDefaultWalletBalance = () => {
    if (!user) return null;
    return (
      <S.WalletBalance>
        Your Balance: <S.TNBLogo src={logo} /> <b>{formatNumber(default_wallet_balance)}</b>
      </S.WalletBalance>
    );
  };

  return (
    <>
      <S.Container className={className}>
        {renderAvatar()}
        {renderUsername()}
        {renderStats()}
        {renderDefaultWalletBalance()}
        {renderEditProfileButton()}
        {renderFollowButton()}
      </S.Container>
      {profileEditModalIsOpen ? <ProfileEditModal close={toggleProfileEditModal} /> : null}
    </>
  );
};

export default UserDetails;
