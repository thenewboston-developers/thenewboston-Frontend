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
import {getDateStr, getTimeStr} from 'utils/dates';
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
    emptyText: 'Not following anyone yet.',
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
          return getFollowerCard(index, item.id, item.self_following, user, item.created_date);
        })}
      </InfiniteScroll>
    );
  };

  const updateUserStats = async () => {
    if (self.id) await dispatch(getUserStats(self.id));
  };

  const handleFollowerFollowBtnClick = async (userID: number) => {
    await dispatch(createFollower({following: userID}));
    await updateUserStats();
  };

  const handleFollowerUnFollowBtnClick = async (followingUserID: number) => {
    await dispatch(deleteFollower(followingUserID));
    await updateUserStats();
  };

  const handleFollowingUnFollowBtnClick = async (followerId: number, followingUserID: number) => {
    await dispatch(deleteFollowing(followerId, followingUserID));
    await updateUserStats();
  };

  const renderFollowButton = (followerId: number, user: UserReadSerializer, selfFollowing: boolean) => {
    if (self.id !== userId) return null;

    return type === FollowerType.FOLLOWERS ? (
      <S.BtnContainer>
        {selfFollowing ? (
          <S.UnFollowButton onClick={() => handleFollowerUnFollowBtnClick(user.id)}>
            <Icon path={mdiAccountMinusOutline} size="18px" />
            <S.BtnText>Unfollow</S.BtnText>
          </S.UnFollowButton>
        ) : (
          <S.FollowButton onClick={() => handleFollowerFollowBtnClick(user.id)}>
            <Icon path={mdiAccountPlusOutline} size="18px" />
            <S.BtnText>Follow</S.BtnText>
          </S.FollowButton>
        )}
      </S.BtnContainer>
    ) : (
      <S.BtnContainer>
        <S.UnFollowButton onClick={() => handleFollowingUnFollowBtnClick(followerId, user.id)}>
          <Icon path={mdiAccountMinusOutline} size="18px" />
          <S.BtnText>Unfollow</S.BtnText>
        </S.UnFollowButton>
      </S.BtnContainer>
    );
  };

  const getFollowerCard = (
    index: number,
    followerId: number,
    selfFollowing: boolean,
    user: UserReadSerializer,
    createdDate: Date,
  ) => {
    const createdAt = new Date(createdDate);
    return (
      <S.FollowerContainer key={index}>
        <S.Grid>
          <S.Counter>{index + 1}</S.Counter>
          <S.AvatarLink to={`/profile/${user.id}`}>
            <Avatar src={user.avatar} />
          </S.AvatarLink>
          <S.UserInfo>
            <S.UsernameLink to={`/profile/${user.id}`}>
              <S.Username>{user.username}</S.Username>
            </S.UsernameLink>
            <S.DateContainer>
              <div>{getDateStr(createdAt)}</div>
              <S.TextMuted>{getTimeStr(createdAt, true)}</S.TextMuted>
            </S.DateContainer>
          </S.UserInfo>
          {renderFollowButton(followerId, user, selfFollowing)}
        </S.Grid>
      </S.FollowerContainer>
    );
  };

  return (
    <S.Container className={className}>
      <S.Header>
        <S.Heading>
          {title} — <span>{count}</span>
        </S.Heading>
      </S.Header>
      {renderContent()}
    </S.Container>
  );
};

export default Follower;
