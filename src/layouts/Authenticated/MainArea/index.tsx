import {Navigate, Route, Routes} from 'react-router-dom';

import Art from 'pages/Art';
import Cores from 'pages/Cores';
import Exchange from 'pages/Exchange';
import Feed from 'pages/Feed';
import Profile from 'pages/Profile';
import Shop from 'pages/Shop';
import Wallets from 'pages/Wallets';
import {SFC} from 'types';
import * as S from './Styles';

const MainArea: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <Routes>
        <Route path="/art/*" element={<Art />} />
        <Route path="/cores" element={<Cores />} />
        <Route path="/exchange/*" element={<Exchange />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/profile/:id/*" element={<Profile />} />
        <Route path="/shop/*" element={<Shop />} />
        <Route path="/wallets" element={<Wallets />} />
        <Route path="*" element={<Navigate to="/feed" replace />} />
      </Routes>
    </S.Container>
  );
};

export default MainArea;
