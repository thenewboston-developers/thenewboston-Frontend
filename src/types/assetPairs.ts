import {Currency} from 'types/currencies';
import {Dict} from 'types/generic';

export interface AssetPair {
  id: number;
  primary_currency: Currency;
  secondary_currency: Currency;
}

export type AssetPairs = Dict<AssetPair>;
