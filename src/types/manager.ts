import {WalletTab} from 'enums';
import {Currency} from 'types/currencies';

export interface Manager {
  activeAssetPairId: number | null;
  activeCommentCurrency: Currency | null;
  activeWalletId: number | null;
  activeWalletTab: WalletTab | null;
}
