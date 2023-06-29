import {Dict} from 'types/generic';

export interface Block {
  amount: number;
  created_date: string;
  id: string;
  payload: any;
  recipient: string;
  sender: string;
  signature: string;
  transaction_fee: number;
}

export type Blocks = Dict<Block>;
