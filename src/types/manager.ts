import {WalletTab} from 'enums';
import {Currency} from 'types/currencies';
import {Wallet} from 'types/wallets';

export interface Manager {
  activeCommentCurrency: Currency | null;
  activeWallet: Wallet | null;
  activeWalletTab: WalletTab | null;
}
