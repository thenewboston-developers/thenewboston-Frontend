import {hideTokens} from './sentry';

const encode = (value: object) =>
  btoa(JSON.stringify(value)).replace(/=+$/, '').replace(/\+/g, '-').replace(/\//g, '_');

const HEADER = encode({alg: 'HS256', typ: 'JWT'});
const PAYLOAD = encode({token_type: 'access', user_id: 5});
const TOKEN = `${HEADER}.${PAYLOAD}.c2lnbmF0dXJl`;

describe('hideTokens', () => {
  it.each([
    [TOKEN, '[Filtered]'],
    [`${HEADER}.${PAYLOAD}.`, '[Filtered]'],
    [`Bearer ${TOKEN}`, 'Bearer [Filtered]'],
    [`${TOKEN} ${TOKEN}`, '[Filtered] [Filtered]'],
    [`{"accessToken":"${TOKEN}"}`, '{"accessToken":"[Filtered]"}'],
  ])('replaces the token in %s', (value, expected) => {
    expect(hideTokens(value)).toBe(expected);
  });

  it('finds a token however deep it sits', () => {
    const action = {
      payload: {authentication: {accessToken: TOKEN, refreshToken: TOKEN}, self: {id: 5}},
      type: 'persist/REHYDRATE',
    };
    const breadcrumbs = [
      {category: 'redux.action', data: action},
      {category: 'navigation', data: {to: '/'}},
    ];

    expect(hideTokens(breadcrumbs)).toEqual([
      {
        category: 'redux.action',
        data: {
          payload: {authentication: {accessToken: '[Filtered]', refreshToken: '[Filtered]'}, self: {id: 5}},
          type: 'persist/REHYDRATE',
        },
      },
      {category: 'navigation', data: {to: '/'}},
    ]);
  });

  it('leaves the value it is given as it is', () => {
    const action = {payload: {accessToken: TOKEN}, type: 'authentication/setAuthentication'};

    hideTokens(action);

    expect(action).toEqual({payload: {accessToken: TOKEN}, type: 'authentication/setAuthentication'});
  });

  it('returns a value without a token as it is, not a copy of it', () => {
    const action = {payload: [{id: 1, owner: {id: 5}}], type: 'posts/setPosts'};

    expect(hideTokens(action)).toBe(action);
  });

  it('copies only what leads to a token', () => {
    const untouched = {id: 5};
    const state = {authentication: {accessToken: TOKEN}, self: untouched};

    expect(hideTokens(state).self).toBe(untouched);
  });

  it.each([
    ['eyJ'],
    [HEADER],
    [`${HEADER}.not-a-payload.c2lnbmF0dXJl`],
    ['thenewboston.network'],
    [''],
    [null],
    [undefined],
    [5],
    [true],
  ])('leaves %p alone', (value) => {
    expect(hideTokens(value)).toBe(value);
  });

  it('filters opaque objects and preserves dates', () => {
    const error = Object.assign(new Error('failed'), {config: {headers: {Authorization: `Bearer ${TOKEN}`}}});
    const date = new Date(0);

    expect(hideTokens(error)).toBe('[Filtered]');
    expect(hideTokens(date)).toBe('1970-01-01T00:00:00.000Z');
  });

  it('redacts tokens used as object keys', () => {
    expect(hideTokens({[TOKEN]: 'value'})).toEqual({'[Filtered]': 'value'});
  });

  it.each('0123456789abcdef'.split(''))('redacts Django guest capabilities starting with %s', (first) => {
    const uuid = `${first}0000000-0000-0000-0000-000000000000`;
    const guestToken = `${btoa(JSON.stringify(uuid)).replace(/=+$/, '')}:abc123:${'s'.repeat(43)}`;

    expect(hideTokens(`guest=${guestToken}`)).toBe('guest=[Filtered]');
    expect(hideTokens({[guestToken]: 'value'})).toEqual({'[Filtered]': 'value'});
  });

  it('redacts guest credentials in object headers and header pairs', () => {
    expect(
      hideTokens({'X-Guest-Token': 'opaque-capability', guest_token: 'opaque-capability', token: 'opaque'}),
    ).toEqual({
      'X-Guest-Token': '[Filtered]',
      guest_token: '[Filtered]',
      token: '[Filtered]',
    });
    expect(hideTokens([['X-Guest-Token', 'opaque-capability']])).toEqual([['X-Guest-Token', '[Filtered]']]);
  });

  it('does not allow a custom serializer to reintroduce credentials', () => {
    const value = {toJSON: () => ({accessToken: TOKEN})};
    expect(JSON.stringify(hideTokens(value))).not.toContain(TOKEN);
  });

  it('redacts credential fields even when their values are not JWTs', () => {
    expect(
      hideTokens({
        access_token: 'opaque-access',
        refreshToken: 'opaque-refresh',
        headers: {Authorization: 'Bearer opaque-access', 'Sec-WebSocket-Protocol': 'access_token, opaque-access'},
      }),
    ).toEqual({
      access_token: '[Filtered]',
      refreshToken: '[Filtered]',
      headers: {Authorization: '[Filtered]', 'Sec-WebSocket-Protocol': '[Filtered]'},
    });
  });

  it('omits deeply nested values instead of returning an unsanitized subtree', () => {
    let value: object = {credential: TOKEN};
    for (let depth = 0; depth < 40; depth += 1) value = {nested: value};

    const filtered = JSON.stringify(hideTokens(value));
    expect(filtered).toContain('[Filtered]');
    expect(filtered).not.toContain(TOKEN);
    expect(JSON.stringify(value)).toContain(TOKEN);
  });

  it('gets out of a value that contains itself', () => {
    const value: Record<string, unknown> = {accessToken: TOKEN};
    value.self = value;

    expect(hideTokens(value)).toEqual({accessToken: '[Filtered]', self: '[Filtered]'});
  });
});

describe('authentication state redaction', () => {
  it('replaces the tokens of a session', () => {
    const state = {authentication: {accessToken: 'anything', refreshToken: TOKEN}, self: {id: 5}};

    expect(hideTokens(state)).toEqual({
      authentication: {accessToken: '[Filtered]', refreshToken: '[Filtered]'},
      self: {id: 5},
    });
    expect(state.authentication.accessToken).toBe('anything');
  });

  it('shows that there is no session', () => {
    const state = {authentication: {accessToken: null, refreshToken: null}};

    expect(hideTokens(state)).toEqual({authentication: {accessToken: null, refreshToken: null}});
  });
});
