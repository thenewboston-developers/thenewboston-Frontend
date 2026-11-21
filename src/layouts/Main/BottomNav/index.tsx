import {useSelector} from 'react-redux';
import {useLocation, useNavigate} from 'react-router-dom';
import {
  mdiAccount,
  mdiAccountOutline,
  mdiBell,
  mdiBellOutline,
  mdiCircleMultiple,
  mdiCircleMultipleOutline,
  mdiDotsHorizontal,
  mdiExitToApp,
  mdiGamepadVariant,
  mdiGamepadVariantOutline,
  mdiHome,
  mdiHomeOutline,
  mdiLogin,
  mdiSwapHorizontalCircle,
  mdiSwapHorizontalCircleOutline,
  mdiWalletBifold,
  mdiWalletBifoldOutline,
} from '@mdi/js';

import {PATH_AUTHENTICATION, PATH_HOME} from 'constants/paths';
import {useIsAuthenticated} from 'hooks';
import {isPathActive} from 'layouts/Main/utils';
import {getSelf} from 'selectors/state';
import {SFC} from 'types';
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
      activeIcon: mdiCircleMultiple,
      icon: mdiCircleMultipleOutline,
      isActive: isPathActive(location.pathname, '/currencies'),
      label: 'Currencies',
      onClick: () => navigate('/currencies'),
    },
    {
      activeIcon: mdiGamepadVariant,
      icon: mdiGamepadVariantOutline,
      isActive: isPathActive(location.pathname, '/connect-five'),
      label: 'Connect 5',
      onClick: () => navigate('/connect-five'),
    },
    {
      activeIcon: mdiWalletBifold,
      icon: mdiWalletBifoldOutline,
      isActive: isPathActive(location.pathname, '/wallets'),
      label: 'Wallets',
      onClick: () => navigate('/wallets'),
    },
    {
      icon: mdiExitToApp,
      label: 'Log out',
      onClick: () => navigate(PATH_AUTHENTICATION.LOGOUT),
    },
  ];

  const isMoreActive = popupOptions.some(({isActive}) => isActive);

  // Signed-out visitors get every public section plus a way to sign in, the rest belongs to a member
  if (!isAuthenticated) {
    return (
      <S.Container aria-label="Main" className={className}>
        <MenuItem activeIcon={mdiHome} icon={mdiHomeOutline} rootPath={PATH_HOME} text="Home" to={PATH_HOME} />
        <MenuItem
          activeIcon={mdiSwapHorizontalCircle}
          icon={mdiSwapHorizontalCircleOutline}
          rootPath="/exchange"
          text="Exchange"
          to="/exchange"
        />
        <MenuItem
          activeIcon={mdiCircleMultiple}
          icon={mdiCircleMultipleOutline}
          rootPath="/currencies"
          text="Currencies"
          to="/currencies"
        />
        <MenuItem
          activeIcon={mdiGamepadVariant}
          icon={mdiGamepadVariantOutline}
          rootPath="/connect-five"
          text="Connect 5"
          to="/connect-five"
        />
        <MenuItem
          icon={mdiLogin}
          rootPath={PATH_AUTHENTICATION.SIGN_IN}
          text="Sign in"
          to={getAuthenticationPath(PATH_AUTHENTICATION.SIGN_IN, getLocationPath(location))}
        />
      </S.Container>
    );
  }

  return (
    <S.Container aria-label="Main" className={className}>
      <MenuItem activeIcon={mdiHome} icon={mdiHomeOutline} rootPath={PATH_HOME} text="Home" to={PATH_HOME} />
      <MenuItem
        activeIcon={mdiSwapHorizontalCircle}
        icon={mdiSwapHorizontalCircleOutline}
        rootPath="/exchange"
        text="Exchange"
        to="/exchange"
      />
      <MenuItem
        activeIcon={mdiBell}
        icon={mdiBellOutline}
        rootPath="/notifications"
        text="Notifications"
        to="/notifications"
      >
        <BadgeCount />
      </MenuItem>
      <MenuItem
        activeIcon={mdiAccount}
        icon={mdiAccountOutline}
        rootPath={`/profile/${self.id}`}
        text="Profile"
        to={`/profile/${self.id}`}
      />
      <PopupMenu isActive={isMoreActive} options={popupOptions}>
        <S.IconWrapper>
          <S.Icon path={mdiDotsHorizontal} size="24px" />
        </S.IconWrapper>
        <S.Text>More</S.Text>
      </PopupMenu>
    </S.Container>
  );
};

export default BottomNav;
