import {SFC} from 'types';
import {Route, Routes} from 'react-router-dom';
import Home from '../Home';
import LearnMore from '../LearnMore';
import * as S from './Styles';

const MainArea: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/learn-more" element={<LearnMore />} />
      </Routes>
    </S.Container>
  );
};
export default MainArea;
