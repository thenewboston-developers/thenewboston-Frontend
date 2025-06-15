import {SocketDataType} from 'enums';
import {getTradePriceChartData} from 'selectors/state';
import {store} from 'store';
import {setExchangeOrder} from 'store/exchangeOrders';
import {setNotification, setTotalUnreadCount} from 'store/notifications';
import {processTrade} from 'store/tradePriceChartData';
import {setTrade} from 'store/trades';
import {setWallet} from 'store/wallets';
import {AppDispatch, RootState} from 'types';

const handleCreateNotification = (dispatch: AppDispatch, socketData: any) => {
  dispatch(setNotification(socketData.notification));

  if (socketData.total_unread_count !== undefined) {
    dispatch(setTotalUnreadCount(socketData.total_unread_count));
  }
};

const handleCreateTrade = (dispatch: AppDispatch, socketData: any) => {
  const {trade} = socketData;
  dispatch(setTrade(trade));

  const state = store.getState() as RootState;
  const {primaryCurrencyId, secondaryCurrencyId} = getTradePriceChartData(state);
  if (!primaryCurrencyId || !secondaryCurrencyId) return;

  if (trade.primary_currency === primaryCurrencyId && trade.secondary_currency === secondaryCurrencyId) {
    dispatch(processTrade(trade));
  }
};

const rootRouter = (dispatch: AppDispatch, event: MessageEvent) => {
  const socketData = JSON.parse(event.data);
  const {type} = socketData;

  if ([SocketDataType.CREATE_EXCHANGE_ORDER, SocketDataType.UPDATE_EXCHANGE_ORDER].includes(type)) {
    dispatch(setExchangeOrder(socketData.exchange_order));
  } else if (type === SocketDataType.CREATE_NOTIFICATION) {
    handleCreateNotification(dispatch, socketData);
  } else if (type === SocketDataType.CREATE_TRADE) {
    handleCreateTrade(dispatch, socketData);
  } else if (type === SocketDataType.UPDATE_WALLET) {
    dispatch(setWallet(socketData.wallet));
  }
};

export default rootRouter;
