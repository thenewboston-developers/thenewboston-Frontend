import {SocketDataType} from 'enums';
import {setOrder} from 'store/orders';
import {AppDispatch} from 'types';

const rootRouter = (dispatch: AppDispatch, event: MessageEvent) => {
  const socketData = JSON.parse(event.data);
  const {type} = socketData;

  if ([SocketDataType.CREATE_ORDER, SocketDataType.UPDATE_ORDER].includes(type)) {
    dispatch(setOrder(socketData.order));
  }
};

export default rootRouter;
