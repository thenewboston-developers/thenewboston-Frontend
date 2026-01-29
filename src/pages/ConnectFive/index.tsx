import {Navigate, Route, Routes} from 'react-router-dom';

import {SFC} from 'types';

import Home from './Home';
import Layout from './Layout';
import Leaderboard from './Leaderboard';
import Match from './Match';

const ConnectFive: SFC = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route element={<Home />} path="/home" />
        <Route element={<Leaderboard />} path="/leaderboard" />
        <Route element={<Match />} path="/matches/:matchId" />
      </Route>
      <Route element={<Navigate replace to="/connect-five/home" />} path="*" />
    </Routes>
  );
};

export default ConnectFive;
