import {Outlet} from 'react-router-dom';

import {SFC} from 'types';

import * as S from './Styles';
import Toolbar from './Toolbar';

const Layout: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <Toolbar />
      <S.OutletContainer id="bonsai-scroll-container">
        <Outlet />
      </S.OutletContainer>
    </S.Container>
  );
};

export default Layout;
