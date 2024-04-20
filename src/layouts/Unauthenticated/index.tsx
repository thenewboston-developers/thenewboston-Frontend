import {Route, Routes} from 'react-router-dom';

import {SFC} from 'types';
import CreateAccountForm from './forms/CreateAccountForm';
import SignInForm from './forms/SignInForm';
import * as S from './Styles';

const Unauthenticated: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <Routes>
        {/* TODO: replace these hardcoded paths with those in constants/paths.ts */}
        <Route path="/createAccount" element={<CreateAccountForm />} />
        <Route path="/signIn" element={<SignInForm />} />
        <Route path="*" element={<SignInForm />} />
      </Routes>
    </S.Container>
  );
};

export default Unauthenticated;
