import {UserReadSerializer} from 'types/api/users';
import {CreatedModified} from 'types/createdModified';
import {Dict} from 'types/generic';

export interface ArtworkTransfer extends CreatedModified {
  artwork: number;
  id: number;
  new_owner: UserReadSerializer;
  previous_owner: UserReadSerializer;
}

export type ArtworkTransfers = Dict<ArtworkTransfer>;
