import {useSelector} from 'react-redux';

import {getAuthentication, getSelf} from 'selectors/state';

const useIsAuthenticated = (): boolean => {
  const authentication = useSelector(getAuthentication);
  const self = useSelector(getSelf);

  return !!authentication.accessToken && !!self.id;
};

export default useIsAuthenticated;
