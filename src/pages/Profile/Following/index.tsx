import {useEffect, useMemo, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useParams} from 'react-router-dom';
import orderBy from 'lodash/orderBy';

import {getFollowers} from 'api/followers';
import EmptyText from 'components/EmptyText';
import {AppDispatch, FollowerReadSerializer, SFC} from 'types';
import {displayErrorToast} from 'utils/toasts';
import * as S from './Styles';
import Avatar from 'components/Avatar';
import DefaultAvatar from 'assets/default-avatar.png';
import {mdiAccountPlusOutline, mdiCheckCircleOutline, mdiMagnify} from '@mdi/js';
import Icon from '@mdi/react';
import {colors} from 'styles';

const mockFollowers = [
  {
    follower: {
      avatar: DefaultAvatar,
      id: 1,
      status: 'true',
      username: 'ABC2',
    },
  },
  {
    follower: {
      avatar: DefaultAvatar,
      id: 2,
      status: 'false',
      username: 'ABC',
    },
  },
];

const Following: SFC = ({className}) => {
  const [followers, setFollowers] = useState<FollowerReadSerializer[]>([]);
  const {id} = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const userId = id ? parseInt(id, 10) : null;

  useEffect(() => {
    setFollowers([]);

    if (!userId) return;

    (async () => {
      try {
        const response = await getFollowers({follower: userId});
        setFollowers(response);
      } catch (error) {
        console.error(error);
        displayErrorToast('Error fetching followers');
      }
    })();
  }, [dispatch, userId]);

  const followerList = useMemo(() => {
    return orderBy(followers, ['created_date'], ['desc']);
  }, [followers]);

  const renderContent = () => {
    if (!!mockFollowers.length) return renderFollowerCards();
    return <EmptyText>No followers to display.</EmptyText>;
  };

  const renderFollowerCards = () => {
    const _followers = mockFollowers.map(({follower}) => (
      <S.ContributorContainer key={follower.id}>
        <S.TableGrid>
          <S.Rank>{follower.id}</S.Rank>
          <S.UserLabelContainer>
            <S.FollowerCards>
              <S.FollowerUser>
                <Avatar src={follower.avatar} />
                <S.UserName>{follower.username}</S.UserName>
              </S.FollowerUser>
            </S.FollowerCards>
          </S.UserLabelContainer>
          <S.RewardAmountContainer>
            {follower.status === 'true' ? (
              <S.Status>
                <Icon path={mdiAccountPlusOutline} size={1} color={`${colors.palette.blue['500']}`} />
                <S.StatusFollow>Follow</S.StatusFollow>
              </S.Status>
            ) : (
              <S.Status>
                <Icon path={mdiCheckCircleOutline} size={1} color={`${colors.palette.red['500']}`} />
                <S.StatusFollowing>Following</S.StatusFollowing>
              </S.Status>
            )}
          </S.RewardAmountContainer>
        </S.TableGrid>
      </S.ContributorContainer>
    ));
    return <S.FollowerCards>{_followers}</S.FollowerCards>;
  };

  return (
    <S.Container className={className}>
      <S.Wrapper>
        <S.Title>
          Following — <span>10</span>
        </S.Title>
        <S.Search>
          <Icon path={mdiMagnify} />
          <input type="text" placeholder="Search" />
        </S.Search>
      </S.Wrapper>
      {renderContent()}
    </S.Container>
  );
};

export default Following;
