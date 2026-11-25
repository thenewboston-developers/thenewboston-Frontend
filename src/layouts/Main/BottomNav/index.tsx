import {useSelector} from 'react-redux';
import {useLocation, useNavigate} from 'react-router-dom';
import {Bell, ChartCandlestick, Ellipsis, Gamepad2, House, LogIn, LogOut, UserRound, Wallet} from 'lucide-react';

import {PATH_AUTHENTICATION, PATH_GAMES, PATH_HOME} from 'constants/paths';
import {useIsAuthenticated} from 'hooks';
import {Coins} from 'layouts/Main/icons';
import {BOTTOM_NAV_ICON_SIZE} from 'layouts/Main/mixins';
import {isPathActive} from 'layouts/Main/utils';
import {getSelf} from 'selectors/state';
import {SFC} from 'types';
import {analyticsArea} from 'utils/analyticsAttributes';
import {getAuthenticationPath, getLocationPath} from 'utils/authentication';

import BadgeCount from './BadgeCount';
import MenuItem from './MenuItem';
import PopupMenu, {PopupMenuOption} from './PopupMenu';
import * as S from './Styles';

const BottomNav: SFC = ({className}) => {
  const isAuthenticated = useIsAuthenticated();
  const location = useLocation();
  const navigate = useNavigate();
  const self = useSelector(getSelf);

  const popupOptions: PopupMenuOption[] = [
    {
      icon: Coins,
      isActive: isPathActive(location.pathname, '/currencies'),
      label: 'Currencies',
      onClick: () => navigate('/currencies'),
    },
    {
      icon: Gamepad2,
      isActive: isPathActive(location.pathname, PATH_GAMES),
      label: 'Games',
      onClick: () => navigate(PATH_GAMES),
    },
    {
      icon: Wallet,
      isActive: isPathActive(location.pathname, '/wallets'),
      label: 'Wallets',
      onClick: () => navigate('/wallets'),
    },
    {
      icon: LogOut,
      label: 'Log out',
      onClick: () => navigate(PATH_AUTHENTICATION.LOGOUT),
    },
  ];

  const isMoreActive = popupOptions.some(({isActive}) => isActive);

  // Signed-out visitors get every public section plus a way to sign in, the rest belongs to a member
  if (!isAuthenticated) {
    return (
      <S.Container {...analyticsArea('navigation')} aria-label="Main" className={className}>
        <MenuItem icon={House} rootPath={PATH_HOME} text="Home" to={PATH_HOME} />
        <MenuItem icon={ChartCandlestick} rootPath="/exchange" text="Exchange" to="/exchange" />
        <MenuItem icon={Coins} rootPath="/currencies" text="Currencies" to="/currencies" />
        <MenuItem icon={Gamepad2} rootPath={PATH_GAMES} text="Games" to={PATH_GAMES} />
        <MenuItem
          icon={LogIn}
          rootPath={PATH_AUTHENTICATION.SIGN_IN}
          text="Sign in"
          to={getAuthenticationPath(PATH_AUTHENTICATION.SIGN_IN, getLocationPath(location))}
        />
      </S.Container>
    );
  }

  return (
    <S.Container {...analyticsArea('navigation')} aria-label="Main" className={className}>
      <MenuItem icon={House} rootPath={PATH_HOME} text="Home" to={PATH_HOME} />
      <MenuItem icon={ChartCandlestick} rootPath="/exchange" text="Exchange" to="/exchange" />
      <MenuItem icon={Bell} rootPath="/notifications" text="Notifications" to="/notifications">
        <BadgeCount />
      </MenuItem>
      <MenuItem icon={UserRound} rootPath={`/profile/${self.id}`} text="Profile" to={`/profile/${self.id}`} />
      <PopupMenu isActive={isMoreActive} options={popupOptions}>
        <S.IconWrapper $isActive={isMoreActive}>
          <Ellipsis aria-hidden size={BOTTOM_NAV_ICON_SIZE} strokeWidth={isMoreActive ? 2 : 1.75} />
        </S.IconWrapper>
        <S.Text>More</S.Text>
      </PopupMenu>
    </S.Container>
  );
};

export default BottomNav;
