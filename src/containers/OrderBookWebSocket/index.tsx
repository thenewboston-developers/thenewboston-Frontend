import {FC, useEffect, useMemo} from 'react';
import {useDispatch} from 'react-redux';
import ReconnectingWebSocket from 'reconnecting-websocket';

import rootRouter from 'routers/rootRouter';
import {AppDispatch, AssetPair} from 'types';

interface OrderBookWebSocketProps {
  assetPair: AssetPair | null;
}

const OrderBookWebSocket: FC<OrderBookWebSocketProps> = ({assetPair}) => {
  const dispatch = useDispatch<AppDispatch>();

  const socket = useMemo((): ReconnectingWebSocket => {
    const wsUrl = `${process.env.REACT_APP_WS_URL}/ws/exchange-orders`;
    return new ReconnectingWebSocket(wsUrl);
  }, []);

  useEffect(() => {
    if (!socket || !assetPair) return;

    socket.onopen = () => {
      socket.send(
        JSON.stringify({
          action: 'subscribe',
          asset_pair_id: assetPair.id,
        }),
      );
    };

    socket.onmessage = (event) => {
      rootRouter(dispatch, event);
    };

    socket.onclose = () => {};

    return () => {
      socket.close();
    };
  }, [assetPair, dispatch, socket]);

  useEffect(() => {
    if (!socket || socket.readyState !== WebSocket.OPEN || !assetPair) return;

    socket.send(
      JSON.stringify({
        action: 'subscribe',
        asset_pair_id: assetPair.id,
      }),
    );

    return () => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(
          JSON.stringify({
            action: 'unsubscribe',
            asset_pair_id: assetPair.id,
          }),
        );
      }
    };
  }, [assetPair, socket]);

  return null;
};

export default OrderBookWebSocket;
