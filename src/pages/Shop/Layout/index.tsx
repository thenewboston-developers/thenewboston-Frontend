import {Outlet} from 'react-router-dom';

import {SFC} from 'types';
import Toolbar from './Toolbar';
import * as S from './Styles';

export interface LayoutProps {
  toolbarType: string;
}

const Layout: SFC<LayoutProps> = ({className, toolbarType}) => {
  return (
    <S.Container className={className}>
      <Toolbar toolbarType={toolbarType} />
      <Outlet />
    </S.Container>
  );
};

export default Layout;
