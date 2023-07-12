import {SocketDataType} from 'enums';
import {setExchangeOrder} from 'store/exchangeOrders';
import {setWallet} from 'store/wallets';
import {AppDispatch} from 'types';

const rootRouter = (dispatch: AppDispatch, event: MessageEvent) => {
  const socketData = JSON.parse(event.data);
  const {type} = socketData;

  if ([SocketDataType.CREATE_EXCHANGE_ORDER, SocketDataType.UPDATE_EXCHANGE_ORDER].includes(type)) {
    dispatch(setExchangeOrder(socketData.exchange_order));
  } else if (type === SocketDataType.UPDATE_WALLET) {
    dispatch(setWallet(socketData.wallet));
  }
};

export default rootRouter;
