import {CurrencyTinySerializer} from 'types/api/tradeHistory';
import {CreatedModified} from 'types/createdModified';

export type BonsaiStatus = 'draft' | 'published';

export interface BonsaiHighlight {
  id: number;
  order: number;
  text: string;
}

export interface BonsaiImage {
  id: number;
  order: number;
  url: string;
}

export interface Bonsai extends CreatedModified {
  description: string;
  cultivar: string;
  genus: string;
  highlights: BonsaiHighlight[];
  id: number;
  images: BonsaiImage[];
  name: string;
  origin: string;
  pot: string;
  price_amount: number;
  price_currency: CurrencyTinySerializer;
  size: string;
  slug: string;
  species: string;
  status: BonsaiStatus;
  style: string;
  teaser: string;
}

export interface BonsaiPayload {
  description: string;
  cultivar: string;
  genus: string;
  highlights: BonsaiHighlightPayload[];
  images: BonsaiImagePayload[];
  name: string;
  origin: string;
  pot: string;
  price_amount: string;
  price_currency_id: number;
  size: string;
  slug: string;
  species: string;
  status: BonsaiStatus;
  style: string;
  teaser: string;
}

export type BonsaiResponse = Omit<Bonsai, 'price_amount'> & {
  price_amount: number | string;
};

export interface BonsaiHighlightPayload {
  id?: number;
  order: number;
  text: string;
}

export interface BonsaiImagePayload {
  id?: number;
  order: number;
  url: string;
}
