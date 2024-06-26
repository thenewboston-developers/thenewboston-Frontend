import {Route, Routes} from 'react-router-dom';

import {SFC} from 'types';
import Orders from './Orders';
import Trade from './Trade';
import * as S from './Styles';

const MainArea: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <Routes>
        {/* TODO: replace these hardcoded paths with those in constants/paths.ts */}
        <Route path="/orders" element={<Orders />} />
        <Route path="/trade" element={<Trade />} />
      </Routes>
    </S.Container>
  );
};

export default MainArea;
