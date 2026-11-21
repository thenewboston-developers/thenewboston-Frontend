import {useSelector} from 'react-redux';
import {useLocation} from 'react-router-dom';
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
  mdiLogin,
  mdiSwapHorizontalCircle,
  mdiSwapHorizontalCircleOutline,
  mdiWalletBifold,
  mdiWalletBifoldOutline,
} from '@mdi/js';

import logo from 'assets/logo192.png';
import {PATH_AUTHENTICATION, PATH_HOME} from 'constants/paths';
import {useIsAuthenticated} from 'hooks';
import {getSelf} from 'selectors/state';
import {SFC} from 'types';
import {getAuthenticationPath, getLocationPath} from 'utils/authentication';

import MenuLink from './MenuItem/MenuLink';
import BadgeCount from './BadgeCount';
import CreateAccountLink from './CreateAccountLink';
import CreatePostButton from './CreatePostButton';
import * as S from './Styles';
import useIsRail from './useIsRail';

const BRAND_NAME = 'thenewboston';

const LeftNav: SFC = ({className}) => {
  const isAuthenticated = useIsAuthenticated();
  const isRail = useIsRail();
  const location = useLocation();
  const self = useSelector(getSelf);

  const profilePath = `/profile/${self.id}`;
  const username = self.username || '';

  const renderBottom = () => {
    if (!isAuthenticated) {
      return (
        <S.Bottom>
          <MenuLink
            icon={mdiLogin}
            rootPath={PATH_AUTHENTICATION.SIGN_IN}
            text="Sign in"
            to={getAuthenticationPath(PATH_AUTHENTICATION.SIGN_IN, getLocationPath(location))}
          />
        </S.Bottom>
      );
    }

    return (
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
    );
  };

  // Notifications, the profile and the wallets belong to a member, so signed-out visitors only see the public sections
  const renderMenu = () => {
    return (
      <S.Menu aria-label="Main">
        <MenuLink activeIcon={mdiHome} icon={mdiHomeOutline} rootPath={PATH_HOME} text="Home" to={PATH_HOME} />
        <MenuLink
          activeIcon={mdiGamepadVariant}
          icon={mdiGamepadVariantOutline}
          rootPath="/connect-five"
          text="Connect 5"
          to="/connect-five"
        />
        {isAuthenticated && (
          <MenuLink
            activeIcon={mdiBell}
            icon={mdiBellOutline}
            rootPath="/notifications"
            text="Notifications"
            to="/notifications"
          >
            <BadgeCount />
          </MenuLink>
        )}
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
        {isAuthenticated && (
          <MenuLink
            activeIcon={mdiAccount}
            icon={mdiAccountOutline}
            rootPath={profilePath}
            text="Profile"
            to={profilePath}
          />
        )}
        {isAuthenticated && (
          <MenuLink
            activeIcon={mdiWalletBifold}
            icon={mdiWalletBifoldOutline}
            rootPath="/wallets"
            text="Wallets"
            to="/wallets"
          />
        )}
      </S.Menu>
    );
  };

  return (
    <S.Container className={className}>
      <S.Top>
        <S.Brand title={isRail ? BRAND_NAME : undefined} to={PATH_HOME}>
          <S.BrandLogo alt="" src={logo} />
          <S.BrandName>{BRAND_NAME}</S.BrandName>
        </S.Brand>
        {renderMenu()}
        {isAuthenticated ? <CreatePostButton /> : <CreateAccountLink />}
      </S.Top>
      {renderBottom()}
    </S.Container>
  );
};

export default LeftNav;
