import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {
  mdiAccount,
  mdiExitToApp,
  mdiLanConnect,
  mdiShopping,
  mdiSwapHorizontalCircleOutline,
  mdiWalletBifoldOutline,
} from '@mdi/js';

import {logout} from 'dispatchers/authentication';
import {AppDispatch, SFC} from 'types';
import CreatePostButton from './CreatePostButton';
import MenuButton from './MenuItem/MenuButton';
import MenuLink from './MenuItem/MenuLink';
import * as S from './Styles';

const LeftNav: SFC = ({className}) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/signIn');
  };

  return (
    <S.Container className={className}>
      <S.Top>
        <MenuLink icon={mdiLanConnect} rootPath="/cores" text="Cores" to="/cores" />
        <MenuLink icon={mdiWalletBifoldOutline} rootPath="/wallets" text="Wallets" to="/wallets" />
        <MenuLink icon={mdiSwapHorizontalCircleOutline} rootPath="/exchange" text="Exchange" to="/exchange/trade" />
        <MenuLink icon={mdiShopping} rootPath="/shop" text="Shop" to="/shop/buy/catalog" />
        <MenuLink icon={mdiAccount} rootPath="/profile" text="Profile" to="/profile" />
        <CreatePostButton />
      </S.Top>
      <S.Bottom>
        <MenuButton icon={mdiExitToApp} onClick={handleLogout} text="Log out" />
      </S.Bottom>
    </S.Container>
  );
};

export default LeftNav;
