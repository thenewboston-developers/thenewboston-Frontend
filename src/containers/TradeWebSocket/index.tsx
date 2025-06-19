import {FC, useEffect, useMemo} from 'react';
import {useDispatch} from 'react-redux';
import ReconnectingWebSocket from 'reconnecting-websocket';

import rootRouter from 'routers/rootRouter';
import {AppDispatch, AssetPair} from 'types';

interface TradeWebSocketProps {
  assetPair: AssetPair | null;
}

const TradeWebSocket: FC<TradeWebSocketProps> = ({assetPair}) => {
  const dispatch = useDispatch<AppDispatch>();

  const socket = useMemo((): ReconnectingWebSocket => {
    const wsUrl = `${process.env.REACT_APP_WS_URL}/ws/trades`;
    return new ReconnectingWebSocket(wsUrl);
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.onmessage = (event) => {
      rootRouter(dispatch, event);
    };

    socket.onclose = () => {};

    return () => {
      socket.close();
    };
  }, [dispatch, socket]);

  useEffect(() => {
    if (!socket || !assetPair) return;

    const {ticker} = assetPair.primary_currency;

    const subscribe = () => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(
          JSON.stringify({
            action: 'subscribe',
            ticker: ticker,
          }),
        );
      }
    };

    // Subscribe immediately if already connected
    subscribe();

    // Subscribe when connection opens
    socket.addEventListener('open', subscribe);

    return () => {
      socket.removeEventListener('open', subscribe);
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(
          JSON.stringify({
            action: 'unsubscribe',
            ticker: ticker,
          }),
        );
      }
    };
  }, [assetPair, socket]);

  return null;
};

export default TradeWebSocket;
