import {Navigate, Route} from 'react-router-dom';

import RequireAuthentication from 'components/RequireAuthentication';
import SentryRoutes from 'components/SentryRoutes';
import {SFC} from 'types';

import Home from './Home';
import LearnMore from './LearnMore';
import Orders from './Orders';
import * as S from './Styles';
import Trade from './Trade';

const MainArea: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <SentryRoutes>
        <Route index element={<Navigate to="/exchange/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/learn-more" element={<LearnMore />} />
        <Route
          path="/orders"
          element={
            <RequireAuthentication>
              <Orders />
            </RequireAuthentication>
          }
        />
        <Route path="/trade/:assetPairId" element={<Trade />} />
      </SentryRoutes>
    </S.Container>
  );
};

export default MainArea;
