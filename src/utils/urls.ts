import {POST_DETAIL_COMMENT_PARAM} from 'constants/paths';
import {Pagination} from 'types/pagination';

/**
 * Gets the next URL for pagination from a given state part.
 * If there is no more data to fetch, an empty string is returned.
 */
export const getNextUrlFromState = <T extends Pagination>(statePart: T): string => {
  const {hasMore, next = ''} = statePart;
  return hasMore ? next || '' : '';
};

/**
 * Gets the path of the post detail page, which scrolls to and highlights the comment when one is given.
 */
export const getPostDetailPath = (postId: number, commentId?: number | null): string => {
  return commentId ? `/posts/${postId}?${POST_DETAIL_COMMENT_PARAM}=${commentId}` : `/posts/${postId}`;
};
