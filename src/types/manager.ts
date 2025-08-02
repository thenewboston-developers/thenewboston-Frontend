import {WalletTab} from 'enums';
import {Currency} from 'types/currencies';

export interface Manager {
  activeCommentCurrency: Currency | null;
  activeWalletId: number | null;
  activeWalletTab: WalletTab | null;
}
