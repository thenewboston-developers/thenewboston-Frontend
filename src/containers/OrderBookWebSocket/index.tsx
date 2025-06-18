import WebSocket from 'containers/WebSocket';
import {AssetPair} from 'types';

interface OrderBookWebSocketProps {
  assetPair: AssetPair | null;
}

const OrderBookWebSocket = ({assetPair}: OrderBookWebSocketProps) => {
  if (!assetPair) return null;

  const wsUrl = `${process.env.REACT_APP_WS_URL}/ws/exchange-orders/${assetPair.primary_currency.id}/${assetPair.secondary_currency.id}`;

  return <WebSocket url={wsUrl} />;
};

export default OrderBookWebSocket;
