import {act} from 'react';
import {createRoot, Root} from 'react-dom/client';
import {useSelector} from 'react-redux';

import WebSocket from 'containers/WebSocket';
import {useIsAuthenticated} from 'hooks';

import App from './index';

jest.mock('react-redux', () => ({useSelector: jest.fn()}));
jest.mock('react-router-dom', () => ({matchPath: () => false, useLocation: () => ({pathname: '/'})}));
jest.mock('react-toastify', () => ({Flip: undefined, ToastContainer: () => null}));
jest.mock('components/DeploymentNotification', () => () => null);
jest.mock('containers/FrontendDeploymentWebSocket', () => () => null);
jest.mock('containers/WebSocket', () => jest.fn(() => null));
jest.mock('hooks', () => ({useDeploymentPolling: () => undefined, useIsAuthenticated: jest.fn()}));
jest.mock('layouts/Main', () => () => null);
jest.mock('layouts/Unauthenticated', () => () => null);
jest.mock('modals/AuthPromptModal', () => () => null);

describe('private user WebSockets', () => {
  let root: Root;

  const renderSession = (accessToken: string | null, userId: number | null) => {
    const state = {authentication: {accessToken, refreshToken: null}, self: {id: userId}};
    (useSelector as unknown as jest.Mock).mockImplementation((selector) => selector(state));
    (useIsAuthenticated as jest.Mock).mockReturnValue(!!accessToken && !!userId);
    act(() => root.render(<App />));
  };

  beforeEach(() => {
    (globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;
    root = createRoot(document.createElement('div'));
  });

  afterEach(() => {
    act(() => root.unmount());
  });

  it('authenticates all three user-specific streams with the current access token', () => {
    renderSession('current-token', 5);

    expect((WebSocket as jest.Mock).mock.calls.map(([props]) => props)).toEqual([
      {accessToken: 'current-token', url: `${process.env.REACT_APP_WS_URL}/ws/connect-five/5`},
      {accessToken: 'current-token', url: `${process.env.REACT_APP_WS_URL}/ws/notifications/5`},
      {accessToken: 'current-token', url: `${process.env.REACT_APP_WS_URL}/ws/wallet/5`},
    ]);
  });

  it.each([
    [null, null],
    [null, 5],
    ['token', null],
  ])('does not open private streams with token=%s and user=%s', (token, user) => {
    renderSession(token as string | null, user as number | null);

    expect(WebSocket).not.toHaveBeenCalled();
  });
});
