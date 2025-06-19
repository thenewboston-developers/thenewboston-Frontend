import {getOrderBook as _getOrderBook} from 'api/exchangeOrders';
import {resetOrderBook, setOrderBook, startLoading} from 'store/orderBook';
import {AppDispatch} from 'types';

export const getOrderBook = (primaryCurrency: number, secondaryCurrency: number) => async (dispatch: AppDispatch) => {
  dispatch(startLoading());

  try {
    const responseData = await _getOrderBook(primaryCurrency, secondaryCurrency);
    dispatch(setOrderBook(responseData));
  } catch (error) {
    dispatch(resetOrderBook());
    throw error;
  }
};
