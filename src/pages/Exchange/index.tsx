import {SFC} from 'types';
import MainArea from './MainArea';
import TopNav from './TopNav';
import * as S from './Styles';

const Exchange: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <TopNav />
      <MainArea />
    </S.Container>
  );
};

export default Exchange;
