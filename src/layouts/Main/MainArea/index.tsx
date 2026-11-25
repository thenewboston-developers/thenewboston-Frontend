import {Navigate, Route} from 'react-router-dom';

import Logout from 'components/Logout';
import RequireAuthentication from 'components/RequireAuthentication';
import SentryRoutes from 'components/SentryRoutes';
import {
  PATH_AUTHENTICATION,
  PATH_BACKGAMMON,
  PATH_BATTLESHIP,
  PATH_BLACKJACK,
  PATH_CASINO,
  PATH_CHECKERS,
  PATH_CONNECT_FIVE,
  PATH_CURRENCIES,
  PATH_DEFAULT,
  PATH_DOTS_AND_BOXES,
  PATH_EXCHANGE,
  PATH_GAMES,
  PATH_HEX,
  PATH_HOME,
  PATH_LEGACY_FEED,
  PATH_MANCALA,
  PATH_NOTIFICATIONS,
  PATH_PLINKO,
  PATH_POST_DETAIL,
  PATH_PROFILE,
  PATH_REVERSI,
  PATH_ROULETTE,
  PATH_SLOTS,
  PATH_WALLETS,
} from 'constants/paths';
import Backgammon from 'pages/Backgammon';
import Battleship from 'pages/Battleship';
import Blackjack from 'pages/Blackjack';
import Casino from 'pages/Casino';
import Checkers from 'pages/Checkers';
import ConnectFive from 'pages/ConnectFive';
import Currencies from 'pages/Currencies';
import DotsAndBoxes from 'pages/DotsAndBoxes';
import Exchange from 'pages/Exchange';
import Feed from 'pages/Feed';
import Games from 'pages/Games';
import Hex from 'pages/Hex';
import Mancala from 'pages/Mancala';
import Notifications from 'pages/Notifications';
import Plinko from 'pages/Plinko';
import PostDetail from 'pages/PostDetail';
import Profile from 'pages/Profile';
import Reversi from 'pages/Reversi';
import Roulette from 'pages/Roulette';
import Slots from 'pages/Slots';
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
        <Route element={<Blackjack />} path={PATH_BLACKJACK} />
        <Route element={<Casino />} path={PATH_CASINO} />
        <Route element={<Checkers />} path={PATH_CHECKERS} />
        <Route path={PATH_CONNECT_FIVE} element={<ConnectFive />} />
        <Route path={PATH_CURRENCIES} element={<Currencies />} />
        <Route element={<DotsAndBoxes />} path={PATH_DOTS_AND_BOXES} />
        <Route path={PATH_EXCHANGE} element={<Exchange />} />
        <Route element={<Games />} path={PATH_GAMES} />
        <Route element={<Hex />} path={PATH_HEX} />
        <Route path={PATH_HOME} element={<Feed />} />
        <Route path={PATH_LEGACY_FEED} element={<Navigate to={PATH_HOME} replace />} />
        <Route element={<Mancala />} path={PATH_MANCALA} />
        <Route
          path={PATH_NOTIFICATIONS}
          element={
            <RequireAuthentication>
              <Notifications />
            </RequireAuthentication>
          }
        />
        <Route element={<Plinko />} path={PATH_PLINKO} />
        <Route path={PATH_POST_DETAIL} element={<PostDetail />} />
        <Route path={PATH_PROFILE} element={<Profile />} />
        <Route element={<Reversi />} path={PATH_REVERSI} />
        <Route element={<Roulette />} path={PATH_ROULETTE} />
        <Route element={<Slots />} path={PATH_SLOTS} />
        <Route path={PATH_AUTHENTICATION.LOGOUT} element={<Logout />} />
        <Route path={PATH_WALLETS} element={<Wallets />} />
      </SentryRoutes>
    </S.Container>
  );
};

export default MainArea;
