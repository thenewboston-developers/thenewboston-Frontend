import {Route} from 'react-router-dom';

import SentryRoutes from 'components/SentryRoutes';
import {PATH_AUTHENTICATION, WILDCARD} from 'constants/paths';
import {SFC} from 'types';

import CreateAccountForm from './forms/CreateAccountForm';
import SignInForm from './forms/SignInForm';
import * as S from './Styles';

const Unauthenticated: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <SentryRoutes>
        <Route path={PATH_AUTHENTICATION.CREATE_ACCOUNT} element={<CreateAccountForm />} />
        <Route path={PATH_AUTHENTICATION.SIGN_IN} element={<SignInForm />} />
        <Route path={WILDCARD} element={<SignInForm />} />
      </SentryRoutes>
    </S.Container>
  );
};

export default Unauthenticated;
