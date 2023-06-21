import {ActiveWalletTab} from 'enums';

export interface Manager {
  activeWallet: number | null;
  activeWalletTab: ActiveWalletTab | null;
}
