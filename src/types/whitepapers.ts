import {UserReadSerializer} from 'types/api/users';
import {CreatedModified} from 'types/createdModified';

export interface Whitepaper extends CreatedModified {
  content: string;
  currency: number;
  id: number;
  owner: UserReadSerializer;
}
