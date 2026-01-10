import {useEffect} from 'react';
import {Navigate, Route, Routes, useLocation} from 'react-router-dom';

import {SFC} from 'types';

import {bonsaiLearnMoreChapters} from './chapters';
import Home from './Home';

const LearnMore: SFC = () => {
  const location = useLocation();

  useEffect(() => {
    const scrollContainer =
      document.getElementById('bonsai-scroll-container') ?? document.getElementById('main-scrollable-area');

    if (scrollContainer) {
      scrollContainer.scrollTo({top: 0});
      return;
    }

    window.scrollTo({top: 0});
  }, [location.pathname]);

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
