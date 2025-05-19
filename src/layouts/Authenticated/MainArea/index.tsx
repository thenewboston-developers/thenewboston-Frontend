import {Navigate, Route, Routes} from 'react-router-dom';

import {
  PATH_AUTHENTICATION,
  PATH_CURRENCIES,
  PATH_DEFAULT,
  PATH_EXCHANGE,
  PATH_FEED,
  PATH_NOTIFICATIONS,
  PATH_PROFILE,
  PATH_WALLETS,
} from 'constants/paths';
import Cores from 'pages/Cores';
import Exchange from 'pages/Exchange';
import Feed from 'pages/Feed';
import Logout from 'components/Logout';
import Notifications from 'pages/Notifications';
import Profile from 'pages/Profile';
import Wallets from 'pages/Wallets';
import {SFC} from 'types';

import * as S from './Styles';

const MainArea: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <Routes>
        <Route path="*" element={<Navigate to={PATH_DEFAULT} replace />} />
        <Route path={PATH_CURRENCIES} element={<Cores />} />
        <Route path={PATH_EXCHANGE} element={<Exchange />} />
        <Route path={PATH_FEED} element={<Feed />} />
        <Route path={PATH_NOTIFICATIONS} element={<Notifications />} />
        <Route path={PATH_PROFILE} element={<Profile />} />
        <Route path={PATH_AUTHENTICATION.LOGOUT} element={<Logout />} />
        <Route path={PATH_WALLETS} element={<Wallets />} />
      </Routes>
    </S.Container>
  );
};

export default MainArea;
