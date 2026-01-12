import {Navigate, Route, Routes} from 'react-router-dom';

import Logout from 'components/Logout';
import {
  PATH_AUTHENTICATION,
  PATH_BONSAI,
  PATH_CONNECT_FIVE,
  PATH_CURRENCIES,
  PATH_DEFAULT,
  PATH_EXCHANGE,
  PATH_FEED,
  PATH_NOTIFICATIONS,
  PATH_POST_DETAIL,
  PATH_PROFILE,
  PATH_WALLETS,
} from 'constants/paths';
import Bonsai from 'pages/Bonsai';
import ConnectFive from 'pages/ConnectFive';
import Currencies from 'pages/Currencies';
import Exchange from 'pages/Exchange';
import Feed from 'pages/Feed';
import Notifications from 'pages/Notifications';
import PostDetail from 'pages/PostDetail';
import Profile from 'pages/Profile';
import Wallets from 'pages/Wallets';
import {SFC} from 'types';

import * as S from './Styles';

const MainArea: SFC = ({className}) => {
  return (
    <S.Container className={className} id="main-scrollable-area">
      <Routes>
        <Route path="*" element={<Navigate to={PATH_DEFAULT} replace />} />
        <Route path={PATH_BONSAI} element={<Bonsai />} />
        <Route path={PATH_CONNECT_FIVE} element={<ConnectFive />} />
        <Route path={PATH_CURRENCIES} element={<Currencies />} />
        <Route path={PATH_EXCHANGE} element={<Exchange />} />
        <Route path={PATH_FEED} element={<Feed />} />
        <Route path={PATH_NOTIFICATIONS} element={<Notifications />} />
        <Route path={PATH_POST_DETAIL} element={<PostDetail />} />
        <Route path={PATH_PROFILE} element={<Profile />} />
        <Route path={PATH_AUTHENTICATION.LOGOUT} element={<Logout />} />
        <Route path={PATH_WALLETS} element={<Wallets />} />
      </Routes>
    </S.Container>
  );
};

export default MainArea;
