import {WalletTab} from 'enums';

export interface Manager {
  activeAssetPairId: number | null;
  activeWalletId: number | null;
  activeWalletTab: WalletTab | null;
}
