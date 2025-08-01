import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';

import {getFollowers} from 'api/followers';
import DefaultAvatar from 'assets/default-avatar.svg';
import logo from 'assets/logo192.png';
import {ButtonColor} from 'components/Button';
import SocialLinks from 'components/SocialLinks';
import {createFollower, deleteFollower} from 'dispatchers/followers';
import {getUserStats} from 'dispatchers/userStats';
import {useToggle, useUser} from 'hooks';
import FullScreenImageModal from 'modals/FullScreenImageModal';
import ProfileEditModal from 'modals/ProfileEditModal';
import SendModal from 'modals/SendModal';
import {getSelf, getUserStats as getUserStatsState} from 'selectors/state';
import {AppDispatch, SFC} from 'types';
import {formatNumber} from 'utils/numbers';
import {displayErrorToast} from 'utils/toasts';

import * as S from './Styles';

const UserDetails: SFC = ({className}) => {
  const [profileAvatarModalIsOpen, toggleProfileAvatarModal] = useToggle(false);
  const [profileEditModalIsOpen, toggleProfileEditModal] = useToggle(false);
  const [selfFollowing, setSelfFollowing] = useState<boolean>(false);
  const [sendModalIsOpen, toggleSendModal] = useToggle(false);
  const {id} = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const self = useSelector(getSelf);
  const user = useUser(id);
  const userStats = useSelector(getUserStatsState);
  const userAvatar = user?.avatar || DefaultAvatar;
  const userBanner = user?.banner;
  const userId = id ? parseInt(id, 10) : null;
  const {
    default_wallet_balance = 0,
    followers_count = 0,
    following_count = 0,
  } = id && userStats[id] ? userStats[id] : {};

  useEffect(() => {
    if (!self.id || !userId) return;
    if (self.id == userId) return;

    (async () => {
      try {
        const responseData = await getFollowers('', {follower: self.id!, following: userId});
        if (responseData.results.length > 0) {
          setSelfFollowing(true);
        } else {
          setSelfFollowing(false);
        }
      } catch (error) {
        setSelfFollowing(false);
        displayErrorToast('Error fetching follow relationship');
      }
    })();
  }, [dispatch, self.id, userId]);

  const handleClose = () => {
    toggleProfileAvatarModal();
  };

  const handleFollowButtonClick = async () => {
    if (!userId || self.id === userId) return null;

    if (selfFollowing) {
      try {
        await dispatch(deleteFollower(userId));
        setSelfFollowing(false);
        await updateUserStats();
      } catch (error) {
        displayErrorToast('Error unfollowing user');
      }
    } else {
      try {
        await dispatch(createFollower({following: userId}));
        setSelfFollowing(true);
        await updateUserStats();
      } catch (error) {
        displayErrorToast('Error following user');
      }
    }
  };

  const renderAvatar = () => {
    if (!user) return;
    return (
      <S.ImageWrapper>
        <S.Image alt="image" onClick={toggleProfileAvatarModal} src={userAvatar} />
      </S.ImageWrapper>
    );
  };

  const renderBio = () => {
    if (!user || !user.bio) return null;
    return <S.Bio>{user.bio}</S.Bio>;
  };

  const renderEditProfileButton = () => {
    if (self.id !== userId) return null;
    return <S.Button color={ButtonColor.secondary} onClick={toggleProfileEditModal} text="Edit Profile" />;
  };

  const renderFollowButton = () => {
    if (self.id === userId) return null;
    return (
      <S.Button
        color={ButtonColor.primary}
        onClick={handleFollowButtonClick}
        text={selfFollowing ? 'Unfollow' : 'Follow'}
      />
    );
  };

  const renderSendButton = () => {
    if (self.id === userId) return null;
    return <S.Button color={ButtonColor.secondary} onClick={toggleSendModal} text="Send" />;
  };

  const renderSocialLinks = () => {
    if (!user) return null;
    return <SocialLinks entity={user} />;
  };

  const renderStatsAndBalance = () => {
    if (!user) return null;
    return (
      <S.StateBalanceWrapper>
        <S.Flex>
          <S.Title>Following:</S.Title>
          <S.Value>{following_count ?? 0}</S.Value>
        </S.Flex>
        <S.Separator />
        <S.Flex>
          <S.Title>Followers:</S.Title>
          <S.Value>{followers_count}</S.Value>
        </S.Flex>
        <S.Separator />
        <S.Flex>
          <S.Title>Balance:</S.Title>
          <S.Value $flex={true}>
            <S.TNBLogo src={logo} />
            {formatNumber(default_wallet_balance)}
          </S.Value>
        </S.Flex>
      </S.StateBalanceWrapper>
    );
  };

  const renderUsername = () => {
    if (!user) return null;
    return <S.Username>{user.username}</S.Username>;
  };

  const updateUserStats = async () => {
    if (userId) await dispatch(getUserStats(userId));
  };

  return (
    <>
      {userBanner ? <S.UserBanner src={userBanner} /> : <S.Banner />}
      <S.Container className={className}>
        {renderAvatar()}
        {renderUsername()}
        {renderBio()}
        {renderSocialLinks()}
        <S.Wrapper>
          {renderStatsAndBalance()}
          <S.ButtonGroup>
            {renderEditProfileButton()}
            {renderSendButton()}
            {renderFollowButton()}
          </S.ButtonGroup>
        </S.Wrapper>
      </S.Container>
      {profileEditModalIsOpen ? <ProfileEditModal close={toggleProfileEditModal} /> : null}
      {profileAvatarModalIsOpen ? <FullScreenImageModal close={handleClose} imageSrc={userAvatar} /> : null}
      {sendModalIsOpen && user ? (
        <SendModal
          close={toggleSendModal}
          onSuccess={() => {
            if (userId) dispatch(getUserStats(userId));
          }}
          recipient={user}
        />
      ) : null}
    </>
  );
};

export default UserDetails;
