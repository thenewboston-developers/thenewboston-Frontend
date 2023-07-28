import {CreatedModified} from 'types/createdModified';
import {Dict} from 'types/generic';

export interface Trade extends CreatedModified {
  buy_order: number;
  fill_quantity: number;
  id: number;
  overpayment_amount: number;
  sell_order: number;
  trade_price: number;
}

export type Trades = Dict<Trade>;
