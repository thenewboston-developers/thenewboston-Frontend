import {useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {
  mdiAccount,
  mdiBell,
  mdiBrush,
  mdiCircleMultipleOutline,
  mdiExitToApp,
  mdiFaceWoman,
  mdiHammerWrench,
  mdiHome,
  mdiSchool,
  mdiShopping,
  mdiSwapHorizontalCircleOutline,
  mdiWalletBifoldOutline,
} from '@mdi/js';

import BadgeCount from 'components/BadgeCount';
import {PATH_COURSES} from 'constants/paths';
import {logout} from 'dispatchers/authentication';
import {getSelf, getNotifications} from 'selectors/state';
import {AppDispatch, SFC} from 'types';
import {getUnreadNotificationsCount} from 'utils/notifications';
import CreatePostButton from './CreatePostButton';
import MenuButton from './MenuItem/MenuButton';
import MenuLink from './MenuItem/MenuLink';
import * as S from './Styles';

const LeftNav: SFC = ({className}) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const notifications = useSelector(getNotifications);
  const self = useSelector(getSelf);

  const notificationsList = useMemo(() => {
    return Object.values(notifications);
  }, [notifications]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/signIn');
  };

  return (
    <S.Container className={className}>
      <S.Top>
        <MenuLink icon={mdiBrush} rootPath="/art" text="Art" to="/art/marketplace" />
        <MenuLink icon={mdiHammerWrench} rootPath="/contributions" text="Contributions" to="/contributions" />
        <MenuLink icon={mdiCircleMultipleOutline} rootPath="/currencies" text="Currencies" to="/currencies" />
        <MenuLink icon={mdiSwapHorizontalCircleOutline} rootPath="/exchange" text="Exchange" to="/exchange/trade" />
        <MenuLink icon={mdiHome} rootPath="/feed" text="Home" to="/feed" />
        <MenuLink icon={mdiFaceWoman} rootPath="/ia" text="Ia" to="/ia" />
        <MenuLink icon={mdiBell} rootPath="/notifications" text="Notifications" to="/notifications">
          <BadgeCount items={notificationsList} countFunction={getUnreadNotificationsCount} />
        </MenuLink>
        <MenuLink icon={mdiAccount} rootPath={`/profile/${self.id}`} text="Profile" to={`/profile/${self.id}`} />
        <MenuLink icon={mdiShopping} rootPath="/shop" text="Shop" to="/shop/buy/catalog" />
        <MenuLink icon={mdiSchool} rootPath={`${PATH_COURSES}`} text="University" to={`${PATH_COURSES}`} />
        <MenuLink icon={mdiWalletBifoldOutline} rootPath="/wallets" text="Wallets" to="/wallets" />
        <CreatePostButton />
      </S.Top>
      <S.Bottom>
        <MenuButton icon={mdiExitToApp} onClick={handleLogout} text="Log out" />
      </S.Bottom>
    </S.Container>
  );
};

export default LeftNav;
