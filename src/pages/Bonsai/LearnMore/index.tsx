import {Navigate, Route, Routes} from 'react-router-dom';

import {SFC} from 'types';

import {bonsaiLearnMoreChapters} from './chapters';

const LearnMore: SFC = () => {
  const firstChapterPath = bonsaiLearnMoreChapters[0]?.path ?? 'chapter-1';

  return (
    <Routes>
      <Route element={<Navigate replace to={firstChapterPath} />} index />
      {bonsaiLearnMoreChapters.map(({Component, path}) => (
        <Route element={<Component />} key={path} path={path} />
      ))}
      <Route element={<Navigate replace to={firstChapterPath} />} path="*" />
    </Routes>
  );
};

export default LearnMore;
