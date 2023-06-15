import {SFC} from 'types';
import CreateAccountForm from './forms/CreateAccountForm';
import * as S from './Styles';

const Unauthenticated: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <CreateAccountForm />
    </S.Container>
  );
};

export default Unauthenticated;
