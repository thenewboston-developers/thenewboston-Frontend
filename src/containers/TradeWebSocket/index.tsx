import {FC, useEffect, useMemo} from 'react';
import {useDispatch} from 'react-redux';
import ReconnectingWebSocket from 'reconnecting-websocket';

import {SocketDataType} from 'enums';
import {getChartData} from 'selectors/state';
import {store} from 'store';
import {processTrade} from 'store/chartData';
import {setTrade} from 'store/trades';
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
      const data = JSON.parse(event.data);
      console.log('[TradeWebSocket] Received message:', data);

      if (data.type === SocketDataType.CREATE_TRADE) {
        const {trade} = data;
        dispatch(setTrade(trade));

        // Process trade for chart data if it matches the current asset pair
        const state = store.getState();
        const chartDataState = getChartData(state);

        if (chartDataState.primaryCurrencyId && chartDataState.secondaryCurrencyId) {
          const matchesCurrencies =
            trade.primary_currency === chartDataState.primaryCurrencyId &&
            trade.secondary_currency === chartDataState.secondaryCurrencyId;

          console.log('[TradeWebSocket] Currency match check:', {
            tradePrimary: trade.primary_currency,
            tradeSecondary: trade.secondary_currency,
            chartPrimary: chartDataState.primaryCurrencyId,
            chartSecondary: chartDataState.secondaryCurrencyId,
            matchesCurrencies,
          });

          if (matchesCurrencies) {
            console.log('[TradeWebSocket] Dispatching processTrade action');
            dispatch(processTrade(trade));
          }
        }
      }
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
