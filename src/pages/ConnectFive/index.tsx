import {Navigate, Route} from 'react-router-dom';

import SentryRoutes from 'components/SentryRoutes';
import {SFC} from 'types';

import Challenge from './Challenge';
import Home from './Home';
import Layout from './Layout';
import Leaderboard from './Leaderboard';
import Match from './Match';

const ConnectFive: SFC = () => {
  return (
    <SentryRoutes>
      <Route element={<Layout />}>
        <Route element={<Challenge />} path="/challenges/:challengeId" />
        <Route element={<Home />} path="/home" />
        <Route element={<Leaderboard />} path="/leaderboard" />
        <Route element={<Match />} path="/matches/:matchId" />
      </Route>
      <Route element={<Navigate replace to="/connect-five/home" />} path="*" />
    </SentryRoutes>
  );
};

export default ConnectFive;
