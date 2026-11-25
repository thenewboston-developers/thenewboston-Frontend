import {useSelector} from 'react-redux';
import {useLocation} from 'react-router-dom';
import {Bell, ChartCandlestick, Gamepad2, House, LogIn, LogOut, UserRound, Wallet} from 'lucide-react';

import logo from 'assets/logo192.png';
import {PATH_AUTHENTICATION, PATH_GAMES, PATH_HOME} from 'constants/paths';
import {useIsAuthenticated} from 'hooks';
import {Coins} from 'layouts/Main/icons';
import {getSelf} from 'selectors/state';
import {SFC} from 'types';
import {analyticsArea, analyticsTarget} from 'utils/analyticsAttributes';
import {getAuthenticationPath, getLocationPath} from 'utils/authentication';

import MenuLink from './MenuItem/MenuLink';
import BadgeCount from './BadgeCount';
import CreateAccountLink from './CreateAccountLink';
import CreatePostButton from './CreatePostButton';
import * as S from './Styles';
import useIsRail from './useIsRail';

const BRAND_NAME = 'thenewboston';
const LOG_OUT_TEXT = 'Log out';

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
            icon={LogIn}
            rootPath={PATH_AUTHENTICATION.SIGN_IN}
            text="Sign in"
            to={getAuthenticationPath(PATH_AUTHENTICATION.SIGN_IN, getLocationPath(location))}
          />
        </S.Bottom>
      );
    }

    return (
      <S.ProfileCard>
        <S.UserCard {...analyticsTarget('user_card')} title={isRail ? username : undefined} to={profilePath}>
          <S.Avatar size="32px" src={self.avatar} />
          <S.UserDetails>
            <S.Username>{username}</S.Username>
            <S.UserCaption>View profile</S.UserCaption>
          </S.UserDetails>
        </S.UserCard>
        <S.LogoutLink
          {...analyticsTarget(LOG_OUT_TEXT)}
          aria-label={LOG_OUT_TEXT}
          title={LOG_OUT_TEXT}
          to={PATH_AUTHENTICATION.LOGOUT}
        >
          <LogOut aria-hidden size={18} strokeWidth={1.75} />
        </S.LogoutLink>
      </S.ProfileCard>
    );
  };

  // Notifications, the profile and the wallets belong to a member, so signed-out visitors only see the public sections
  const renderMenu = () => {
    return (
      <S.Menu aria-label="Main">
        <MenuLink icon={House} rootPath={PATH_HOME} text="Home" to={PATH_HOME} />
        <MenuLink icon={Gamepad2} rootPath={PATH_GAMES} text="Games" to={PATH_GAMES} />
        {isAuthenticated && (
          <MenuLink icon={Bell} rootPath="/notifications" text="Notifications" to="/notifications">
            <BadgeCount />
          </MenuLink>
        )}
        <MenuLink icon={ChartCandlestick} rootPath="/exchange" text="Exchange" to="/exchange" />
        <MenuLink icon={Coins} rootPath="/currencies" text="Currencies" to="/currencies" />
        {isAuthenticated && <MenuLink icon={UserRound} rootPath={profilePath} text="Profile" to={profilePath} />}
        {isAuthenticated && <MenuLink icon={Wallet} rootPath="/wallets" text="Wallets" to="/wallets" />}
      </S.Menu>
    );
  };

  return (
    <S.Container {...analyticsArea('navigation')} className={className}>
      <S.Top>
        <S.Brand {...analyticsTarget('brand')} title={isRail ? BRAND_NAME : undefined} to={PATH_HOME}>
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
