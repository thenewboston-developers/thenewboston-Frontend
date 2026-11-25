import {CaptureResult} from 'posthog-js';

jest.mock('posthog-js', () => ({
  __esModule: true,
  default: {
    capture: jest.fn(),
    get_distinct_id: jest.fn(),
    get_property: jest.fn(),
    get_session_id: jest.fn(),
    has_opted_out_capturing: jest.fn(),
    identify: jest.fn(),
    init: jest.fn(),
    register: jest.fn(),
    reset: jest.fn(),
  },
}));

type Analytics = typeof import('./analytics');
interface MockPostHog {
  capture: jest.Mock;
  get_distinct_id: jest.Mock;
  get_property: jest.Mock;
  get_session_id: jest.Mock;
  has_opted_out_capturing: jest.Mock;
  identify: jest.Mock;
  init: jest.Mock;
  register: jest.Mock;
  reset: jest.Mock;
}

const originalEnvironment = process.env;
const buildEvent = (properties: Record<string, any>, event = 'test_event'): CaptureResult => ({
  event,
  properties,
  uuid: '00000000-0000-0000-0000-000000000001',
});

let analytics: Analytics;
let posthog: MockPostHog;

beforeEach(() => {
  window.localStorage.clear();
  process.env = {
    ...originalEnvironment,
    NODE_ENV: 'production',
    REACT_APP_POSTHOG_HOST: 'https://e.thenewboston.net',
    REACT_APP_POSTHOG_KEY: 'phc_public-project-token',
    REACT_APP_POSTHOG_UI_HOST: 'https://us.posthog.com',
  };
  jest.isolateModules(() => {
    // Each test gets fresh initialization and identity state, as on a new page load.
    // eslint-disable-next-line @typescript-eslint/no-var-requires, global-require
    analytics = require('./analytics');
    // eslint-disable-next-line @typescript-eslint/no-var-requires, global-require
    posthog = require('posthog-js').default;
  });
  posthog.get_distinct_id.mockReturnValue('anonymous-browser');
  posthog.get_session_id.mockReturnValue('analytics-session');
  posthog.has_opted_out_capturing.mockReturnValue(false);
});

afterEach(() => {
  process.env = originalEnvironment;
  jest.restoreAllMocks();
});

describe('API analytics identity headers', () => {
  it('sends only explicit opt-out when analytics is unavailable', () => {
    expect(analytics.getAnalyticsHeaders()).toEqual({'X-POSTHOG-OPT-OUT': '1'});
  });

  it('bridges anonymous/session IDs and the sticky staff flag without account credentials', () => {
    analytics.initializeAnalytics();
    analytics.syncAnalyticsIdentity('42', true);
    expect(analytics.getAnalyticsHeaders()).toEqual({
      'X-POSTHOG-DISTINCT-ID': 'anonymous-browser',
      'X-POSTHOG-INTERNAL-TRAFFIC': '1',
      'X-POSTHOG-SESSION-ID': 'analytics-session',
    });
  });

  it('propagates SDK opt-out and browser DNT without reading identity', () => {
    analytics.initializeAnalytics();
    posthog.has_opted_out_capturing.mockReturnValue(true);
    expect(analytics.getAnalyticsHeaders()).toEqual({'X-POSTHOG-OPT-OUT': '1'});
    posthog.has_opted_out_capturing.mockReturnValue(false);
    Object.defineProperty(navigator, 'doNotTrack', {configurable: true, value: '1'});
    expect(analytics.getAnalyticsHeaders()).toEqual({'X-POSTHOG-OPT-OUT': '1'});
    expect(posthog.get_distinct_id).not.toHaveBeenCalled();
    Object.defineProperty(navigator, 'doNotTrack', {configurable: true, value: undefined});
  });

  it('fails closed if the SDK cannot supply identity', () => {
    analytics.initializeAnalytics();
    posthog.get_session_id.mockImplementationOnce(() => {
      throw new Error('unavailable');
    });
    expect(analytics.getAnalyticsHeaders()).toEqual({'X-POSTHOG-OPT-OUT': '1'});
  });
});

describe('analytics initialization and identity', () => {
  it('initializes once with separate proxy and UI hosts and disables automatic pageviews', () => {
    analytics.initializeAnalytics();
    analytics.initializeAnalytics();

    expect(posthog.init).toHaveBeenCalledTimes(1);
    expect(posthog.init).toHaveBeenCalledWith(
      'phc_public-project-token',
      expect.objectContaining({
        api_host: 'https://e.thenewboston.net',
        capture_pageview: false,
        ui_host: 'https://us.posthog.com',
      }),
    );
  });

  it.each(['REACT_APP_POSTHOG_HOST', 'REACT_APP_POSTHOG_KEY', 'REACT_APP_POSTHOG_UI_HOST'])(
    'does nothing when %s is missing',
    (variable) => {
      delete process.env[variable];
      analytics.initializeAnalytics();
      analytics.captureAnalyticsEvent('post_create');
      analytics.syncAnalyticsIdentity('42');

      expect(posthog.init).not.toHaveBeenCalled();
      expect(posthog.capture).not.toHaveBeenCalled();
      expect(posthog.identify).not.toHaveBeenCalled();
      expect(posthog.reset).not.toHaveBeenCalled();
    },
  );

  it.each<'development' | 'test'>(['development', 'test'])('does not initialize in %s', (environment) => {
    process.env = {...process.env, NODE_ENV: environment};
    analytics.initializeAnalytics();

    expect(posthog.init).not.toHaveBeenCalled();
  });

  it('allows initialization to retry after a blocked SDK without breaking the app', () => {
    posthog.init.mockImplementationOnce(() => {
      throw new Error('blocked');
    });
    expect(() => analytics.initializeAnalytics()).not.toThrow();
    analytics.captureAnalyticsEvent('post_create');
    expect(posthog.capture).not.toHaveBeenCalled();

    analytics.initializeAnalytics();
    analytics.captureAnalyticsEvent('post_create', {operation: 'post_create'});
    expect(posthog.init).toHaveBeenCalledTimes(2);
    expect(posthog.capture).toHaveBeenCalledWith('post_create', {operation: 'post_create'});
  });

  it('does not let capture failures interrupt user actions', () => {
    analytics.initializeAnalytics();
    posthog.capture.mockImplementation(() => {
      throw new Error('unavailable');
    });

    expect(() => analytics.captureAnalyticsEvent('post_create')).not.toThrow();
  });

  it('links an anonymous visitor to a stable account ID only once', () => {
    analytics.initializeAnalytics();
    analytics.syncAnalyticsIdentity(null);
    analytics.syncAnalyticsIdentity('42');
    analytics.syncAnalyticsIdentity('42');

    expect(posthog.identify).toHaveBeenCalledTimes(1);
    expect(posthog.identify).toHaveBeenCalledWith('42');
    expect(posthog.reset).not.toHaveBeenCalled();
  });

  it('resets a persisted identified visitor before signed-out browsing', () => {
    posthog.get_property.mockReturnValueOnce('previous-account');
    analytics.initializeAnalytics();
    analytics.syncAnalyticsIdentity(null);
    analytics.syncAnalyticsIdentity(null);

    expect(posthog.get_property).toHaveBeenCalledWith('$user_id');
    expect(posthog.reset).toHaveBeenCalledTimes(1);
    expect(posthog.reset).toHaveBeenCalledWith(true);
    expect(posthog.identify).not.toHaveBeenCalled();
  });

  it('resets the device identity when a member signs out', () => {
    analytics.initializeAnalytics();
    analytics.syncAnalyticsIdentity('42');
    analytics.syncAnalyticsIdentity(null);
    analytics.syncAnalyticsIdentity(null);

    expect(posthog.reset).toHaveBeenCalledTimes(1);
    expect(posthog.reset).toHaveBeenCalledWith(true);
    expect(posthog.identify).toHaveBeenCalledTimes(1);
  });

  it('resets before switching accounts so the next member is not aliased to the previous member', () => {
    analytics.initializeAnalytics();
    analytics.syncAnalyticsIdentity('42');
    analytics.syncAnalyticsIdentity('43');

    expect(posthog.reset).toHaveBeenCalledTimes(1);
    expect(posthog.identify).toHaveBeenNthCalledWith(2, '43');
    expect(posthog.reset.mock.invocationCallOrder[0]).toBeLessThan(posthog.identify.mock.invocationCallOrder[1]);
  });

  it('resets a persisted previous account before identifying another account on page load', () => {
    posthog.get_property.mockReturnValue('previous-account');
    analytics.initializeAnalytics();
    analytics.syncAnalyticsIdentity('42');

    expect(posthog.reset).toHaveBeenCalledWith(true);
    expect(posthog.identify).toHaveBeenCalledWith('42');
    expect(posthog.reset.mock.invocationCallOrder[0]).toBeLessThan(posthog.identify.mock.invocationCallOrder[0]);
  });

  it('labels staff activity as internal, including signed-out browsing afterwards in the same browser', () => {
    analytics.initializeAnalytics();
    analytics.syncAnalyticsIdentity('42', true);
    expect(posthog.register).toHaveBeenLastCalledWith({internal_traffic: true});
    expect(posthog.identify.mock.invocationCallOrder[0]).toBeLessThan(posthog.register.mock.invocationCallOrder[0]);

    analytics.syncAnalyticsIdentity(null);
    expect(posthog.register).toHaveBeenCalledTimes(2);
    expect(posthog.reset.mock.invocationCallOrder[0]).toBeLessThan(posthog.register.mock.invocationCallOrder[1]);
  });

  it('does not label members or anonymous visitors as internal', () => {
    analytics.initializeAnalytics();
    analytics.syncAnalyticsIdentity(null);
    analytics.syncAnalyticsIdentity('42');
    analytics.syncAnalyticsIdentity('42', false);

    expect(posthog.register).not.toHaveBeenCalled();
  });

  it('does not let an identity failure affect authentication and retries on the next synchronization', () => {
    analytics.initializeAnalytics();
    posthog.identify.mockImplementationOnce(() => {
      throw new Error('unavailable');
    });

    expect(() => analytics.syncAnalyticsIdentity('42')).not.toThrow();
    analytics.syncAnalyticsIdentity('42');
    expect(posthog.identify).toHaveBeenCalledTimes(2);
  });
});

describe('analytics data sanitization', () => {
  it.each([
    ['/', '/'],
    ['/profile/123?token=private#private', '/profile/:id'],
    ['/posts/123/', '/posts/:id'],
    ['/connect-five/matches/456', '/connect-five/matches/:id'],
    ['/exchange/trade/789', '/exchange/trade/:id'],
    ['/plinko/home?request=private#receipt', '/plinko/home'],
    ['/slots/home?request=private#receipt', '/slots/home'],
    ['/roulette/home?request=private#receipt', '/roulette/home'],
    ['/blackjack/home?request=private#receipt', '/blackjack/home'],
    ['/unknown/private-value', '/other'],
    ['/feed', '/other'],
    ['http://[invalid', '/other'],
  ])('normalizes %s without user identifiers', (path, expected) => {
    expect(analytics.getAnalyticsPath(path)).toBe(expected);
  });

  it.each([
    ['/exchange', true],
    ['/currencies/', true],
    ['/connect-five?token=private', true],
    ['/wallets', true],
    ['/plinko', true],
    ['/casino/plinko', true],
    ['/plinko/home', false],
    ['/slots', true],
    ['/roulette', true],
    ['/blackjack', true],
    ['/casino/blackjack', true],
    ['/casino/slots?source=bookmark#receipt', true],
    ['/casino/roulette', true],
    ['/slots/home', false],
    ['/roulette/home', false],
    ['/blackjack/home', false],
    ['/feed', true],
    ['/exchange/home', false],
    ['/', false],
    ['/unknown', false],
    ['http://[invalid', false],
  ])('recognizes whether %s only redirects to a real page', (path, expected) => {
    expect(analytics.isAnalyticsRedirectPath(path)).toBe(expected);
  });

  it('removes secrets from same-origin and external URLs', () => {
    expect(analytics.sanitizeAnalyticsUrl(`${window.location.origin}/profile/123?token=private#private`)).toBe(
      `${window.location.origin}/profile/:id`,
    );
    expect(analytics.sanitizeAnalyticsUrl('https://user:password@example.test/private/path?q=secret#secret')).toBe(
      'https://example.test',
    );
  });

  it('preserves ingestion and identity fields while scrubbing captured URLs, text, and attributes', () => {
    const event = buildEvent({
      $current_url: `${window.location.origin}/posts/123?token=private-query#private`,
      $device_id: 'anonymous-device',
      $elements: [{attr__href: 'private-link', tag_name: 'button', text: 'private-text'}],
      $pathname: '/posts/123',
      $session_id: 'session-id',
      distinct_id: 'account-id',
      duration_ms: 30,
      endpoint: '/posts/:id',
      password: 'private-password',
      token: 'phc_public-project-token',
    });
    const result = analytics.sanitizeAnalyticsEvent(event);

    expect(result).toEqual({
      ...event,
      properties: {
        $current_url: `${window.location.origin}/posts/:id`,
        $device_id: 'anonymous-device',
        $elements: [{tag_name: 'button'}],
        $pathname: '/posts/:id',
        $session_id: 'session-id',
        distinct_id: 'account-id',
        duration_ms: 30,
        endpoint: '/posts/:id',
        token: 'phc_public-project-token',
      },
    });
    expect(event.properties.password).toBe('private-password');
  });

  it('reports the referring site without its path and keeps direct visits recognizable', () => {
    const event = buildEvent({
      $referrer: 'https://www.example.test/watch?v=private#private',
      $referring_domain: 'www.example.test',
      $session_entry_referrer: '$direct',
      $session_entry_referring_domain: '$direct',
    });
    event.$set_once = {$initial_referrer: '$direct', $initial_referring_domain: '$direct'};

    expect(analytics.sanitizeAnalyticsEvent(event)).toEqual({
      ...event,
      properties: {
        $referrer: 'https://www.example.test',
        $referring_domain: 'www.example.test',
        $session_entry_referrer: '$direct',
        $session_entry_referring_domain: '$direct',
      },
    });
    expect(analytics.analyticsConfig.save_referrer).toBe(true);
    expect(analytics.analyticsConfig.save_campaign_params).toBe(false);
  });

  it('keeps click names on autocaptured events', () => {
    const event = buildEvent({click_area: 'navigation', click_target: 'games'}, '$autocapture');

    expect(analytics.sanitizeAnalyticsEvent(event)).toEqual(event);
  });

  it('measures scroll depth in the container a page scrolls in, then the main area, then the document', () => {
    expect(analytics.analyticsConfig.scroll_root_selector).toEqual([
      '.analytics-scroll-root',
      '#main-scrollable-area',
      'html',
    ]);
  });

  it('scrubs person properties and nested credentials without removing the top-level ingestion token', () => {
    const event = buildEvent({
      token: 'phc_public-project-token',
      nested: {token: 'private-token', password: 'private-password'},
    });
    event.$set = {email: 'private-email', token: 'private-token', account_type: 'member'};
    event.$set_once = {
      $initial_current_url: `${window.location.origin}/sign-in?password=private`,
      username: 'private-user',
    };

    expect(analytics.sanitizeAnalyticsEvent(event)).toEqual({
      ...event,
      properties: {token: 'phc_public-project-token', nested: {}},
      $set: {account_type: 'member'},
      $set_once: {$initial_current_url: `${window.location.origin}/sign-in`},
    });
  });

  it('drops exceptions and keeps null events dropped', () => {
    expect(analytics.sanitizeAnalyticsEvent(buildEvent({message: 'private-error'}, '$exception'))).toBeNull();
    expect(analytics.sanitizeAnalyticsEvent(null)).toBeNull();
  });

  it('preserves recorder data while sanitizing the snapshot envelope', () => {
    const recorderData = [{data: 'compressed-payload', type: 3}];
    const snapshot = buildEvent(
      {
        $current_url: `${window.location.origin}/posts/123?token=private`,
        $snapshot_data: recorderData,
        token: 'phc_public-project-token',
      },
      '$snapshot',
    );
    const sanitized = analytics.sanitizeAnalyticsEvent(snapshot);

    expect(sanitized?.properties.$snapshot_data).toBe(recorderData);
    expect(sanitized?.properties.token).toBe('phc_public-project-token');
    expect(sanitized?.properties.$current_url).toBe(`${window.location.origin}/posts/:id`);
  });

  it('masks replay inputs, text, sensitive media, and arbitrary attribute values', () => {
    const config = analytics.analyticsConfig;
    const replay = config.session_recording!;
    expect(replay.maskAllInputs).toBe(true);
    expect(replay.maskTextSelector).toBe('*');
    expect(replay.recordBody).toBe(false);
    expect(replay.recordHeaders).toBe(false);
    expect(config.enable_recording_console_log).toBe(false);
    expect(config.capture_exceptions).toBe(false);
    expect(replay.maskAttributeFn?.('data-private', 'private-value')).toBe('');
    expect(
      replay.maskAttributeFn?.('style', 'background-image: url(https://example.test/private); color: red;'),
    ).not.toContain('private');
    for (const tagName of ['img', 'canvas', 'video', 'audio', 'iframe']) {
      expect(document.createElement(tagName).matches(replay.blockSelector!)).toBe(true);
    }
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    expect(fileInput.matches(replay.blockSelector!)).toBe(true);
  });
});
