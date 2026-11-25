import {act, StrictMode} from 'react';
import {createRoot, Root} from 'react-dom/client';
import {useStore} from 'react-redux';
import ReconnectingWebSocket from 'reconnecting-websocket';

import rootRouter from 'routers/rootRouter';

import WebSocket, {WebSocketProps} from './index';

jest.mock('react-redux', () => {
  // The same function on every render, like the dispatch of a real store
  const dispatch = () => undefined;
  return {useDispatch: () => dispatch, useStore: jest.fn()};
});
jest.mock('reconnecting-websocket');
jest.mock('routers/rootRouter', () => jest.fn());
// The store pulls in modules the test runner cannot load, and the container never reads it
jest.mock('store', () => ({store: {}}));

const URL = 'ws://127.0.0.1:8000/ws/wallet/5';

const sockets = () => (ReconnectingWebSocket as unknown as jest.Mock).mock.instances;

describe('WebSocket', () => {
  let root: Root;
  let currentAccessToken: string | null;
  const store = {getState: () => ({authentication: {accessToken: currentAccessToken}})};

  const render = (props: WebSocketProps) => {
    currentAccessToken = props.accessToken || null;
    act(() => root.render(<WebSocket {...props} />));
  };

  beforeEach(() => {
    (globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;
    currentAccessToken = 'token-1';
    (useStore as unknown as jest.Mock).mockReturnValue(store);
    root = createRoot(document.createElement('div'));
  });

  afterEach(() => {
    act(() => root.unmount());
  });

  it('offers the access token as a subprotocol', () => {
    render({accessToken: 'token-1', url: URL});

    expect(ReconnectingWebSocket).toHaveBeenCalledTimes(1);
    expect(ReconnectingWebSocket).toHaveBeenCalledWith(URL, ['access_token', 'token-1']);
  });

  it('offers no subprotocol on a socket that is open to everyone', () => {
    render({url: URL});

    expect(ReconnectingWebSocket).toHaveBeenCalledTimes(1);
    expect(ReconnectingWebSocket).toHaveBeenCalledWith(URL, undefined);
  });

  it('keeps the socket while the session stays the same', () => {
    render({accessToken: 'token-1', url: URL});
    render({accessToken: 'token-1', url: URL});

    expect(ReconnectingWebSocket).toHaveBeenCalledTimes(1);
    expect(sockets()[0].close).not.toHaveBeenCalled();
  });

  it('replaces the socket when the token changes, so that a reconnect cannot offer the old one', () => {
    render({accessToken: 'token-1', url: URL});
    render({accessToken: 'token-2', url: URL});

    const [firstSocket, secondSocket] = sockets();

    expect(ReconnectingWebSocket).toHaveBeenCalledTimes(2);
    expect(ReconnectingWebSocket).toHaveBeenLastCalledWith(URL, ['access_token', 'token-2']);
    expect(firstSocket.close).toHaveBeenCalledTimes(1);
    expect(secondSocket.close).not.toHaveBeenCalled();
  });

  it('keeps one live connection through a StrictMode effect remount', () => {
    act(() =>
      root.render(
        <StrictMode>
          <WebSocket accessToken="token-1" url={URL} />
        </StrictMode>,
      ),
    );

    expect(ReconnectingWebSocket).toHaveBeenCalledTimes(2);
    const [discarded, active] = sockets();
    expect(discarded.close).toHaveBeenCalledTimes(1);
    expect(discarded.onmessage).toBeNull();
    expect(active.close).not.toHaveBeenCalled();
  });

  it('ignores messages queued by a previous session after token replacement', () => {
    render({accessToken: 'token-1', url: URL});
    const oldMessage = sockets()[0].onmessage;
    render({accessToken: 'token-2', url: URL});
    const event = {data: '{}'};

    oldMessage(event);
    expect(rootRouter).not.toHaveBeenCalled();
    sockets()[1].onmessage(event);
    expect(rootRouter).toHaveBeenCalledTimes(1);
  });

  it.each([null, 'token-2'])('rejects messages after Redux changes the token to %s before React cleanup', (token) => {
    render({accessToken: 'token-1', url: URL});
    const oldMessage = sockets()[0].onmessage;
    currentAccessToken = token;

    oldMessage({data: '{}'});

    expect(rootRouter).not.toHaveBeenCalled();
    expect(sockets()[0].close).not.toHaveBeenCalled();
  });

  it('ignores messages queued before logout', () => {
    render({accessToken: 'token-1', url: URL});
    const oldMessage = sockets()[0].onmessage;
    act(() => root.unmount());

    oldMessage({data: '{}'});
    expect(rootRouter).not.toHaveBeenCalled();
    expect(sockets()[0].onmessage).toBeNull();
  });

  it('closes the socket for good when it is removed, as it is when the member signs out', () => {
    render({accessToken: 'token-1', url: URL});

    act(() => root.unmount());

    expect(ReconnectingWebSocket).toHaveBeenCalledTimes(1);
    expect(sockets()[0].close).toHaveBeenCalledTimes(1);
  });
});
