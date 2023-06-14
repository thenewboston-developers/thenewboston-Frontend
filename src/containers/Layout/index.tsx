import LeftNav from 'containers/LeftNav';
import {SFC} from 'types';
import * as S from './Styles';

const Layout: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <LeftNav />
      <div>main area</div>
    </S.Container>
  );
};

export default Layout;
