import {useEffect, useMemo} from 'react';
import InfiniteScrollComponent from 'react-infinite-scroll-component';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {mdiAccountMinusOutline, mdiAccountPlusOutline} from '@mdi/js';

import EmptyText from 'components/EmptyText';
import Loader from 'components/Loader';
import OutlineButton from 'components/OutlineButton';
import UserLabel from 'components/UserLabel';
import {createFollower, deleteFollower, getFollowers, resetFollowers} from 'dispatchers/followers';
import {deleteFollowing, getFollowings, resetFollowings} from 'dispatchers/followings';
import {getUserStats} from 'dispatchers/userStats';
import {FollowerType} from 'enums';
import {getFollowers as getFollowersState, getFollowings as getFollowingsState, getSelf} from 'selectors/state';
import {AppDispatch, SFC, UserReadSerializer} from 'types';
import {shortDate} from 'utils/dates';
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
  const {id} = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const self = useSelector(getSelf);
  const userId = id ? parseInt(id, 10) : undefined;

  const {emptyText, extractObject, get, getParams, getState, reset, title} = followerTypeConfig[type as FollowerType];
  const {count, hasMore, isLoading, items} = useSelector(getState);

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

  const getFollowerCard = (
    index: number,
    followerId: number,
    selfFollowing: boolean,
    user: UserReadSerializer,
    createdDate: Date,
  ) => {
    return (
      <S.FollowerContainer key={index}>
        <S.Grid>
          <S.Counter>{index + 1}</S.Counter>
          <UserLabel
            avatar={user.avatar}
            description={shortDate(createdDate, true)}
            id={user.id}
            username={user.username}
          />
          {renderFollowButton(followerId, user, selfFollowing)}
        </S.Grid>
      </S.FollowerContainer>
    );
  };

  const handleFollowerFollowButtonClick = async (userID: number) => {
    await dispatch(createFollower({following: userID}));
    await updateUserStats();
  };

  const handleFollowerUnfollowButtonClick = async (followingUserID: number) => {
    await dispatch(deleteFollower(followingUserID));
    await updateUserStats();
  };

  const handleFollowingUnfollowButtonClick = async (followerId: number, followingUserID: number) => {
    await dispatch(deleteFollowing(followerId, followingUserID));
    await updateUserStats();
  };

  const renderContent = () => {
    if (isLoading && !followerList.length) {
      return (
        <S.LoaderContainer>
          <Loader size={24} />
        </S.LoaderContainer>
      );
    }

    if (!followerList.length) {
      return <EmptyText>{emptyText}</EmptyText>;
    }

    return renderFollowerCards();
  };

  const renderFollowerCards = () => {
    return (
      <InfiniteScrollComponent
        dataLength={followerList.length}
        endMessage={null}
        hasMore={hasMore}
        loader={
          <S.LoaderWrapper>
            <Loader size={24} />
          </S.LoaderWrapper>
        }
        next={fetchMoreFollowers}
        scrollThreshold={0.9}
        scrollableTarget="main-scrollable-area"
      >
        {followerList.map((item, index) => {
          const user = extractObject(item);
          return getFollowerCard(index, item.id, item.self_following, user, item.created_date);
        })}
      </InfiniteScrollComponent>
    );
  };

  const renderFollowButton = (followerId: number, user: UserReadSerializer, selfFollowing: boolean) => {
    if (self.id !== userId) return null;

    return type === FollowerType.FOLLOWERS ? (
      <S.ButtonContainer>
        {selfFollowing ? (
          <OutlineButton
            iconLeft={mdiAccountMinusOutline}
            onClick={() => handleFollowerUnfollowButtonClick(user.id)}
            text="Unfollow"
          />
        ) : (
          <OutlineButton
            iconLeft={mdiAccountPlusOutline}
            onClick={() => handleFollowerFollowButtonClick(user.id)}
            text="Follow"
          />
        )}
      </S.ButtonContainer>
    ) : (
      <S.ButtonContainer>
        <OutlineButton
          iconLeft={mdiAccountMinusOutline}
          onClick={() => handleFollowingUnfollowButtonClick(followerId, user.id)}
          text="Unfollow"
        />
      </S.ButtonContainer>
    );
  };

  const updateUserStats = async () => {
    if (self.id) await dispatch(getUserStats(self.id));
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
