import {Route, Routes} from 'react-router-dom';

import {SFC} from 'types';
import Layout from './Layout';
import * as S from './Styles';
import Lectures from './Lectures';
import Courses from './Courses';

const University: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <Routes>
        <Route element={<Layout />}>
          {/* TODO: replace these hardcoded paths with those in constants/paths.ts */}
          <Route path="/courses" element={<Courses />} />
          <Route path="/self" element={<Lectures />} />
        </Route>
      </Routes>
    </S.Container>
  );
};

export default University;
