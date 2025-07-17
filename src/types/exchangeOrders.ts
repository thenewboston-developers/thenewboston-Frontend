import {CreatedModified} from 'types/createdModified';
import {Dict} from 'types/generic';
import {PaginatedResponse, Pagination} from 'types/pagination';

export interface ExchangeOrder extends CreatedModified {
  filled_quantity: number;
  id: number;
  owner: number;
  price: number;
  primary_currency: number;
  quantity: number;
  secondary_currency: number;
  side: number;
  status: number;
}

export type ExchangeOrders = Dict<ExchangeOrder>;

export interface ExchangeOrdersState extends Pagination {
  exchangeOrders: ExchangeOrders;
}

export type ExchangeOrderPaginatedResponse = PaginatedResponse<ExchangeOrder>;
