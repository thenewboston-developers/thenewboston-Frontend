import {Navigate, Route, Routes} from 'react-router-dom';

import {SFC} from 'types';

import Home from './Home';
import Layout from './Layout';
import LearnMore from './LearnMore';
import * as S from './Styles';

const Wallets: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="*" element={<Navigate to="/wallets/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/learn-more" element={<LearnMore />} />
        </Route>
      </Routes>
    </S.Container>
  );
};

export default Wallets;
