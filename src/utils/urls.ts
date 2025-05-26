import {Pagination} from 'types/pagination';

/**
 * Gets the next URL for pagination from a given state part.
 * If there is no more data to fetch, an empty string is returned.
 */
export const getNextUrlFromState = <T extends Pagination>(statePart: T): string => {
  const {hasMore, next = ''} = statePart;
  return hasMore ? next || '' : '';
};
