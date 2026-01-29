import {Outlet} from 'react-router-dom';

import WebSocket from 'containers/WebSocket';
import {SFC} from 'types';

import ConnectFiveNavigation from '../Navigation';

import * as S from './Styles';

const Layout: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <ConnectFiveNavigation />
      <WebSocket url={`${process.env.REACT_APP_WS_URL}/ws/connect-five/public`} />
      <S.OutletContainer>
        <Outlet />
      </S.OutletContainer>
    </S.Container>
  );
};

export default Layout;
