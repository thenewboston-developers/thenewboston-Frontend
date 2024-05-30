import {Navigate, Route, Routes} from 'react-router-dom';
import {SFC} from 'types';
import * as S from './Styles';
import Home from './Home';
import Layout from './layout';
import LearnMore from './LearnMore';

const Cores: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <Routes>
        <Route element={<Layout />}>
          {/* TODO: replace these hardcoded paths with those in constants/paths.ts */}
          {/* <Route path="/artworks/:id" element={<Home />} /> */}
          <Route path="*" element={<Navigate to="/currencies/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/learn-more" element={<LearnMore />} />
        </Route>
      </Routes>
    </S.Container>
  );
};

export default Cores;
