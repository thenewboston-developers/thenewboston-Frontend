import {WalletTab} from 'enums';
import {Core} from 'types/cores';

export interface Manager {
  activeAssetPairId: number | null;
  activeCommentCore: Core | null;
  activeWalletId: number | null;
  activeWalletTab: WalletTab | null;
}
