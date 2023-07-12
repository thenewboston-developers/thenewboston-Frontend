import {FillStatus, OrderType} from 'enums';
import {Dict} from 'types/generic';

export interface ExchangeOrder {
  created_date: string;
  fill_status: FillStatus;
  filled_amount: number;
  id: number;
  modified_date: string;
  order_type: OrderType;
  owner: number;
  price: number;
  primary_currency: number;
  quantity: number;
  secondary_currency: number;
}

export type ExchangeOrders = Dict<ExchangeOrder>;
