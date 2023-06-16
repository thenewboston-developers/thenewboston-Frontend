import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {mdiExitToApp, mdiHome} from '@mdi/js';

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
        <MenuLink icon={mdiHome} text="Home" to="/" />
      </S.Top>
      <S.Bottom>
        <MenuButton icon={mdiExitToApp} onClick={handleLogout} text="Log out" />
      </S.Bottom>
    </S.Container>
  );
};

export default LeftNav;
