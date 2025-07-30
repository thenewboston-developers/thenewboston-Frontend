import {useSelector} from 'react-redux';
import {
  mdiAccount,
  mdiBell,
  mdiCircleMultipleOutline,
  mdiExitToApp,
  mdiHome,
  mdiSwapHorizontalCircleOutline,
  mdiWalletBifoldOutline,
} from '@mdi/js';

import {PATH_AUTHENTICATION} from 'constants/paths';
import {getSelf, getTotalUnreadNotificationCount} from 'selectors/state';
import {SFC} from 'types';

import MenuLink from './MenuItem/MenuLink';
import BadgeCount from './BadgeCount';
import CreatePostButton from './CreatePostButton';
import * as S from './Styles';

const LeftNav: SFC = ({className}) => {
  const totalUnreadCount = useSelector(getTotalUnreadNotificationCount);
  const self = useSelector(getSelf);

  return (
    <S.Container className={className}>
      <S.Top>
        <MenuLink icon={mdiCircleMultipleOutline} rootPath="/currencies" text="Currencies" to="/currencies" />
        <MenuLink icon={mdiSwapHorizontalCircleOutline} rootPath="/exchange" text="Exchange" to="/exchange" />
        <MenuLink icon={mdiHome} rootPath="/feed" text="Home" to="/feed" />
        <MenuLink icon={mdiBell} rootPath="/notifications" text="Notifications" to="/notifications">
          <BadgeCount items={Array(totalUnreadCount).fill(null)} />
        </MenuLink>
        <MenuLink icon={mdiAccount} rootPath={`/profile/${self.id}`} text="Profile" to={`/profile/${self.id}`} />
        <MenuLink icon={mdiWalletBifoldOutline} rootPath="/wallets" text="Wallets" to="/wallets" />
        <CreatePostButton />
      </S.Top>
      <S.Bottom>
        <MenuLink
          icon={mdiExitToApp}
          rootPath={`${PATH_AUTHENTICATION.LOGOUT}`}
          text="Log out"
          to={`${PATH_AUTHENTICATION.LOGOUT}`}
        />
      </S.Bottom>
    </S.Container>
  );
};

export default LeftNav;
