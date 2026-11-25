import {Navigate, Route, useLocation} from 'react-router-dom';

import SentryRoutes from 'components/SentryRoutes';

import Home from './Home';

const Plinko = () => {
  const {hash, search} = useLocation();
  return (
    <SentryRoutes>
      <Route element={<Home />} path="/home" />
      <Route element={<Navigate replace to={{pathname: '/plinko/home', search, hash}} />} path="*" />
    </SentryRoutes>
  );
};

export default Plinko;
