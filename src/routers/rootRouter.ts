import {setOrder} from 'store/orders';
import {AppDispatch} from 'types';

const rootRouter = (dispatch: AppDispatch, event: MessageEvent) => {
  const socketData = JSON.parse(event.data);
  const {type} = socketData;

  if (['create.order', 'update.order'].includes(type)) {
    dispatch(setOrder(socketData.order));
  }
};

export default rootRouter;
