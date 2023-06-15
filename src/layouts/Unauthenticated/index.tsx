import {SFC} from 'types';
import * as S from './Styles';

const Unauthenticated: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <S.Heading>Sign in</S.Heading>
      <S.Panel>Hey</S.Panel>
    </S.Container>
  );
};

export default Unauthenticated;
