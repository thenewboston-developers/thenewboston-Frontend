import LeftNav from 'containers/LeftNav';
import MainArea from 'containers/MainArea';
import {SFC} from 'types';
import * as S from './Styles';

const Layout: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <LeftNav />
      <MainArea />
    </S.Container>
  );
};

export default Layout;
