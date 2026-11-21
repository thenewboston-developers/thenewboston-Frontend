import {FC, ReactNode} from 'react';
import {Navigate, useLocation} from 'react-router-dom';

import {PATH_AUTHENTICATION} from 'constants/paths';
import {useIsAuthenticated} from 'hooks';
import {getAuthenticationPath, getLocationPath} from 'utils/authentication';

export interface RequireAuthenticationProps {
  children: ReactNode;
}

/**
 * Wraps the pages that only exist for a signed-in member (notifications, wallets, their own orders). A signed-out
 * visitor is sent to the sign in page and returned to the page they asked for once they are authenticated.
 */
const RequireAuthentication: FC<RequireAuthenticationProps> = ({children}) => {
  const isAuthenticated = useIsAuthenticated();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate replace to={getAuthenticationPath(PATH_AUTHENTICATION.SIGN_IN, getLocationPath(location))} />;
  }

  return <>{children}</>;
};

export default RequireAuthentication;
