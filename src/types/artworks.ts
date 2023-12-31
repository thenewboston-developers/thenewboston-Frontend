import {UserReadSerializer} from 'types/api/users';
import {CreatedModified} from 'types/createdModified';
import {Dict} from 'types/generic';

export interface Artwork extends CreatedModified {
  creator: UserReadSerializer;
  description: string;
  id: number;
  image: string;
  name: string;
  owner: UserReadSerializer;
  price_amount: number | null;
  price_core: number | null;
}

export type Artworks = Dict<Artwork>;
