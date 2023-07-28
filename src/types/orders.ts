import {UserReadSerializer} from 'types/api/users';
import {Address} from 'types/addresses';
import {CreatedModified} from 'types/createdModified';
import {Dict} from 'types/generic';
import {OrderProduct} from 'types/orderProducts';

export interface Order extends CreatedModified {
  address: Address;
  buyer: UserReadSerializer;
  id: number;
  order_products: OrderProduct[];
  seller: UserReadSerializer;
}

export type Orders = Dict<Order>;
