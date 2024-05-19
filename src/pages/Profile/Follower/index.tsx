import {useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import orderBy from 'lodash/orderBy';
import {mdiAccountPlusOutline, mdiMagnify} from '@mdi/js';

import Avatar from 'components/Avatar';
import EmptyText from 'components/EmptyText';
import Icon from '@mdi/react';
import {AppDispatch, SFC} from 'types';
import {FollowerType} from 'enums';
import {colors} from 'styles';
import {displayErrorToast} from 'utils/toasts';
import {getFollowers as getFollowersState, getFollowings as getFollowingsState} from 'selectors/state';
import {getFollowers, resetFollowers} from 'dispatchers/followers';
import {getFollowings, resetFollowings} from 'dispatchers/followings';

import * as S from './Styles';

export interface FollowerProps {
  type?: string;
}

const followerTypeConfig = {
  [FollowerType.FOLLOWERS]: {
    emptyText: 'No followers to display.',
    extractObject: (item: any) => item.following,
    get: getFollowers,
    getState: getFollowersState,
    reset: resetFollowers,
    title: 'Followers',
  },
  [FollowerType.FOLLOWING]: {
    emptyText: 'No followings to display.',
    extractObject: (item: any) => item.follower,
    get: getFollowings,
    getState: getFollowingsState,
    reset: resetFollowings,
    title: 'Following',
  },
};

const Follower: SFC<FollowerProps> = ({className, type = FollowerType.FOLLOWERS}) => {
  const dispatch = useDispatch<AppDispatch>();
  const {id} = useParams();
  const userId = id ? parseInt(id, 10) : undefined;

  const {emptyText, extractObject, get, getState, reset, title} = followerTypeConfig[type as FollowerType];
  const {items, hasMore, isLoading} = useSelector(getState);

  const followerList = useMemo(() => {
    return orderBy(items, ['created_date'], ['desc']);
  }, [items]);

  useEffect(() => {
    (async () => {
      try {
        dispatch(reset());
        await dispatch(get(userId));
      } catch (error) {
        console.error(error);
        displayErrorToast(`Error fetching ${type.toLowerCase()}`);
      }
    })();
  }, [dispatch, userId, type, reset, get]);

  const fetchMoreFollowers = async () => {
    if (!isLoading && hasMore) {
      await dispatch(get(userId));
    }
  };

  const renderContent = () => {
    if (followerList.length) return renderFollowerCards();
    return <EmptyText>{emptyText}</EmptyText>;
  };

  const renderFollowerCards = () => {
    const _followers = followerList.map((item, index) => {
      const user = extractObject(item);
      return (
        <S.ContributorContainer key={index}>
          <S.TableGrid>
            <S.Rank>{index + 1}</S.Rank>
            <S.UserLabelContainer>
              <S.FollowerCards>
                <S.FollowerUser>
                  <Avatar src={user.avatar} />
                  <S.UserName>{user.username}</S.UserName>
                </S.FollowerUser>
              </S.FollowerCards>
            </S.UserLabelContainer>
            <S.RewardAmountContainer>
              <S.Status>
                <Icon path={mdiAccountPlusOutline} size={1} color={`${colors.palette.blue['500']}`} />
                <S.StatusFollow>Follow</S.StatusFollow>
              </S.Status>
            </S.RewardAmountContainer>
          </S.TableGrid>
        </S.ContributorContainer>
      );
    });
    return <S.FollowerCards>{_followers}</S.FollowerCards>;
  };

  return (
    <S.Container className={className}>
      <S.Header>
        <S.Heading>
          {title} — {followerList.length}
        </S.Heading>
        <S.Search>
          <Icon path={mdiMagnify} />
          <input type="text" placeholder="Search" />
        </S.Search>
      </S.Header>
      {renderContent()}
    </S.Container>
  );
};

export default Follower;
