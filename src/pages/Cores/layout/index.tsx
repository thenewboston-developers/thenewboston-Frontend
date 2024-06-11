import {Outlet} from 'react-router-dom';

import Toolbar from './Toolbar';
import {SFC} from 'types';

import * as S from './Styles';

const Layout: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <Toolbar />
      <S.OutletContainer>
        <Outlet />
      </S.OutletContainer>
    </S.Container>
  );
};

export default Layout;
