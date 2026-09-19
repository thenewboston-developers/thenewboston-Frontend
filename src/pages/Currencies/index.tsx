import {Navigate, Route} from 'react-router-dom';

import SentryRoutes from 'components/SentryRoutes';
import {SFC} from 'types';

import Detail from './Detail';
import Home from './Home';
import Layout from './Layout';
import LearnMore from './LearnMore';
import * as S from './Styles';

const Currencies: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <SentryRoutes>
        <Route element={<Layout />}>
          <Route path="*" element={<Navigate to="/currencies/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/learn-more" element={<LearnMore />} />
        </Route>
        <Route path="/:id" element={<Detail />} />
      </SentryRoutes>
    </S.Container>
  );
};

export default Currencies;
