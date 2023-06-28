import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {
  mdiExitToApp,
  mdiLanConnect,
  mdiListBoxOutline,
  mdiSwapHorizontalCircleOutline,
  mdiWalletBifoldOutline,
} from '@mdi/js';

import {logout} from 'dispatchers/authentication';
import {AppDispatch, SFC} from 'types';
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
        <MenuLink icon={mdiLanConnect} text="Cores" to="/cores" />
        <MenuLink icon={mdiSwapHorizontalCircleOutline} text="Trade" to="/trade" />
        <MenuLink icon={mdiListBoxOutline} text="Orders" to="/orders" />
        <MenuLink icon={mdiWalletBifoldOutline} text="Wallets" to="/wallets" />
      </S.Top>
      <S.Bottom>
        <MenuButton icon={mdiExitToApp} onClick={handleLogout} text="Log out" />
      </S.Bottom>
    </S.Container>
  );
};

export default LeftNav;
