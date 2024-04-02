
export interface PaginatedResponse<T> {
	count: number;
	next: string | null;
	previous: string | null;
	results: T[];
}

export interface ExtendedPaginatedResponse<T> extends PaginatedResponse<T> {
    isLoading: boolean;
    hasMore: boolean;
}
