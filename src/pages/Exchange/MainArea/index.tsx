import {Navigate, Route, Routes} from 'react-router-dom';

import {SFC} from 'types';

import Home from './Home';
import LearnMore from './LearnMore';
import Orders from './Orders';
import * as S from './Styles';
import Trade from './Trade';

const MainArea: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <Routes>
        <Route index element={<Navigate to="/exchange/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/learn-more" element={<LearnMore />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/trade" element={<Trade />} />
      </Routes>
    </S.Container>
  );
};

export default MainArea;
