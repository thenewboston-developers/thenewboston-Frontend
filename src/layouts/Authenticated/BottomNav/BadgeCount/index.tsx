import {useMemo} from 'react';

import {SFC} from 'types';

import * as S from './Styles';

interface BadgeCountProps<T> {
  countFunction?: (items: T[]) => number;
  items: T[];
}

const BadgeCount: SFC<BadgeCountProps<any>> = ({className, countFunction, items}) => {
  const computedCount = useMemo(() => {
    return countFunction ? countFunction(items) : items.length;
  }, [items, countFunction]);

  if (computedCount <= 0) return null;

  return <S.BadgeCount className={className}>{computedCount}</S.BadgeCount>;
};

export default BadgeCount;
