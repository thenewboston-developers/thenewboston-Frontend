import {SFC} from 'types';

import MainArea from './MainArea';
import * as S from './Styles';
import Toolbar from './Toolbar';

const Exchange: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <Toolbar />
      <MainArea />
    </S.Container>
  );
};

export default Exchange;
