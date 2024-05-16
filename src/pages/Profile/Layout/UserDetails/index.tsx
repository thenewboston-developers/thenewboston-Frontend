import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {mdiSquareEditOutline} from '@mdi/js';

import logo from 'assets/logo192.png';
import {createFollower, deleteFollower, getFollowers} from 'api/followers';
import DefaultAvatar from 'assets/default-avatar.png';
import {ButtonColor} from 'components/Button';
import {useToggle, useUser} from 'hooks';
import ProfileEditModal from 'modals/ProfileEditModal';
import {getSelf, getUserStats} from 'selectors/state';
import {FollowerReadSerializer, SFC} from 'types';
import {displayErrorToast} from 'utils/toasts';
import {formatNumber} from 'utils/numbers';
import * as S from './Styles';

const UserDetails: SFC = ({className}) => {
  const [follower, setFollower] = useState<FollowerReadSerializer | null>(null);
  const [profileEditModalIsOpen, toggleProfileEditModal] = useToggle(false);
  const {id} = useParams();
  const self = useSelector(getSelf);
  const user = useUser(id);
  const userStats = useSelector(getUserStats);

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

  const renderStatesAndBalance = () => {
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
          <S.Value flex={true}>
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
          {renderStatesAndBalance()}
          {renderEditProfileButton()}
          {renderFollowButton()}
        </S.Wrapper>
      </S.Container>
      {profileEditModalIsOpen ? <ProfileEditModal close={toggleProfileEditModal} /> : null}
    </>
  );
};

export default UserDetails;
