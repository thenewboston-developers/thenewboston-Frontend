import {ExchangeOrder} from 'types/exchangeOrders';

export interface OrderBookState {
  buyOrders: ExchangeOrder[];
  isLoading: boolean;
  sellOrders: ExchangeOrder[];
}
