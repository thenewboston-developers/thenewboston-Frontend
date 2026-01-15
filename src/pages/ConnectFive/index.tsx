import {Navigate, Route, Routes} from 'react-router-dom';

import {SFC} from 'types';

import Game from './Game';
import Home from './Home';
import Leaderboard from './Leaderboard';

const ConnectFive: SFC = () => {
  return (
    <Routes>
      <Route element={<Home />} path="/home" />
      <Route element={<Leaderboard />} path="/leaderboard" />
      <Route element={<Game />} path="/games/:challengeId" />
      <Route element={<Navigate replace to="/connect-five/home" />} path="*" />
    </Routes>
  );
};

export default ConnectFive;
