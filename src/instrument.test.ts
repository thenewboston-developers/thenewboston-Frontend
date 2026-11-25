import * as Sentry from '@sentry/react';
import {TextDecoder, TextEncoder} from 'util';

// The test runner's browser has no TextEncoder, which the SDK needs to send an attachment
Object.assign(global, {TextDecoder, TextEncoder});

const encode = (value: object) =>
  btoa(JSON.stringify(value)).replace(/=+$/, '').replace(/\+/g, '-').replace(/\//g, '_');

const createToken = (claims: object) => `${encode({alg: 'HS256', typ: 'JWT'})}.${encode(claims)}.c2lnbmF0dXJl`;

const TOKEN_PATTERN = /eyJ[\w-]+\.eyJ[\w-]+\.[\w-]*/;

const PERSISTED_ACCESS_TOKEN = createToken({jti: 'persisted', token_type: 'access'});
const PERSISTED_REFRESH_TOKEN = createToken({jti: 'persisted', token_type: 'refresh'});
const ACCESS_TOKEN = createToken({jti: 'signed in', token_type: 'access'});
const REFRESH_TOKEN = createToken({jti: 'signed in', token_type: 'refresh'});
const STRAY_TOKEN = createToken({jti: 'stray', token_type: 'access'});
const GUEST_TOKEN = `${btoa(JSON.stringify('00000000-0000-0000-0000-000000000000')).replace(/=+$/, '')}:abc123:${'s'.repeat(43)}`;

type EnvelopeItem = [object, unknown];

const toText = (envelope: unknown): string =>
  (envelope as [object, EnvelopeItem[]])[1]
    .map(([header, payload]) => {
      const isBinary = ArrayBuffer.isView(payload);
      const body = isBinary ? new TextDecoder().decode(payload as Uint8Array) : JSON.stringify(payload);
      return `${JSON.stringify(header)}\n${body}`;
    })
    .join('\n');

/**
 * Runs the real store under the real Sentry options, with a transport that keeps what would be sent, through what a
 * member's browser does: restore the persisted session, sign in, then report an error and a trace.
 */
describe('what Sentry is given', () => {
  const sent: string[] = [];

  beforeAll(async () => {
    localStorage.setItem(
      'persist:thenewboston',
      JSON.stringify({
        _persist: JSON.stringify({rehydrated: true, version: 3}),
        authentication: JSON.stringify({accessToken: PERSISTED_ACCESS_TOKEN, refreshToken: PERSISTED_REFRESH_TOKEN}),
      }),
    );

    const {sentryOptions} = await import('instrument');
    Sentry.init({
      ...sentryOptions,
      dsn: 'http://public@127.0.0.1:9/1',
      enabled: true,
      // Page load tracing and session replay do not run in the test runner
      integrations: [],
      tracesSampleRate: 1,
      transport: () => ({
        flush: async () => true,
        send: async (envelope) => {
          sent.push(toText(envelope));
          return {};
        },
      }),
    });

    const {persistor, store} = await import('store');
    await new Promise<void>((resolve) => {
      const check = () => persistor.getState().bootstrapped && resolve();
      persistor.subscribe(check);
      check();
    });

    const {setAuthentication} = await import('store/authentication');
    store.dispatch(setAuthentication({accessToken: ACCESS_TOKEN, refreshToken: REFRESH_TOKEN}));

    // A token that got to where nobody expects one: into another part of the state and into a breadcrumb
    const {setSelf} = await import('store/self');
    store.dispatch(setSelf({...store.getState().self, bio: STRAY_TOKEN}));
    Sentry.addBreadcrumb({category: 'console', message: `signed in with ${STRAY_TOKEN}`});
    Sentry.addBreadcrumb({category: 'console', message: `guest capability ${GUEST_TOKEN}`});

    Sentry.captureException(new Error('failed'), {
      attachments: [
        {filename: 'text.txt', data: `Bearer ${STRAY_TOKEN}`},
        {filename: 'binary-secret.txt', data: new TextEncoder().encode(STRAY_TOKEN)},
      ],
    });
    Sentry.startSpan({name: 'page load'}, () => undefined);
    await Sentry.flush(2000);
  });

  it('leaves the tokens in the store, where the app needs them', async () => {
    const {store} = await import('store');

    expect(store.getState().authentication).toEqual({accessToken: ACCESS_TOKEN, refreshToken: REFRESH_TOKEN});
  });

  it('gets an error without a token', () => {
    const error = sent.find((envelope) => envelope.includes('"exception"'));

    // The actions that carried the tokens, the state that holds them and the stray one are all in there
    expect(error).toContain('persist/REHYDRATE');
    expect(error).toContain('authentication/setAuthentication');
    expect(error).toContain('"accessToken":"[Filtered]"');
    expect(error).toContain('signed in with [Filtered]');
    expect(error).toContain('guest capability [Filtered]');
    expect(error).not.toContain(GUEST_TOKEN);
    expect(error).not.toMatch(TOKEN_PATTERN);
  });

  it('gets the state attached to an error without a token', () => {
    const error = sent.find((envelope) => envelope.includes('"exception"'));
    const attachment = error?.slice(error.indexOf('redux_state.json'));

    expect(attachment).toContain('"authentication":{"accessToken":"[Filtered]","refreshToken":"[Filtered]"}');
    expect(attachment).toContain('"bio":"[Filtered]"');
    expect(attachment).not.toMatch(TOKEN_PATTERN);
  });

  it('scrubs text attachments and excludes opaque binary attachments', () => {
    const error = sent.find((envelope) => envelope.includes('"exception"'));

    expect(error).toContain('text.txt');
    expect(error).toContain('Bearer [Filtered]');
    expect(error).not.toContain('binary-secret.txt');
    expect(error).not.toMatch(TOKEN_PATTERN);
  });

  it('gets a trace without a token', () => {
    const trace = sent.find((envelope) => envelope.includes('"type":"transaction"'));

    expect(trace).toContain('authentication/setAuthentication');
    expect(trace).toContain('"accessToken":"[Filtered]"');
    expect(trace).toContain('signed in with [Filtered]');
    expect(trace).toContain('guest capability [Filtered]');
    expect(trace).not.toContain(GUEST_TOKEN);
    expect(trace).not.toMatch(TOKEN_PATTERN);
  });

  // A session replay takes the state and the actions straight from Sentry's scopes, not through the hooks above

  it('is handed the state without the tokens of the session', () => {
    const {contexts} = Sentry.getCurrentScope().getScopeData();

    expect(contexts.state?.state.value.authentication).toEqual({
      accessToken: '[Filtered]',
      refreshToken: '[Filtered]',
    });
  });

  it('is handed the actions without a token', () => {
    const {breadcrumbs} = Sentry.getIsolationScope().getScopeData();
    const actions = breadcrumbs.filter(({category}) => category === 'redux.action');

    expect(actions.map(({data}) => data?.type)).toEqual(
      expect.arrayContaining(['persist/REHYDRATE', 'authentication/setAuthentication', 'self/setSelf']),
    );
    expect(JSON.stringify(actions)).not.toMatch(TOKEN_PATTERN);
  });
});
