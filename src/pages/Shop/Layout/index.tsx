import {Outlet} from 'react-router-dom';

import {ShopToolbarType} from 'enums';
import {SFC} from 'types';
import Toolbar from './Toolbar';
import * as S from './Styles';

export interface LayoutProps {
  toolbarType: ShopToolbarType;
}

const Layout: SFC<LayoutProps> = ({className, toolbarType}) => {
  return (
    <S.Container className={className}>
      <Toolbar toolbarType={toolbarType} />
      <S.OutletContainer>
        <Outlet />
      </S.OutletContainer>
    </S.Container>
  );
};

export default Layout;
