import {WalletTab} from 'enums';
import {Address} from 'types/addresses';
import {Core} from 'types/cores';
import {Product} from 'types/products';

export interface Manager {
  activeAddress: Address | null;
  activeAssetPairId: number | null;
  activeCommentCore: Core | null;
  activeConversationId: number | null;
  activeOrderAddressId: number | null;
  activeProduct: Product | null;
  activeWalletId: number | null;
  activeWalletTab: WalletTab | null;
}
