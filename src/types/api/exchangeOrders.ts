import {ExchangeOrder} from '../exchangeOrders';

export interface CreateExchangeOrderRequest {
  asset_pair: number;
  price: number;
  quantity: number;
  side: number;
}

export interface OrderBookResponse {
  buy_orders: ExchangeOrder[];
  sell_orders: ExchangeOrder[];
}
