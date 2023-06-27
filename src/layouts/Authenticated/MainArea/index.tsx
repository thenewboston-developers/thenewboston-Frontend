import {Route, Routes} from 'react-router-dom';

import Cores from 'pages/Cores';
import Exchange from 'pages/Exchange';
import Home from 'pages/Home';
import Wallets from 'pages/Wallets';
import {SFC} from 'types';
import * as S from './Styles';

const MainArea: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cores" element={<Cores />} />
        <Route path="/exchange" element={<Exchange />} />
        <Route path="/wallets" element={<Wallets />} />
      </Routes>
    </S.Container>
  );
};

export default MainArea;
