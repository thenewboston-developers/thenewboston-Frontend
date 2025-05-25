import {useMemo} from 'react';
import {SFC} from 'types';

import {BadgeStyle} from 'components/Badge';

import * as S from './Styles';

interface BadgeCountProps<T> {
  badgeStyle?: BadgeStyle;
  countFunction?: (items: T[]) => number;
  items: T[];
}

/**
 * Renders a badge component with a count value.
 *
 * @param badgeStyle - The style of the badge, defaults to 'danger'.
 * @param className - An optional CSS class name to apply to the badge.
 * @param countFunction - An optional function to compute the count value from the items.
 * @param items - The items to display the count for.
 * @returns The badge component if the count is greater than 0, otherwise null.
 */
const BadgeCount: SFC<BadgeCountProps<any>> = ({badgeStyle = BadgeStyle.danger, className, countFunction, items}) => {
  const computedCount = useMemo(() => {
    return countFunction ? countFunction(items) : items.length;
  }, [items, countFunction]);

  if (computedCount > 0) {
    return <S.BadgeCount badgeStyle={badgeStyle} children={computedCount.toString()} className={className} />;
  } else {
    return null;
  }
};

export default BadgeCount;
