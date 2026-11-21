import axios from 'axios';

import {logout} from 'dispatchers/authentication';
import {ToastType} from 'enums';
import {store} from 'store';
import {displayToast} from 'utils/toasts';

import {endSessionIfExpired, registerExpiredSessionHandler} from './session';

// The ES module build of axios cannot be loaded by the test runner, and the handler only needs the interceptor hook
jest.mock('axios', () => ({
  interceptors: {response: {use: jest.fn()}},
}));

jest.mock('dispatchers/authentication', () => ({
  logout: jest.fn(),
}));

jest.mock('store', () => ({
  store: {dispatch: jest.fn(), getState: jest.fn()},
}));

jest.mock('utils/toasts', () => ({
  displayToast: jest.fn(),
}));

const buildError = (status: number, authorization?: string) => ({
  config: {headers: authorization ? {Authorization: authorization} : {}},
  response: {status},
});

const setAccessToken = (accessToken: string | null) => {
  (store.getState as jest.Mock).mockReturnValue({authentication: {accessToken, refreshToken: null}});
};

const LOGOUT_ACTION = {type: 'LOGOUT'};

describe('endSessionIfExpired', () => {
  beforeEach(() => {
    (logout as jest.Mock).mockReturnValue(LOGOUT_ACTION);
  });

  it('ends the session when the API rejects the current access token', () => {
    setAccessToken('expired-token');

    expect(endSessionIfExpired(buildError(401, 'Bearer expired-token'))).toBe(true);
    expect(logout).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(LOGOUT_ACTION);
    expect(displayToast).toHaveBeenCalledWith('Your session has expired. Please sign in again.', ToastType.WARNING);
  });

  it('reads the Authorization header from an axios headers object', () => {
    setAccessToken('expired-token');
    const error = {
      config: {headers: {get: (name: string) => (name === 'Authorization' ? 'Bearer expired-token' : undefined)}},
      response: {status: 401},
    };

    expect(endSessionIfExpired(error)).toBe(true);
    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });

  it('leaves a signed-out visitor alone when they reach for something private', () => {
    setAccessToken(null);

    expect(endSessionIfExpired(buildError(401))).toBe(false);
    expect(store.dispatch).not.toHaveBeenCalled();
    expect(displayToast).not.toHaveBeenCalled();
  });

  it('ignores a late response to a token that was already replaced', () => {
    setAccessToken('fresh-token');

    expect(endSessionIfExpired(buildError(401, 'Bearer expired-token'))).toBe(false);
    expect(store.dispatch).not.toHaveBeenCalled();
  });

  it('ignores a request that was sent without the token', () => {
    setAccessToken('fresh-token');

    expect(endSessionIfExpired(buildError(401))).toBe(false);
    expect(store.dispatch).not.toHaveBeenCalled();
  });

  it.each([400, 403, 404, 500])('keeps the session on a %s response', (status) => {
    setAccessToken('valid-token');

    expect(endSessionIfExpired(buildError(status, 'Bearer valid-token'))).toBe(false);
    expect(store.dispatch).not.toHaveBeenCalled();
  });

  it('keeps the session when the request never got a response', () => {
    setAccessToken('valid-token');

    expect(endSessionIfExpired({code: 'ERR_NETWORK', config: {headers: {Authorization: 'Bearer valid-token'}}})).toBe(
      false,
    );
    expect(store.dispatch).not.toHaveBeenCalled();
  });
});

describe('registerExpiredSessionHandler', () => {
  it('ends an expired session and still rejects the request', async () => {
    setAccessToken('expired-token');
    registerExpiredSessionHandler();

    const [onFulfilled, onRejected] = (axios.interceptors.response.use as jest.Mock).mock.calls[0];
    const error = buildError(401, 'Bearer expired-token');

    expect(onFulfilled).toBeUndefined();
    await expect(onRejected(error)).rejects.toBe(error);
    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });
});
