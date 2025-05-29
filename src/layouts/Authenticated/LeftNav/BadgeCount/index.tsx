import {useMemo} from 'react';

import {BadgeStyle} from 'components/Badge';
import {SFC} from 'types';

import * as S from './Styles';

interface BadgeCountProps<T> {
  badgeStyle?: BadgeStyle;
  countFunction?: (items: T[]) => number;
  items: T[];
}

const BadgeCount: SFC<BadgeCountProps<any>> = ({badgeStyle = BadgeStyle.danger, className, countFunction, items}) => {
  const computedCount = useMemo(() => {
    return countFunction ? countFunction(items) : items.length;
  }, [items, countFunction]);

  if (computedCount <= 0) return null;

  return <S.BadgeCount badgeStyle={badgeStyle} children={computedCount.toString()} className={className} />;
};

export default BadgeCount;
