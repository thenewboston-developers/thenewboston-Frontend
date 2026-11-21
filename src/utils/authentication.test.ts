import {PATH_AUTHENTICATION, PATH_HOME} from 'constants/paths';
import {store} from 'store';

import {
  authorizationFormHeaders,
  authorizationHeaders,
  getAuthenticationPath,
  getLocationPath,
  getNextPath,
} from './authentication';

jest.mock('store', () => ({
  store: {getState: jest.fn()},
}));

const setAccessToken = (accessToken: string | null) => {
  (store.getState as jest.Mock).mockReturnValue({authentication: {accessToken, refreshToken: null}});
};

describe('authorization headers', () => {
  it('sends the access token of a signed-in member', () => {
    setAccessToken('local-test-token');

    expect(authorizationHeaders()).toEqual({headers: {Authorization: 'Bearer local-test-token'}});
    expect(authorizationFormHeaders()).toEqual({
      headers: {Authorization: 'Bearer local-test-token', 'Content-Type': 'multipart/form-data'},
    });
  });

  it('sends no Authorization header for a signed-out visitor', () => {
    setAccessToken(null);

    expect(authorizationHeaders()).toEqual({headers: {}});
    expect(authorizationFormHeaders()).toEqual({headers: {'Content-Type': 'multipart/form-data'}});
  });
});

describe('getAuthenticationPath', () => {
  it('returns the visitor to the page they were on', () => {
    expect(getAuthenticationPath(PATH_AUTHENTICATION.SIGN_IN, '/posts/59')).toBe('/sign-in?next=%2Fposts%2F59');
    expect(getAuthenticationPath(PATH_AUTHENTICATION.CREATE_ACCOUNT, '/exchange/trade/1?tab=sell#book')).toBe(
      '/create-account?next=%2Fexchange%2Ftrade%2F1%3Ftab%3Dsell%23book',
    );
  });

  it('leaves out the home page and a missing path', () => {
    expect(getAuthenticationPath(PATH_AUTHENTICATION.SIGN_IN, PATH_HOME)).toBe('/sign-in');
    expect(getAuthenticationPath(PATH_AUTHENTICATION.SIGN_IN, null)).toBe('/sign-in');
  });

  it('round trips through getNextPath', () => {
    const nextPath = '/exchange/trade/1?tab=sell#book';
    const authenticationPath = getAuthenticationPath(PATH_AUTHENTICATION.SIGN_IN, nextPath);

    expect(getNextPath(authenticationPath.slice(authenticationPath.indexOf('?')))).toBe(nextPath);
  });
});

describe('getLocationPath', () => {
  it('joins the path, query string and hash', () => {
    expect(getLocationPath({hash: '#book', pathname: '/exchange/trade/1', search: '?tab=sell'})).toBe(
      '/exchange/trade/1?tab=sell#book',
    );
    expect(getLocationPath({hash: '', pathname: '/', search: ''})).toBe('/');
  });
});

describe('getNextPath', () => {
  it('reads a path inside the app', () => {
    expect(getNextPath('?next=%2Fnotifications')).toBe('/notifications');
    expect(getNextPath('?other=1&next=/profile/5/photos')).toBe('/profile/5/photos');
  });

  it('ignores a missing path', () => {
    expect(getNextPath('')).toBeNull();
    expect(getNextPath('?next=')).toBeNull();
  });

  it.each([
    'https://evil.example/phishing',
    '//evil.example/phishing',
    '/\\evil.example/phishing',
    'evil.example',
    // eslint-disable-next-line no-script-url
    'javascript:alert(1)',
  ])('ignores %s so a crafted link cannot leave the app', (nextPath) => {
    expect(getNextPath(`?next=${encodeURIComponent(nextPath)}`)).toBeNull();
  });
});
