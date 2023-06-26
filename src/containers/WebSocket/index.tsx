import {FC, useEffect, useMemo} from 'react';
import {useDispatch} from 'react-redux';
import ReconnectingWebSocket from 'reconnecting-websocket';

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
      console.log(dispatch, event);
    };

    socket.onopen = () => {
      console.log('WS opened');
    };

    // interval to send a message every 5 seconds
    const interval = setInterval(() => {
      if (socket.readyState === ReconnectingWebSocket.OPEN) {
        const message = {text: 'Hello every 5 seconds!'};
        socket.send(JSON.stringify(message));
      }
    }, 5000);

    return () => {
      socket.close();
      clearInterval(interval); // clear the interval to stop sending messages
    };
  }, [dispatch, socket]);

  return null;
};

export default WebSocket;
