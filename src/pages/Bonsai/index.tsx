import {Navigate, Route, Routes} from 'react-router-dom';

import {SFC} from 'types';

import Admin from './Admin';
import Detail from './Detail';
import Home from './Home';
import Layout from './Layout';
import LearnMore from './LearnMore';
import Manage from './Manage';

const Bonsai: SFC = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/learn-more" element={<LearnMore />} />
        <Route path="/manage" element={<Manage />} />
        <Route path="/manage/create" element={<Admin mode="create" />} />
        <Route path="/edit/:id" element={<Admin mode="edit" />} />
      </Route>
      <Route path="/:id" element={<Detail />} />
      <Route path="*" element={<Navigate to="/bonsai/home" replace />} />
    </Routes>
  );
};

export default Bonsai;
