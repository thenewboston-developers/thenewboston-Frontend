import {useSelector} from 'react-redux';
import {matchPath, Navigate, Route, useLocation} from 'react-router-dom';

import logo from 'assets/logo192.png';
import SentryRoutes from 'components/SentryRoutes';
import {PATH_AUTHENTICATION, PATH_HOME} from 'constants/paths';
import {useIsAuthenticated} from 'hooks';
import {getSelf} from 'selectors/state';
import {SFC} from 'types';
import {getNextPath} from 'utils/authentication';

import CreateAccountForm from './forms/CreateAccountForm';
import SignInForm from './forms/SignInForm';
import * as S from './Styles';

/**
 * The sign in and create account pages. Once the visitor is authenticated they are sent on to the page they came
 * from (the "next" query parameter) and, when there is none, new members land on their profile and returning members
 * on the home page.
 */
const Unauthenticated: SFC = ({className}) => {
  const isAuthenticated = useIsAuthenticated();
  const location = useLocation();
  const self = useSelector(getSelf);

  if (isAuthenticated) {
    const isCreateAccountPage = !!matchPath(PATH_AUTHENTICATION.CREATE_ACCOUNT, location.pathname);
    const defaultPath = isCreateAccountPage ? `/profile/${self.id}` : PATH_HOME;

    return <Navigate replace to={getNextPath(location.search) || defaultPath} />;
  }

  return (
    <S.Container className={className}>
      <S.Content>
        <S.Brand to={PATH_HOME}>
          <S.BrandLogo alt="" src={logo} />
          <S.BrandName>thenewboston</S.BrandName>
        </S.Brand>
        <SentryRoutes>
          <Route path={PATH_AUTHENTICATION.CREATE_ACCOUNT} element={<CreateAccountForm />} />
          <Route path={PATH_AUTHENTICATION.SIGN_IN} element={<SignInForm />} />
        </SentryRoutes>
      </S.Content>
    </S.Container>
  );
};

export default Unauthenticated;
