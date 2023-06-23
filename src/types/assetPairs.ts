import {Core} from 'types/cores';
import {Dict} from 'types/generic';

export interface AssetPair {
  id: number;
  primary_currency: Core;
  secondary_currency: Core;
}

export type AssetPairs = Dict<AssetPair>;
