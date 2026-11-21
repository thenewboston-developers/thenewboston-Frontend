import axios from 'axios';

import {logout} from 'dispatchers/authentication';
import {ToastType} from 'enums';
import {store} from 'store';
import {isUnauthorizedError} from 'utils/errors';
import {displayToast} from 'utils/toasts';

const getRequestAuthorization = (error: any): string | undefined => {
  const headers = error?.config?.headers;
  if (!headers) return undefined;
  return typeof headers.get === 'function' ? headers.get('Authorization') : headers.Authorization;
};

/**
 * The API answers 401 to any request that carries an access token it no longer accepts, even on the endpoints that
 * are open to everyone. Ending the session lets the visitor keep browsing as a guest and sign in again, instead of
 * every request failing until they find the log out button.
 *
 * Only a rejection of the current access token ends the session. Requests sent without a token (a signed-out visitor
 * reaching for something private) and late responses to a token that was already replaced are left alone.
 */
export const endSessionIfExpired = (error: any): boolean => {
  const {accessToken} = store.getState().authentication;

  if (!isUnauthorizedError(error)) return false;
  if (!accessToken || getRequestAuthorization(error) !== `Bearer ${accessToken}`) return false;

  store.dispatch(logout());
  displayToast('Your session has expired. Please sign in again.', ToastType.WARNING);

  return true;
};

export const registerExpiredSessionHandler = (): void => {
  axios.interceptors.response.use(undefined, (error) => {
    endSessionIfExpired(error);
    return Promise.reject(error);
  });
};
