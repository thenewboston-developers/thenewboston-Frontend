import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {mdiSquareEditOutline} from '@mdi/js';

import DefaultAvatar from 'assets/default-avatar.svg';
import ProfileEditModal from 'modals/ProfileEditModal';
import logo from 'assets/logo192.png';
import {AppDispatch, FollowerReadSerializer, SFC} from 'types';
import {ButtonColor} from 'components/Button';
import {createFollower, deleteFollower} from 'dispatchers/followers';
import {displayErrorToast} from 'utils/toasts';
import {formatNumber} from 'utils/numbers';
import {getFollowings as getFollowingsState} from 'selectors/state';
import {getFollowings} from 'dispatchers/followings';
import {getSelf, getUserStats} from 'selectors/state';
import {useToggle, useUser} from 'hooks';

import * as S from './Styles';

const UserDetails: SFC = ({className}) => {
  const [profileEditModalIsOpen, toggleProfileEditModal] = useToggle(false);
  const dispatch = useDispatch<AppDispatch>();
  const self = useSelector(getSelf);
  const {id} = useParams();
  const user = useUser(id);
  const userStats = useSelector(getUserStats);
  const {items: followings} = useSelector(getFollowingsState);

  const userId = id ? parseInt(id, 10) : null;
  const follower = followings.find((obj: FollowerReadSerializer) => obj.following.id === userId);
  const {
    following_count = 0,
    followers_count = 0,
    default_wallet_balance = 0,
  } = id && userStats[id] ? userStats[id] : {};

  useEffect(() => {
    if (!self.id || !userId) return;
    if (self.id == userId) return;

    (async () => {
      try {
        await dispatch(getFollowings({follower: self.id!, following: userId}));
      } catch (error) {
        console.error(error);
        displayErrorToast('Error fetching follow relationship');
      }
    })();
  }, [dispatch, self.id, userId]);

  const handleFollowButtonClick = async () => {
    if (!userId || self.id === userId) return null;

    if (follower) {
      try {
        await dispatch(deleteFollower(follower.following.id));
      } catch (error) {
        console.error(error);
        displayErrorToast('Error unfollowing user');
      }
    } else {
      try {
        await dispatch(createFollower({following: userId}));
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
    return (
      <S.Button
        onClick={toggleProfileEditModal}
        text="Edit Profile"
        color={ButtonColor.secondary}
        iconLeft={mdiSquareEditOutline}
      />
    );
  };

  const renderFollowButton = () => {
    if (self.id === userId) return null;
    return (
      <S.Button color={ButtonColor.primary} onClick={handleFollowButtonClick} text={follower ? 'Unfollow' : 'Follow'} />
    );
  };

  const renderUsername = () => {
    if (!user) return null;
    return <S.Username>{user.username}</S.Username>;
  };

  const renderStatsAndBalance = () => {
    if (!user) return null;
    return (
      <S.StateBalanceWrapper>
        <S.Flex>
          <S.Title>Followings:</S.Title>
          <S.Value>{following_count ?? 0}</S.Value>
        </S.Flex>
        <S.Separator />
        <S.Flex>
          <S.Title>Followers:</S.Title>
          <S.Value>{followers_count}</S.Value>
        </S.Flex>
        <S.Separator />
        <S.Flex>
          <S.Title>Your balance:</S.Title>
          <S.Value $flex={true}>
            <S.TNBLogo src={logo} />
            {formatNumber(default_wallet_balance)}
          </S.Value>
        </S.Flex>
      </S.StateBalanceWrapper>
    );
  };

  return (
    <>
      <S.Container className={className}>
        {renderAvatar()}
        {renderUsername()}
        <S.Wrapper>
          {renderStatsAndBalance()}
          {renderEditProfileButton()}
          {renderFollowButton()}
        </S.Wrapper>
      </S.Container>
      {profileEditModalIsOpen ? <ProfileEditModal close={toggleProfileEditModal} /> : null}
    </>
  );
};

export default UserDetails;
