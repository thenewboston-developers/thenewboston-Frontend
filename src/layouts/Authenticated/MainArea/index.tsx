import {Route, Routes} from 'react-router-dom';

import Cores from 'pages/Cores';
import Orders from 'pages/Orders';
import Trade from 'pages/Trade';
import Wallets from 'pages/Wallets';
import {SFC} from 'types';
import * as S from './Styles';

const MainArea: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <Routes>
        <Route path="/cores" element={<Cores />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/trade" element={<Trade />} />
        <Route path="/wallets" element={<Wallets />} />
      </Routes>
    </S.Container>
  );
};

export default MainArea;
