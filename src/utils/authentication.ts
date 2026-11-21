import {PATH_HOME} from 'constants/paths';
import {store} from 'store';

const NEXT_PARAM = 'next';

// Signed-out visitors send no Authorization header at all, because the API rejects a request that carries an invalid
// token even on the endpoints that are open to everyone
const getAuthorizationHeader = (): {Authorization?: string} => {
  const {
    authentication: {accessToken},
  } = store.getState();

  return accessToken ? {Authorization: `Bearer ${accessToken}`} : {};
};

export const authorizationFormHeaders = () => {
  return {
    headers: {
      ...getAuthorizationHeader(),
      'Content-Type': 'multipart/form-data',
    },
  };
};

export const authorizationHeaders = () => {
  return {
    headers: getAuthorizationHeader(),
  };
};

/**
 * Builds the path of a sign in or create account page that returns the visitor to nextPath once they are
 * authenticated. The home page is left out, it is where a visitor ends up without being asked to.
 */
export const getAuthenticationPath = (authenticationPath: string, nextPath: string | null): string => {
  if (!nextPath || nextPath === PATH_HOME) return authenticationPath;
  return `${authenticationPath}?${new URLSearchParams({[NEXT_PARAM]: nextPath})}`;
};

/**
 * The full in-app path of a location, used to return a visitor to the page they were on once they are authenticated.
 */
export const getLocationPath = ({hash, pathname, search}: {hash: string; pathname: string; search: string}): string => {
  return `${pathname}${search}${hash}`;
};

/**
 * Reads the path a visitor should be returned to after authenticating from a query string.
 * Only paths inside the app are accepted, so a crafted link cannot send a visitor to another site after they sign in.
 */
export const getNextPath = (search: string): string | null => {
  const nextPath = new URLSearchParams(search).get(NEXT_PARAM);

  if (!nextPath || !nextPath.startsWith('/') || nextPath.startsWith('//') || nextPath.includes('\\')) return null;

  return nextPath;
};
