import {SFC} from 'types';
import LeftMenu from './LeftMenu';
import Right from './Right';
import * as S from './Styles';

const Ia: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <LeftMenu />
      <Right />
    </S.Container>
  );
};

export default Ia;
