import {Navigate, Route, Routes} from 'react-router-dom';

import {SFC} from 'types';

import Detail from './Detail';
import Home from './Home';
import Layout from './Layout';
import LearnMore from './LearnMore';

const Bonsai: SFC = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/learn-more" element={<LearnMore />} />
      </Route>
      <Route path="/:bonsaiId" element={<Detail />} />
      <Route path="*" element={<Navigate to="/bonsai/home" replace />} />
    </Routes>
  );
};

export default Bonsai;
