import {ActivationStatus} from 'enums';
import {UserReadSerializer} from 'types/api/users';
import {CreatedModified} from 'types/createdModified';
import {Dict} from 'types/generic';
import {Item} from 'types/items';

export interface Product extends CreatedModified, Item {
  activation_status: ActivationStatus;
  id: number;
  seller: UserReadSerializer;
}

export type Products = Dict<Product>;
