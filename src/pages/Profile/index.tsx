import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Route, Routes, useParams} from 'react-router-dom';

import Artworks from './Artworks';
import Follower from './Follower';
import Layout from './Layout';
import Posts from './Posts';
import {AppDispatch, SFC} from 'types';
import {FollowerType} from 'enums';
import {displayErrorToast} from 'utils/toasts';
import {getSelf} from 'selectors/state';
import {getUserStats} from 'dispatchers/userStats';
import {getUser} from 'dispatchers/users';
import * as S from './Styles';

const Profile: SFC = ({className}) => {
  const {id} = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const self = useSelector(getSelf);

  const userId = id ? parseInt(id, 10) : null;

  useEffect(() => {
    (async () => {
      if (!userId) return;

      const promises = [getUser(userId), getUserStats(userId)];

      try {
        await Promise.all(promises.map(dispatch));
      } catch (error) {
        console.error(error);
        displayErrorToast('Error fetching profile data');
      }
    })();
  }, [dispatch, self.id, userId]);

  return (
    <S.Container className={className}>
      <Routes>
        <Route element={<Layout />}>
          {/* TODO: replace hardcoded paths with constants */}
          <Route index element={<Posts />} />
          <Route path="/artworks" element={<Artworks />} />
          <Route path="/following" element={<Follower type={FollowerType.FOLLOWING} />} />
          <Route path="/followers" element={<Follower type={FollowerType.FOLLOWERS} />} />
        </Route>
      </Routes>
    </S.Container>
  );
};

export default Profile;
