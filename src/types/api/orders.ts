import {OrderType} from 'enums';

export interface CreateOrderRequest {
  order_type: OrderType;
  price: number;
  primary_currency: number;
  quantity: number;
  secondary_currency: number;
}
