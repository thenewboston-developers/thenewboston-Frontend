import {Outlet} from 'react-router-dom';

import {SFC} from 'types';

import ConnectFiveNavigation from '../Navigation';

import * as S from './Styles';

const Layout: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <ConnectFiveNavigation />
      <S.OutletContainer>
        <Outlet />
      </S.OutletContainer>
    </S.Container>
  );
};

export default Layout;
