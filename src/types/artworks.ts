import {CreatedModified} from 'types/createdModified';
import {Pagination} from 'types/pagination';
import {UserReadSerializer} from 'types/api/users';

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

export interface Artworks extends Pagination {
  artworks: Artwork[];
}
