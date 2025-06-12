import {SocketDataType} from 'enums';
import {getChartData} from 'selectors/state';
import {store} from 'store';
import {processTrade} from 'store/chartData';
import {setExchangeOrder} from 'store/exchangeOrders';
import {setNotification, setTotalUnreadCount} from 'store/notifications';
import {setTrade} from 'store/trades';
import {setWallet} from 'store/wallets';
import {AppDispatch} from 'types';

const rootRouter = (dispatch: AppDispatch, event: MessageEvent) => {
  const socketData = JSON.parse(event.data);
  const {type} = socketData;

  if ([SocketDataType.CREATE_EXCHANGE_ORDER, SocketDataType.UPDATE_EXCHANGE_ORDER].includes(type)) {
    dispatch(setExchangeOrder(socketData.exchange_order));
  } else if (type === SocketDataType.CREATE_NOTIFICATION) {
    dispatch(setNotification(socketData.notification));
    if (socketData.total_unread_count !== undefined) {
      dispatch(setTotalUnreadCount(socketData.total_unread_count));
    }
  } else if (type === SocketDataType.CREATE_TRADE) {
    const {trade} = socketData;
    dispatch(setTrade(trade));

    // Process trade for chart data if it matches the current asset pair
    const state = store.getState();
    const chartDataState = getChartData(state);

    if (chartDataState.primaryCurrencyId && chartDataState.secondaryCurrencyId) {
      // Check if trade matches current chart's currency pair
      const matchesCurrencies =
        trade.primary_currency === chartDataState.primaryCurrencyId &&
        trade.secondary_currency === chartDataState.secondaryCurrencyId;

      if (matchesCurrencies) {
        dispatch(processTrade(trade));
      }
    }
  } else if (type === SocketDataType.UPDATE_WALLET) {
    dispatch(setWallet(socketData.wallet));
  }
};

export default rootRouter;
