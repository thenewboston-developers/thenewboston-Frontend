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
  mdiSwapHorizontalCircle,
  mdiSwapHorizontalCircleOutline,
  mdiWalletBifold,
  mdiWalletBifoldOutline,
} from '@mdi/js';

import {PATH_AUTHENTICATION} from 'constants/paths';
import {isPathActive} from 'layouts/Authenticated/utils';
import {getSelf} from 'selectors/state';
import {SFC} from 'types';

import BadgeCount from './BadgeCount';
import MenuItem from './MenuItem';
import PopupMenu, {PopupMenuOption} from './PopupMenu';
import * as S from './Styles';

const BottomNav: SFC = ({className}) => {
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

  return (
    <S.Container aria-label="Main" className={className}>
      <MenuItem activeIcon={mdiHome} icon={mdiHomeOutline} rootPath="/feed" text="Home" to="/feed" />
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
