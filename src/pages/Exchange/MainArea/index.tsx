import {Route, Routes} from 'react-router-dom';

import {SFC} from 'types';

import Orders from './Orders';
import * as S from './Styles';
import Trade from './Trade';

const MainArea: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <Routes>
        <Route path="/orders" element={<Orders />} />
        <Route path="/trade" element={<Trade />} />
      </Routes>
    </S.Container>
  );
};

export default MainArea;
