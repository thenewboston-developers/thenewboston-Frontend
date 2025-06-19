import {ExchangeOrderType} from 'enums';

import {ExchangeOrder} from '../exchangeOrders';

export interface CreateExchangeOrderRequest {
  order_type: ExchangeOrderType;
  price: number;
  primary_currency: number;
  quantity: number;
  secondary_currency: number;
}

export interface OrderBookResponse {
  buy_orders: ExchangeOrder[];
  sell_orders: ExchangeOrder[];
}
