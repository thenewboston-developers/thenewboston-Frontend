import {useEffect, useMemo, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useParams} from 'react-router-dom';
import orderBy from 'lodash/orderBy';

import {getFollowers} from 'api/followers';
import EmptyText from 'components/EmptyText';
import {AppDispatch, FollowerReadSerializer, SFC} from 'types';
import {displayErrorToast} from 'utils/toast';
import * as S from './Styles';

const Followers: SFC = ({className}) => {
  const [followers, setFollowers] = useState<FollowerReadSerializer[]>([]);
  const {id} = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const userId = id ? parseInt(id, 10) : null;

  useEffect(() => {
    setFollowers([]);

    if (!userId) return;

    (async () => {
      try {
        const response = await getFollowers({following: userId});
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
    if (!!followers.length) return renderFollowerCards();
    return <EmptyText>No followers to display.</EmptyText>;
  };

  const renderFollowerCards = () => {
    const _followers = followerList.map((follower) => <div>{follower.follower.username}</div>);
    return <S.FollowerCards>{_followers}</S.FollowerCards>;
  };

  return <S.Container className={className}>{renderContent()}</S.Container>;
};

export default Followers;
