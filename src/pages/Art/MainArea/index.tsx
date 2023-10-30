import {Route, Routes} from 'react-router-dom';

import {SFC} from 'types';
import Create from './Create';
import * as S from './Styles';

const MainArea: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <Routes>
        <Route path="/create" element={<Create />} />
      </Routes>
    </S.Container>
  );
};

export default MainArea;
