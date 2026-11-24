import axios from 'axios';

import {captureAnalyticsEvent, getAnalyticsHeaders} from 'utils/analytics';
import {getGameAttributionHeaders} from 'utils/gameAnalytics';

import {registerApiAnalytics} from './apiAnalytics';

jest.mock('axios', () => ({
  interceptors: {
    request: {eject: jest.fn(), use: jest.fn(() => 1)},
    response: {eject: jest.fn(), use: jest.fn(() => 2)},
  },
  isAxiosError: (error: any) => error?.isAxiosError === true,
  isCancel: (error: any) => error?.code === 'ERR_CANCELED',
}));

jest.mock('utils/analytics', () => ({captureAnalyticsEvent: jest.fn(), getAnalyticsHeaders: jest.fn()}));
jest.mock('utils/gameAnalytics', () => ({captureGameStartRequest: jest.fn(), getGameAttributionHeaders: jest.fn()}));

const API_URL = 'https://api.example.test';
const originalApiUrl = process.env.REACT_APP_API_URL;

const getInterceptors = () => {
  const onRequest = (axios.interceptors.request.use as jest.Mock).mock.calls[0][0];
  const [onResponse, onRejected] = (axios.interceptors.response.use as jest.Mock).mock.calls[0];
  return {onRejected, onRequest, onResponse};
};

describe('API analytics', () => {
  let unregister: () => void;

  beforeEach(() => {
    process.env.REACT_APP_API_URL = API_URL;
    (getAnalyticsHeaders as jest.Mock).mockReturnValue({
      'X-POSTHOG-DISTINCT-ID': 'anonymous',
      'X-POSTHOG-SESSION-ID': 'session',
    });
    (getGameAttributionHeaders as jest.Mock).mockReturnValue({'X-POSTHOG-GAME': 'checkers'});
    (axios.interceptors.request.use as jest.Mock).mockReturnValue(1);
    (axios.interceptors.response.use as jest.Mock).mockReturnValue(2);
    unregister = registerApiAnalytics();
  });

  afterEach(() => {
    unregister();
    jest.restoreAllMocks();
    if (originalApiUrl === undefined) delete process.env.REACT_APP_API_URL;
    else process.env.REACT_APP_API_URL = originalApiUrl;
  });

  it('bridges own-API signup and guest requests without copying credentials into events', () => {
    const {onRequest} = getInterceptors();
    const config = onRequest({
      headers: {'X-Guest-Token': 'private-capability'},
      method: 'post',
      url: `${API_URL}/api/guest-games/session`,
    });
    expect(config.headers).toEqual({
      'X-Guest-Token': 'private-capability',
      'X-POSTHOG-DISTINCT-ID': 'anonymous',
      'X-POSTHOG-GAME': 'checkers',
      'X-POSTHOG-SESSION-ID': 'session',
    });
    expect(captureAnalyticsEvent).not.toHaveBeenCalled();
  });

  it.each(['https://foreign.test/api/users', `${API_URL}/api-private/users`])(
    'never forwards analytics identities to %s',
    (url) => {
      const {onRequest} = getInterceptors();
      const config = onRequest({headers: {'X-POSTHOG-DISTINCT-ID': 'stale'}, method: 'post', url});
      expect(config.headers).toEqual({});
      expect(getAnalyticsHeaders).not.toHaveBeenCalled();
    },
  );

  it('refreshes reused request headers for opt-in, opt-out, then opt-in', () => {
    const {onRequest} = getInterceptors();
    const config = {headers: {}, method: 'get', url: `${API_URL}/api/game-fund`};
    onRequest(config);
    expect(config.headers).toHaveProperty('X-POSTHOG-DISTINCT-ID', 'anonymous');
    (getAnalyticsHeaders as jest.Mock).mockReturnValue({'X-POSTHOG-OPT-OUT': '1'});
    onRequest(config);
    expect(config.headers).toEqual({'X-POSTHOG-OPT-OUT': '1'});
    (getAnalyticsHeaders as jest.Mock).mockReturnValue({
      'X-POSTHOG-DISTINCT-ID': 'new-account',
      'X-POSTHOG-SESSION-ID': 'new-session',
    });
    onRequest(config);
    expect(config.headers).not.toHaveProperty('X-POSTHOG-OPT-OUT');
    expect(config.headers).toHaveProperty('X-POSTHOG-DISTINCT-ID', 'new-account');
  });

  it('reports mutation outcomes without IDs, credentials, query strings, bodies, or response data', () => {
    const {onRequest, onResponse} = getInterceptors();
    jest.spyOn(Date, 'now').mockReturnValueOnce(100).mockReturnValueOnce(175);
    const config = {
      data: {account_number: 'private-account', amount: 900, password: 'private-password'},
      headers: {Authorization: 'Bearer private-token'},
      method: 'post',
      url: `${API_URL}/api/wallets/987/withdraw?private=private-query`,
    };
    const response = {config, data: {deposit_signing_key: 'private-key'}, status: 201};

    expect(onRequest(config)).toBe(config);
    expect(onResponse(response)).toBe(response);
    expect(captureAnalyticsEvent).toHaveBeenNthCalledWith(1, 'api_operation_started', {
      endpoint: '/wallets/:id/withdraw',
      method: 'POST',
      operation: 'wallet_withdraw',
    });
    expect(captureAnalyticsEvent).toHaveBeenNthCalledWith(2, 'api_operation_succeeded', {
      duration_ms: 75,
      endpoint: '/wallets/:id/withdraw',
      method: 'POST',
      operation: 'wallet_withdraw',
      status: 201,
    });
    expect(captureAnalyticsEvent).toHaveBeenCalledTimes(2);
  });

  it.each([
    ['/login', 'sign_in'],
    ['/users', 'sign_up'],
    ['/posts', 'post_create'],
    ['/comments', 'comment_create'],
    ['/exchange-orders', 'exchange_order_create'],
    ['/connect-five/challenges/123/accept', 'game_challenge_accept'],
  ])('assigns a static operation to %s', (path, operation) => {
    const {onRequest} = getInterceptors();
    onRequest({method: 'post', url: `${API_URL}/api${path}`});

    expect(captureAnalyticsEvent).toHaveBeenCalledWith('api_operation_started', expect.objectContaining({operation}));
  });

  it('reports a read failure without forwarding the error or changing its rejection', async () => {
    const {onRejected, onRequest} = getInterceptors();
    const config = onRequest({method: 'get', url: `${API_URL}/api/posts?user=private-user`});
    const error = {
      config,
      isAxiosError: true,
      message: 'private-message',
      response: {data: {detail: 'private-detail'}, status: 503},
    };

    await expect(onRejected(error)).rejects.toBe(error);
    expect(captureAnalyticsEvent).toHaveBeenCalledTimes(1);
    expect(captureAnalyticsEvent).toHaveBeenCalledWith('api_operation_failed', {
      duration_ms: expect.any(Number),
      endpoint: '/posts',
      method: 'GET',
      operation: 'feed_load',
      status: 503,
    });
  });

  it('does not count successful background reads as user actions', () => {
    const {onRequest, onResponse} = getInterceptors();
    const config = onRequest({method: 'get', url: `${API_URL}/api/posts`});
    onResponse({config, status: 200});

    expect(captureAnalyticsEvent).not.toHaveBeenCalled();
  });

  it('tracks search completion without search terms or returned users', () => {
    const {onRequest, onResponse} = getInterceptors();
    const config = onRequest({
      method: 'get',
      params: {q: 'private-query'},
      url: `${API_URL}/api/users/search?q=private-query`,
    });
    onResponse({config, data: [{username: 'private-user'}], status: 200});

    expect(captureAnalyticsEvent).toHaveBeenLastCalledWith('api_operation_succeeded', {
      duration_ms: expect.any(Number),
      endpoint: '/users/search',
      method: 'GET',
      operation: 'user_search',
      status: 200,
    });
  });

  it.each([
    'https://other.example.test/api/posts',
    'https://api.example.test.attacker.test/api/posts',
    `${API_URL}/api/posts/private-slug`,
    `${API_URL}/api/unknown`,
    `${API_URL}/api-private/posts`,
    'http://[invalid',
  ])('ignores foreign or non-allowlisted URLs: %s', (url) => {
    const {onRequest, onResponse} = getInterceptors();
    const config = onRequest({method: 'post', url});
    onResponse({config, status: 200});

    expect(captureAnalyticsEvent).not.toHaveBeenCalled();
  });

  it('does not register duplicate interceptors and ejects both on cleanup', () => {
    expect(registerApiAnalytics()).toBe(unregister);
    expect(axios.interceptors.request.use).toHaveBeenCalledTimes(1);
    expect(axios.interceptors.response.use).toHaveBeenCalledTimes(1);
    unregister();
    expect(axios.interceptors.request.eject).toHaveBeenCalledWith(1);
    expect(axios.interceptors.response.eject).toHaveBeenCalledWith(2);
  });

  it.each([
    ['ERR_NETWORK', 'api_operation_failed'],
    ['ERR_CANCELED', 'api_operation_cancelled'],
  ])('distinguishes %s without forwarding error details', async (code, event) => {
    const {onRejected, onRequest} = getInterceptors();
    const config = onRequest({method: 'post', url: `${API_URL}/api/login`});
    const error = {code, config, isAxiosError: true, message: 'private-message'};

    await expect(onRejected(error)).rejects.toBe(error);
    expect(captureAnalyticsEvent).toHaveBeenLastCalledWith(event, {
      duration_ms: expect.any(Number),
      endpoint: '/login',
      method: 'POST',
      operation: 'sign_in',
      status: null,
    });
  });

  it('ignores requests when the API origin is unconfigured', () => {
    delete process.env.REACT_APP_API_URL;
    const {onRequest} = getInterceptors();
    onRequest({method: 'post', url: `${API_URL}/api/posts`});

    expect(captureAnalyticsEvent).not.toHaveBeenCalled();
  });
});
