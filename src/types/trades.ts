import {CreatedModified} from 'types/createdModified';
import {Dict} from 'types/generic';

export interface Trade extends CreatedModified {
  asset_pair: number;
  buy_order: number;
  filled_quantity: number;
  id: number;
  overpayment_amount: number;
  price: number;
  primary_currency: number; // DEPRECATED but still included
  secondary_currency: number; // DEPRECATED but still included
  sell_order: number;
}

export type Trades = Dict<Trade>;
