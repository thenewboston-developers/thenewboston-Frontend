export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface Pagination {
  isLoading: boolean;
  next: string | null;
}
