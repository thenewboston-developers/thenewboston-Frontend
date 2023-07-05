import {TransferType} from 'enums';
import {Block} from 'types/blocks';
import {Dict} from 'types/generic';

export interface Transfer extends Block {
  core: number;
  created_date: string;
  owner: number;
  transfer_type: TransferType;
}

export type Transfers = Dict<Transfer>;
