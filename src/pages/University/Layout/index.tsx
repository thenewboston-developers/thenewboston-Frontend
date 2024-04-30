import {Outlet} from 'react-router-dom';

import {SFC} from 'types';
import Toolbar from './Toolbar';
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
