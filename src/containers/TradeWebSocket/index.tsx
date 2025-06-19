import {FC, useEffect, useMemo} from 'react';
import {useDispatch} from 'react-redux';
import ReconnectingWebSocket from 'reconnecting-websocket';

import rootRouter from 'routers/rootRouter';
import {AppDispatch, AssetPair} from 'types';

export interface TradeWebSocketProps {
  assetPair: AssetPair | null;
}

const TradeWebSocket: FC<TradeWebSocketProps> = ({assetPair}) => {
  const dispatch = useDispatch<AppDispatch>();

  const socket = useMemo((): ReconnectingWebSocket => {
    const wsUrl = `${process.env.REACT_APP_WS_URL}/ws/trades`;
    return new ReconnectingWebSocket(wsUrl);
  }, []);

  useEffect(() => {
    if (!socket || !assetPair) return;

    let currentTicker: string | null = null;

    socket.onopen = () => {
      currentTicker = assetPair.primary_currency.ticker;
      socket.send(
        JSON.stringify({
          action: 'subscribe',
          ticker: currentTicker,
        }),
      );
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
  }, [assetPair, dispatch, socket]);

  useEffect(() => {
    if (!socket || socket.readyState !== WebSocket.OPEN || !assetPair) return;

    const newTicker = assetPair.primary_currency.ticker;

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
  }, [assetPair, socket]);

  return null;
};

export default TradeWebSocket;
