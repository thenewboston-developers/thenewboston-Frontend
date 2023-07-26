import {WalletTab} from 'enums';
import {Address} from 'types/addresses';
import {Product} from 'types/products';

export interface Manager {
  activeAddress: Address | null;
  activeAssetPairId: number | null;
  activeProduct: Product | null;
  activeWalletId: number | null;
  activeWalletTab: WalletTab | null;
}
