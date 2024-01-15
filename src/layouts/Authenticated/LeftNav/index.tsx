import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {
  mdiAccount,
  mdiAccountGroup,
  mdiBell,
  mdiBrush,
  mdiExitToApp,
  mdiFaceWoman,
  mdiHome,
  mdiLanConnect,
  mdiShopping,
  mdiSwapHorizontalCircleOutline,
  mdiWalletBifoldOutline,
} from '@mdi/js';

import {logout} from 'dispatchers/authentication';
import {getSelf} from 'selectors/state';
import {AppDispatch, SFC} from 'types';
import CreatePostButton from './CreatePostButton';
import MenuButton from './MenuItem/MenuButton';
import MenuLink from './MenuItem/MenuLink';
import * as S from './Styles';

const LeftNav: SFC = ({className}) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const self = useSelector(getSelf);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/signIn');
  };

  return (
    <S.Container className={className}>
      <S.Top>
        <MenuLink icon={mdiBrush} rootPath="/art" text="Art" to="/art/marketplace" />
        <MenuLink icon={mdiAccountGroup} rootPath="/contributions" text="Contributions" to="/contributions" />
        <MenuLink icon={mdiLanConnect} rootPath="/cores" text="Cores" to="/cores" />
        <MenuLink icon={mdiSwapHorizontalCircleOutline} rootPath="/exchange" text="Exchange" to="/exchange/trade" />
        <MenuLink icon={mdiHome} rootPath="/feed" text="Home" to="/feed" />
        <MenuLink icon={mdiFaceWoman} rootPath="/ia" text="Ia" to="/ia" />
        <MenuLink icon={mdiBell} rootPath="/notifications" text="Notifications" to="/notifications" />
        <MenuLink icon={mdiAccount} rootPath={`/profile/${self.id}`} text="Profile" to={`/profile/${self.id}`} />
        <MenuLink icon={mdiShopping} rootPath="/shop" text="Shop" to="/shop/buy/catalog" />
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
