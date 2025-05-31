import {useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {mdiAccountMinusOutline, mdiAccountPlusOutline} from '@mdi/js';
import Icon from '@mdi/react';

import Avatar from 'components/Avatar';
import EmptyText from 'components/EmptyText';
import InfiniteScroll from 'components/InfiniteScroll';
import {createFollower, deleteFollower, getFollowers, resetFollowers} from 'dispatchers/followers';
import {deleteFollowing, getFollowings, resetFollowings} from 'dispatchers/followings';
import {getUserStats} from 'dispatchers/userStats';
import {FollowerType} from 'enums';
import {getFollowers as getFollowersState, getFollowings as getFollowingsState, getSelf} from 'selectors/state';
import {AppDispatch, SFC, UserReadSerializer} from 'types';
import {displayErrorToast} from 'utils/toasts';

import * as S from './Styles';

export interface FollowerProps {
  type?: string;
}

const followerTypeConfig = {
  [FollowerType.FOLLOWERS]: {
    emptyText: 'No followers to display.',
    extractObject: (item: any) => item.follower,
    get: getFollowers,
    getParams: (userId?: number) => ({following: userId}),
    getState: getFollowersState,
    reset: resetFollowers,
    title: 'Followers',
  },
  [FollowerType.FOLLOWING]: {
    emptyText: 'No followings to display.',
    extractObject: (item: any) => item.following,
    get: getFollowings,
    getParams: (userId?: number) => ({follower: userId}),
    getState: getFollowingsState,
    reset: resetFollowings,
    title: 'Following',
  },
};

const Follower: SFC<FollowerProps> = ({className, type = FollowerType.FOLLOWERS}) => {
  const dispatch = useDispatch<AppDispatch>();
  const {id} = useParams();
  const userId = id ? parseInt(id, 10) : undefined;

  const {emptyText, extractObject, get, getParams, getState, reset, title} = followerTypeConfig[type as FollowerType];
  const self = useSelector(getSelf);
  const {count, items, hasMore, isLoading} = useSelector(getState);

  const followerList = useMemo(() => {
    return items;
  }, [items]);

  useEffect(() => {
    (async () => {
      try {
        dispatch(reset());
        await dispatch(get(getParams(userId)));
      } catch (error) {
        displayErrorToast(`Error fetching ${type.toLowerCase()}`);
      }
    })();
  }, [dispatch, userId, type, reset, get, getParams]);

  const fetchMoreFollowers = async () => {
    if (!isLoading && hasMore) {
      await dispatch(get());
    }
  };

  const renderContent = () => {
    if (followerList.length) return renderFollowerCards();
    return <EmptyText>{emptyText}</EmptyText>;
  };

  const renderFollowerCards = () => {
    return (
      <InfiniteScroll dataLength={followerList.length} hasMore={hasMore} heightMargin={200} next={fetchMoreFollowers}>
        {followerList.map((item, index) => {
          const user = extractObject(item);
          return getFollowerCard(index, item.id, item.self_following, user);
        })}
      </InfiniteScroll>
    );
  };

  const updateUserStats = async () => {
    if (self.id) await dispatch(getUserStats(self.id));
  };

  const handleFollowerFollowBtnClick = async (userID: number) => {
    await dispatch(createFollower({following: userID}));
    updateUserStats();
  };

  const handleFollowerUnFollowBtnClick = async (followingUserID: number) => {
    dispatch(deleteFollower(followingUserID));
    updateUserStats();
  };

  const handleFollowingUnFollowBtnClick = async (followerId: number, followingUserID: number) => {
    dispatch(deleteFollowing(followerId, followingUserID));
    updateUserStats();
  };

  const renderFollowButton = (followerId: number, user: UserReadSerializer, selfFollowing: boolean) => {
    if (self.id !== userId) return null;

    return type === FollowerType.FOLLOWERS ? (
      <S.BtnContainer>
        {selfFollowing ? (
          <S.UnFollowButton onClick={() => handleFollowerUnFollowBtnClick(user.id)}>
            <Icon path={mdiAccountMinusOutline} size={1} />
            <S.BtnText>Unfollow</S.BtnText>
          </S.UnFollowButton>
        ) : (
          <S.FollowButton onClick={() => handleFollowerFollowBtnClick(user.id)}>
            <Icon path={mdiAccountPlusOutline} size={1} />
            <S.BtnText>Follow</S.BtnText>
          </S.FollowButton>
        )}
      </S.BtnContainer>
    ) : (
      <S.BtnContainer>
        <S.UnFollowButton onClick={() => handleFollowingUnFollowBtnClick(followerId, user.id)}>
          <Icon path={mdiAccountMinusOutline} size={1} />
          <S.BtnText>Unfollow</S.BtnText>
        </S.UnFollowButton>
      </S.BtnContainer>
    );
  };

  const getFollowerCard = (index: number, followerId: number, selfFollowing: boolean, user: UserReadSerializer) => {
    return (
      <S.FollowerContainer key={index}>
        <S.Grid>
          <S.Counter>{index + 1}</S.Counter>
          <S.FollowerLink to={`/profile/${user.id}`}>
            <Avatar src={user.avatar} />
            <S.Username>{user.username}</S.Username>
          </S.FollowerLink>
          {renderFollowButton(followerId, user, selfFollowing)}
        </S.Grid>
      </S.FollowerContainer>
    );
  };

  return (
    <S.Container className={className}>
      <S.Header>
        <S.Heading>
          {title} — {count}
        </S.Heading>
      </S.Header>
      {renderContent()}
    </S.Container>
  );
};

export default Follower;
