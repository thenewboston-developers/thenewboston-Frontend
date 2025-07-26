import {useSelector} from 'react-redux';

import {getTotalUnreadNotificationCount} from 'selectors/state';
import {SFC} from 'types';

import * as S from './Styles';

const BadgeCount: SFC = ({className}) => {
  const totalUnreadCount = useSelector(getTotalUnreadNotificationCount);

  if (totalUnreadCount <= 0) return null;

  return <S.BadgeCount className={className}>{totalUnreadCount}</S.BadgeCount>;
};

export default BadgeCount;
