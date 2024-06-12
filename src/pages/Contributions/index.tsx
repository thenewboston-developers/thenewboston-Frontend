import {Navigate, Route, Routes} from 'react-router-dom';

// import LearnMore from './LearnMore';
import HomeContributions from './HomeContributions';
import Layout from './Layout';
import MyContributions from './MyContributions';
import {BASE_CONTRIBUTIONS, PATH_CONTRIBUTIONS} from 'constants/paths';
import {SFC} from 'types';

import * as S from './Styles';

const Contributions: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="*" element={<Navigate to={PATH_CONTRIBUTIONS.HOME} replace />} />
          <Route path={PATH_CONTRIBUTIONS.HOME.replace(BASE_CONTRIBUTIONS, '')} element={<HomeContributions />} />
          <Route path={PATH_CONTRIBUTIONS.SELF.replace(BASE_CONTRIBUTIONS, '')} element={<MyContributions />} />
          {/* <Route path="/learn-more" element={<LearnMore />} /> */}
        </Route>
      </Routes>
    </S.Container>
  );
};

export default Contributions;
