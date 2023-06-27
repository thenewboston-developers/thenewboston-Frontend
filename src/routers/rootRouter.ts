import {SocketDataType} from 'enums';
import {setOrder} from 'store/orders';
import {setWallet} from 'store/wallets';
import {AppDispatch} from 'types';

const rootRouter = (dispatch: AppDispatch, event: MessageEvent) => {
  const socketData = JSON.parse(event.data);
  const {type} = socketData;

  if ([SocketDataType.CREATE_ORDER, SocketDataType.UPDATE_ORDER].includes(type)) {
    dispatch(setOrder(socketData.order));
  } else if (type === SocketDataType.UPDATE_WALLET) {
    dispatch(setWallet(socketData.wallet));
  }
};

export default rootRouter;
