import {CreatedModified} from 'types/createdModified';
import {Dict} from 'types/generic';

export interface Trade extends CreatedModified {
  buy_order: number;
  filled_quantity: number;
  id: number;
  overpayment_amount: number;
  price: number;
  primary_currency: number;
  secondary_currency: number;
  sell_order: number;
}

export type Trades = Dict<Trade>;
