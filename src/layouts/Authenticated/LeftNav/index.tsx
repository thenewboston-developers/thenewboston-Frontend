import {useSelector} from 'react-redux';
import {
  mdiAccount,
  mdiAccountOutline,
  mdiBell,
  mdiBellOutline,
  mdiCircleMultiple,
  mdiCircleMultipleOutline,
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

import logo from 'assets/logo192.png';
import {PATH_AUTHENTICATION, PATH_FEED} from 'constants/paths';
import {getSelf} from 'selectors/state';
import {SFC} from 'types';

import MenuLink from './MenuItem/MenuLink';
import BadgeCount from './BadgeCount';
import CreatePostButton from './CreatePostButton';
import * as S from './Styles';
import useIsRail from './useIsRail';

const BRAND_NAME = 'thenewboston';

const LeftNav: SFC = ({className}) => {
  const isRail = useIsRail();
  const self = useSelector(getSelf);

  const profilePath = `/profile/${self.id}`;
  const username = self.username || '';

  return (
    <S.Container className={className}>
      <S.Top>
        <S.Brand title={isRail ? BRAND_NAME : undefined} to={PATH_FEED}>
          <S.BrandLogo alt="" src={logo} />
          <S.BrandName>{BRAND_NAME}</S.BrandName>
        </S.Brand>
        <S.Menu aria-label="Main">
          <MenuLink activeIcon={mdiHome} icon={mdiHomeOutline} rootPath="/feed" text="Home" to="/feed" />
          <MenuLink
            activeIcon={mdiGamepadVariant}
            icon={mdiGamepadVariantOutline}
            rootPath="/connect-five"
            text="Connect 5"
            to="/connect-five"
          />
          <MenuLink
            activeIcon={mdiBell}
            icon={mdiBellOutline}
            rootPath="/notifications"
            text="Notifications"
            to="/notifications"
          >
            <BadgeCount />
          </MenuLink>
          <MenuLink
            activeIcon={mdiSwapHorizontalCircle}
            icon={mdiSwapHorizontalCircleOutline}
            rootPath="/exchange"
            text="Exchange"
            to="/exchange"
          />
          <MenuLink
            activeIcon={mdiCircleMultiple}
            icon={mdiCircleMultipleOutline}
            rootPath="/currencies"
            text="Currencies"
            to="/currencies"
          />
          <MenuLink
            activeIcon={mdiAccount}
            icon={mdiAccountOutline}
            rootPath={profilePath}
            text="Profile"
            to={profilePath}
          />
          <MenuLink
            activeIcon={mdiWalletBifold}
            icon={mdiWalletBifoldOutline}
            rootPath="/wallets"
            text="Wallets"
            to="/wallets"
          />
        </S.Menu>
        <CreatePostButton />
      </S.Top>
      <S.Bottom>
        <S.UserCard title={isRail ? username : undefined} to={profilePath}>
          <S.Avatar size="32px" src={self.avatar} />
          <S.UserDetails>
            <S.Username>{username}</S.Username>
            <S.UserCaption>View profile</S.UserCaption>
          </S.UserDetails>
        </S.UserCard>
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
