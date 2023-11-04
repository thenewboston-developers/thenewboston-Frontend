import {UserReadSerializer} from 'types/api/users';
import {CreatedModified} from 'types/createdModified';
import {Dict} from 'types/generic';

export interface ArtworkTransfer extends CreatedModified {
  artwork: number;
  id: number;
  new_owner: UserReadSerializer;
  previous_owner: UserReadSerializer;
  price_amount: number | null;
  price_core: number | null;
}

export type ArtworkTransfers = Dict<ArtworkTransfer>;
