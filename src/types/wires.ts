import {WireType} from 'enums';
import {Block} from 'types/blocks';
import {Dict} from 'types/generic';

export interface Wire extends Block {
  currency: number;
  created_date: string;
  owner: number;
  wire_type: WireType;
}

export type Wires = Dict<Wire>;
