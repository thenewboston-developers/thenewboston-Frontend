import {ExchangeOrderType} from 'enums';

export interface CreateExchangeOrderRequest {
  order_type: ExchangeOrderType;
  price: number;
  primary_currency: number;
  quantity: number;
  secondary_currency: number;
}
