import {FC, useEffect, useMemo} from 'react';
import {useDispatch} from 'react-redux';
import ReconnectingWebSocket from 'reconnecting-websocket';

import rootRouter from 'routers/rootRouter';
import {AppDispatch, AssetPair} from 'types';

export interface TradeWebSocketProps {
  activeAssetPair: AssetPair | null;
  url: string;
}

const TradeWebSocket: FC<TradeWebSocketProps> = ({activeAssetPair, url}) => {
  const dispatch = useDispatch<AppDispatch>();

  const socket = useMemo((): ReconnectingWebSocket => {
    return new ReconnectingWebSocket(url);
  }, [url]);

  useEffect(() => {
    if (!socket || !activeAssetPair) return;

    let currentTicker: string | null = null;

    socket.onopen = () => {
      if (activeAssetPair) {
        currentTicker = activeAssetPair.primary_currency.ticker;
        socket.send(
          JSON.stringify({
            action: 'subscribe',
            ticker: currentTicker,
          }),
        );
      }
    };

    socket.onmessage = (event) => {
      rootRouter(dispatch, event);
    };

    socket.onclose = () => {
      currentTicker = null;
    };

    return () => {
      if (currentTicker && socket.readyState === WebSocket.OPEN) {
        socket.send(
          JSON.stringify({
            action: 'unsubscribe',
            ticker: currentTicker,
          }),
        );
      }
    };
  }, [activeAssetPair, dispatch, socket]);

  useEffect(() => {
    if (!socket || socket.readyState !== WebSocket.OPEN || !activeAssetPair) return;

    const newTicker = activeAssetPair.primary_currency.ticker;

    socket.send(
      JSON.stringify({
        action: 'subscribe',
        ticker: newTicker,
      }),
    );

    return () => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(
          JSON.stringify({
            action: 'unsubscribe',
            ticker: newTicker,
          }),
        );
      }
    };
  }, [activeAssetPair, socket]);

  return null;
};

export default TradeWebSocket;
