import {UserReadSerializer} from 'types/api/users';
import {CreatedModified} from 'types/createdModified';

export interface CurrencyReadDetailSerializer extends CreatedModified {
  domain: string | null;
  id: number;
  logo: string;
  owner: UserReadSerializer;
  ticker: string;
}
