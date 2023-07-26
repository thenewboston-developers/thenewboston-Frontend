import {CreatedModified} from 'types/createdModified';
import {Dict} from 'types/generic';

export interface Address extends CreatedModified {
  address_1: string;
  address_2: string;
  city: string;
  country: string;
  id: number;
  owner: number;
  state: string;
  zip_code: string;
}

export type Addresses = Dict<Address>;
