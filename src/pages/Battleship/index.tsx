import {Navigate, Route} from 'react-router-dom';

import SentryRoutes from 'components/SentryRoutes';

import Home from './Home';
import Match from './Match';

const Battleship = () => (
  <SentryRoutes>
    <Route element={<Home />} path="/home" />
    <Route element={<Match />} path="/matches/:matchId" />
    <Route element={<Navigate replace to="/battleship/home" />} path="*" />
  </SentryRoutes>
);

export default Battleship;
