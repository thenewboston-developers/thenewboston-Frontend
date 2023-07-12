import {OrderType} from 'enums';

export interface CreateExchangeOrderRequest {
  order_type: OrderType;
  price: number;
  primary_currency: number;
  quantity: number;
  secondary_currency: number;
}
