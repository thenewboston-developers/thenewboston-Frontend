import {Transfer} from 'types/transfers';
import {Wallet} from 'types/wallets';

export interface CreateWalletRequest {
  core: number;
  owner: number;
}

export interface DepositResponse {
  transfer: Transfer;
  wallet: Wallet;
}

export interface WithdrawRequest {
  account_number: string;
  amount: number;
}

export interface WithdrawResponse {
  transfer: Transfer;
  wallet: Wallet;
}
