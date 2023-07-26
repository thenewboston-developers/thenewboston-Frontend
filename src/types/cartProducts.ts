import {CreatedModified} from 'types/createdModified';
import {Dict} from 'types/generic';
import {Product} from 'types/products';

export interface CartProduct extends CreatedModified {
  buyer: number;
  id: number;
  product: Product;
  quantity: number;
}

export type CartProducts = Dict<CartProduct>;
