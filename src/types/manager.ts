import {WalletTab} from 'enums';

export interface Manager {
  activeWallet: number | null;
  activeWalletTab: WalletTab | null;
}
