import {AssetPair} from 'types/assetPairs';
import {CreatedModified} from 'types/createdModified';
import {Dict} from 'types/generic';
import {PaginatedResponse, Pagination} from 'types/pagination';

export interface ExchangeOrder extends CreatedModified {
  asset_pair: AssetPair;
  filled_quantity: number;
  id: number;
  owner: number;
  price: number;
  quantity: number;
  side: number;
  status: number;
}

export type ExchangeOrders = Dict<ExchangeOrder>;

export interface ExchangeOrdersState extends Pagination {
  exchangeOrders: ExchangeOrders;
}

export type ExchangeOrderPaginatedResponse = PaginatedResponse<ExchangeOrder>;
