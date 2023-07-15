import {WalletTab} from 'enums';
import {Product} from 'types/products';

export interface Manager {
  activeAssetPairId: number | null;
  activeProduct: Product | null;
  activeWalletId: number | null;
  activeWalletTab: WalletTab | null;
}
