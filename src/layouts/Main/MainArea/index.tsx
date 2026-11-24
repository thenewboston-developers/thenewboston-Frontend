import {Navigate, Route} from 'react-router-dom';

import Logout from 'components/Logout';
import RequireAuthentication from 'components/RequireAuthentication';
import SentryRoutes from 'components/SentryRoutes';
import {
  PATH_AUTHENTICATION,
  PATH_BACKGAMMON,
  PATH_BATTLESHIP,
  PATH_CHECKERS,
  PATH_CONNECT_FIVE,
  PATH_CURRENCIES,
  PATH_DEFAULT,
  PATH_EXCHANGE,
  PATH_GAMES,
  PATH_HOME,
  PATH_LEGACY_FEED,
  PATH_NOTIFICATIONS,
  PATH_POST_DETAIL,
  PATH_PROFILE,
  PATH_WALLETS,
} from 'constants/paths';
import Backgammon from 'pages/Backgammon';
import Battleship from 'pages/Battleship';
import Checkers from 'pages/Checkers';
import ConnectFive from 'pages/ConnectFive';
import Currencies from 'pages/Currencies';
import Exchange from 'pages/Exchange';
import Feed from 'pages/Feed';
import Games from 'pages/Games';
import Notifications from 'pages/Notifications';
import PostDetail from 'pages/PostDetail';
import Profile from 'pages/Profile';
import Wallets from 'pages/Wallets';
import {SFC} from 'types';

import * as S from './Styles';

const MainArea: SFC = ({className}) => {
  return (
    <S.Container className={className} id="main-scrollable-area">
      <SentryRoutes>
        <Route path="*" element={<Navigate to={PATH_DEFAULT} replace />} />
        <Route element={<Backgammon />} path={PATH_BACKGAMMON} />
        <Route element={<Battleship />} path={PATH_BATTLESHIP} />
        <Route element={<Checkers />} path={PATH_CHECKERS} />
        <Route path={PATH_CONNECT_FIVE} element={<ConnectFive />} />
        <Route path={PATH_CURRENCIES} element={<Currencies />} />
        <Route path={PATH_EXCHANGE} element={<Exchange />} />
        <Route element={<Games />} path={PATH_GAMES} />
        <Route path={PATH_HOME} element={<Feed />} />
        <Route path={PATH_LEGACY_FEED} element={<Navigate to={PATH_HOME} replace />} />
        <Route
          path={PATH_NOTIFICATIONS}
          element={
            <RequireAuthentication>
              <Notifications />
            </RequireAuthentication>
          }
        />
        <Route path={PATH_POST_DETAIL} element={<PostDetail />} />
        <Route path={PATH_PROFILE} element={<Profile />} />
        <Route path={PATH_AUTHENTICATION.LOGOUT} element={<Logout />} />
        <Route path={PATH_WALLETS} element={<Wallets />} />
      </SentryRoutes>
    </S.Container>
  );
};

export default MainArea;
