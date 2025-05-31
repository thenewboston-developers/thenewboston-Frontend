import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Route, Routes, useParams} from 'react-router-dom';

import {getInvitationLimit} from 'dispatchers/invitationLimits';
import {getInvitations} from 'dispatchers/invitations';
import {getUser} from 'dispatchers/users';
import {getUserStats} from 'dispatchers/userStats';
import {FollowerType} from 'enums';
import {getSelf} from 'selectors/state';
import {AppDispatch, SFC} from 'types';
import {displayErrorToast} from 'utils/toasts';

import Follower from './Follower';
import Invitations from './Invitations';
import Layout from './Layout';
import Posts from './Posts';
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

      if (userId === self.id) {
        promises.push(getInvitationLimit(userId));
        promises.push(getInvitations());
      }

      try {
        await Promise.all(promises.map(dispatch));
      } catch (error) {
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
          <Route path="/following" element={<Follower type={FollowerType.FOLLOWING} />} />
          <Route path="/followers" element={<Follower type={FollowerType.FOLLOWERS} />} />
          <Route path="/invitations" element={<Invitations />} />
        </Route>
      </Routes>
    </S.Container>
  );
};

export default Profile;
