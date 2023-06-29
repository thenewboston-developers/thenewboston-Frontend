import {TransferType} from 'enums';
import {Block} from 'types/blocks';
import {Dict} from 'types/generic';

export interface Transfer extends Block {
  core: number;
  created_date: string;
  transfer_type: TransferType;
  user: number;
}

export type Transfers = Dict<Transfer>;
