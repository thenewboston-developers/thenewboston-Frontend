export interface Block {
  amount: number;
  id: string;
  payload: any;
  recipient: string;
  sender: string;
  signature: string;
  transaction_fee: number;
}
