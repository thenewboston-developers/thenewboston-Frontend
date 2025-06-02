export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
  unread_count?: number; // Only present in notification responses
}

export interface Pagination {
  hasMore: boolean;
  isLoading: boolean;
  next: string | null;
}
