import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {Route, Routes, useParams} from 'react-router-dom';

import {getInvitationLimit} from 'dispatchers/invitationLimits';
import {getInvitations} from 'dispatchers/invitations';
import {getPosts} from 'dispatchers/posts';
import {getUser} from 'dispatchers/users';
import {AppDispatch, SFC} from 'types';
import {displayErrorToast} from 'utils/toast';
import Artworks from './Artworks';
import Invitations from './Invitations';
import Layout from './Layout';
import Posts from './Posts';
import * as S from './Styles';

const Profile: SFC = ({className}) => {
  const {id} = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const userId = id ? parseInt(id, 10) : null;

  useEffect(() => {
    (async () => {
      if (!userId) return;

      try {
        await Promise.all([
          dispatch(getInvitationLimit(userId)),
          dispatch(getInvitations()),
          dispatch(getPosts()),
          dispatch(getUser(userId)),
        ]);
      } catch (error) {
        console.error(error);
        displayErrorToast('Error fetching profile data');
      }
    })();
  }, [dispatch, userId]);

  return (
    <S.Container className={className}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/artworks" element={<Artworks />} />
          <Route path="/invitations" element={<Invitations />} />
          <Route path="/posts" element={<Posts />} />
        </Route>
      </Routes>
    </S.Container>
  );
};

export default Profile;
