import {FC, useEffect, useMemo} from 'react';
import {useDispatch} from 'react-redux';
import ReconnectingWebSocket from 'reconnecting-websocket';

import rootRouter from 'routers/rootRouter';
import {AppDispatch} from 'types';

const WebSocket: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const socket = useMemo((): ReconnectingWebSocket => {
    return new ReconnectingWebSocket(`${process.env.REACT_APP_WS_URL}/ws/orders`);
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.onclose = () => {};

    socket.onmessage = (event) => {
      rootRouter(dispatch, event);
    };

    socket.onopen = () => {};

    return () => {
      socket.close();
    };
  }, [dispatch, socket]);

  return null;
};

export default WebSocket;
