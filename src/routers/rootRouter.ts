import {DEPLOYMENT_TIMESTAMP} from 'constants/localStorage';
import {NotificationType, SocketDataType} from 'enums';
import {getTradePriceChartData} from 'selectors/state';
import {store} from 'store';
import {setComment} from 'store/comments';
import {upsertChallenge, upsertMatch} from 'store/connectFive';
import {setExchangeOrder} from 'store/exchangeOrders';
import {setCurrentDeployment, setUpdateAvailable} from 'store/frontendDeployments';
import {setNotification, setTotalUnreadCount} from 'store/notifications';
import {updateOrderBookOrder} from 'store/orderBook';
import {processTrade} from 'store/tradePriceChartData';
import {setTrade} from 'store/trades';
import {setWallet} from 'store/wallets';
import {AppDispatch, RootState} from 'types';
import {FrontendDeployment} from 'types/frontendDeployment';

const handleCreateNotification = (dispatch: AppDispatch, socketData: any) => {
  const {notification, total_unread_count} = socketData;
  dispatch(setNotification(notification));

  if (
    notification?.payload?.comment &&
    [NotificationType.COMMENT_MENTION, NotificationType.POST_COMMENT].includes(notification.payload.notification_type)
  ) {
    dispatch(setComment(notification.payload.comment));
  }

  if (
    notification?.payload?.notification_type === NotificationType.CONNECT_FIVE_CHALLENGE &&
    notification.payload.challenge
  ) {
    const state = store.getState() as RootState;
    const selfId = state.self.id;
    if (selfId) {
      dispatch(upsertChallenge({challenge: notification.payload.challenge, selfId}));
    }
  }

  if (total_unread_count !== undefined) {
    dispatch(setTotalUnreadCount(total_unread_count));
  }
};

const handleCreateTrade = (dispatch: AppDispatch, socketData: any) => {
  const {trade} = socketData;
  dispatch(setTrade(trade));

  const state = store.getState() as RootState;
  const {assetPairId} = getTradePriceChartData(state);
  if (!assetPairId) return;

  if (trade.asset_pair === assetPairId) {
    dispatch(processTrade(trade));
  }
};

const handleDeploymentUpdate = (dispatch: AppDispatch, deployment: FrontendDeployment) => {
  const storedTimestamp = localStorage.getItem(DEPLOYMENT_TIMESTAMP);

  if (!storedTimestamp || deployment.created_date > storedTimestamp) {
    dispatch(setCurrentDeployment(deployment));
    dispatch(setUpdateAvailable(true));
  } else {
    dispatch(setCurrentDeployment(deployment));
    dispatch(setUpdateAvailable(false));
  }
};

const rootRouter = (dispatch: AppDispatch, event: MessageEvent) => {
  const socketData = JSON.parse(event.data);
  const {type} = socketData;

  if ([SocketDataType.CREATE_EXCHANGE_ORDER, SocketDataType.UPDATE_EXCHANGE_ORDER].includes(type)) {
    dispatch(setExchangeOrder(socketData.exchange_order));
    dispatch(updateOrderBookOrder(socketData.exchange_order));
  } else if (type === SocketDataType.UPDATE_CONNECT_FIVE_CHALLENGE) {
    const state = store.getState() as RootState;
    const selfId = state.self.id;
    if (selfId) {
      dispatch(upsertChallenge({challenge: socketData.challenge, selfId}));
    }
  } else if (type === SocketDataType.UPDATE_CONNECT_FIVE_MATCH) {
    if (socketData.match) {
      dispatch(upsertMatch(socketData.match));
    }
  } else if (type === SocketDataType.CREATE_NOTIFICATION) {
    handleCreateNotification(dispatch, socketData);
  } else if (type === SocketDataType.CREATE_TRADE) {
    handleCreateTrade(dispatch, socketData);
  } else if (type === SocketDataType.UPDATE_FRONTEND_DEPLOYMENT) {
    handleDeploymentUpdate(dispatch, socketData.frontend_deployment);
  } else if (type === SocketDataType.UPDATE_WALLET) {
    dispatch(setWallet(socketData.wallet));
  }
};

export default rootRouter;
