import {Navigate, Route, Routes} from 'react-router-dom';

import {SFC} from 'types';

import {bonsaiLearnMoreChapters} from './chapters';
import Home from './Home';

const LearnMore: SFC = () => {
  return (
    <Routes>
      <Route element={<Home />} index />
      {bonsaiLearnMoreChapters.map(({Component, path}) => (
        <Route element={<Component />} key={path} path={path} />
      ))}
      <Route element={<Navigate replace to="/bonsai/learn-more" />} path="*" />
    </Routes>
  );
};

export default LearnMore;
