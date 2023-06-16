import {useSelector} from 'react-redux';

import {getAuthentication} from 'selectors/state';

const useIsAuthenticated = (): boolean => {
  const authentication = useSelector(getAuthentication);

  return !!authentication.accessToken;
};

export default useIsAuthenticated;
