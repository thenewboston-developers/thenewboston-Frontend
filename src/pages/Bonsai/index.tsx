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
        <Route element={<Home />} path="/home" />
        <Route element={<LearnMore />} path="/learn-more/*" />
        <Route element={<Manage />} path="/manage" />
        <Route element={<Admin mode="create" />} path="/manage/create" />
        <Route element={<Admin mode="edit" />} path="/edit/:id" />
      </Route>
      <Route element={<Detail />} path="/:id" />
      <Route element={<Navigate replace to="/bonsai/home" />} path="*" />
    </Routes>
  );
};

export default Bonsai;
