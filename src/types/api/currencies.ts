import {UserReadSerializer} from 'types/api/users';
import {CreatedModified} from 'types/createdModified';

export interface CurrencyReadDetailSerializer extends CreatedModified {
  description: string | null;
  domain: string | null;
  id: number;
  logo: string;
  owner: UserReadSerializer;
  ticker: string;
  total_amount_minted: number;
}
