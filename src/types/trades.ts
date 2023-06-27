import {Dict} from 'types/generic';

export interface Trade {
  buy_order: number;
  created_date: string;
  fill_quantity: number;
  id: number;
  modified_date: string;
  overpayment_amount: number;
  sell_order: number;
  trade_price: number;
}

export type Trades = Dict<Trade>;
