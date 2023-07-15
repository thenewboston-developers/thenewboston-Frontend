import {ExchangeOrderType, FillStatus} from 'enums';
import {CreatedModified} from 'types/createdModified';
import {Dict} from 'types/generic';

export interface ExchangeOrder extends CreatedModified {
  fill_status: FillStatus;
  filled_amount: number;
  id: number;
  order_type: ExchangeOrderType;
  owner: number;
  price: number;
  primary_currency: number;
  quantity: number;
  secondary_currency: number;
}

export type ExchangeOrders = Dict<ExchangeOrder>;
