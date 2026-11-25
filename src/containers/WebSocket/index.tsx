import {FC, useEffect} from 'react';
import {useDispatch, useStore} from 'react-redux';
import ReconnectingWebSocket from 'reconnecting-websocket';

import rootRouter from 'routers/rootRouter';
import {AppDispatch, RootState} from 'types';
import {authorizationProtocols} from 'utils/authentication';

export interface WebSocketProps {
  accessToken?: string;
  url: string;
}

const WebSocket: FC<WebSocketProps> = ({accessToken, url}) => {
  const dispatch = useDispatch<AppDispatch>();
  const store = useStore<RootState>();

  useEffect(() => {
    // Create the connection only after React commits this render. A new token owns a new connection, including
    // all of its reconnects; abandoned renders and StrictMode cannot leave an unowned socket running.
    const socket = new ReconnectingWebSocket(url, accessToken ? authorizationProtocols(accessToken) : undefined);
    let active = true;

    socket.onmessage = (event) => {
      // Redux logout or token replacement takes effect before React runs passive-effect cleanup. Reject queued
      // messages during that interval too, so a previous session cannot repopulate the freshly cleared store.
      if (!active || (accessToken && store.getState().authentication.accessToken !== accessToken)) return;
      rootRouter(dispatch, event);
    };

    return () => {
      active = false;
      socket.onmessage = null;
      socket.close();
    };
  }, [accessToken, dispatch, store, url]);

  return null;
};

export default WebSocket;
