import {Route, Routes} from 'react-router-dom';

import Canvas from 'pages/Canvas';
import Cores from 'pages/Cores';
import Exchange from 'pages/Exchange';
import Profile from 'pages/Profile';
import Shop from 'pages/Shop';
import Wallets from 'pages/Wallets';
import {SFC} from 'types';
import * as S from './Styles';

const MainArea: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <Routes>
        <Route path="/canvas" element={<Canvas />} />
        <Route path="/cores" element={<Cores />} />
        <Route path="/exchange/*" element={<Exchange />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/shop/*" element={<Shop />} />
        <Route path="/wallets" element={<Wallets />} />
      </Routes>
    </S.Container>
  );
};

export default MainArea;
