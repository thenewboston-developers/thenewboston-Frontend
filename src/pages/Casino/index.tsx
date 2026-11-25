import {Navigate, Route, useLocation} from 'react-router-dom';

import SentryRoutes from 'components/SentryRoutes';

const LegacyGameRedirect = ({to}: {to: string}) => {
  const {hash, search} = useLocation();
  return <Navigate replace to={{pathname: to, search, hash}} />;
};

// Compatibility only: gameplay lives in the independent game pages.
const Casino = () => (
  <SentryRoutes>
    <Route element={<LegacyGameRedirect to="/slots/home" />} path="slots" />
    <Route element={<LegacyGameRedirect to="/roulette/home" />} path="roulette" />
    <Route element={<LegacyGameRedirect to="/blackjack/home" />} path="blackjack" />
    <Route element={<LegacyGameRedirect to="/plinko/home" />} path="plinko" />
    <Route element={<LegacyGameRedirect to="/let-it-ride/home" />} path="let-it-ride" />
    <Route element={<LegacyGameRedirect to="/slots/home" />} path="*" />
  </SentryRoutes>
);

export default Casino;
