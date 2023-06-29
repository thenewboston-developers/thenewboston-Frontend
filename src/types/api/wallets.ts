import {Block} from 'types/blocks';
import {Wallet} from 'types/wallets';

export interface CreateWalletRequest {
  core: number;
  owner: number;
}

export interface DepositResponse {
  block: Block;
  wallet: Wallet;
}
