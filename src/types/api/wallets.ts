import {Wallet} from 'types/wallets';
import {Wire} from 'types/wires';

export interface CreateWalletRequest {
  currency: number;
  owner: number;
}

export interface DepositResponse {
  wallet: Wallet;
  wire: Wire;
}

export interface WithdrawRequest {
  account_number: string;
  amount: number;
}

export interface WithdrawResponse {
  wallet: Wallet;
  wire: Wire;
}
