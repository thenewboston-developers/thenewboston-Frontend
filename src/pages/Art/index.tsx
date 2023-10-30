import {SFC} from 'types';
import MainArea from './MainArea';
import Toolbar from './Toolbar';
import * as S from './Styles';

const Art: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <Toolbar />
      <MainArea />
    </S.Container>
  );
};

export default Art;
