import {useSelector} from 'react-redux';

import {getTotalUnreadNotificationCount} from 'selectors/state';
import {SFC} from 'types';

import * as S from './Styles';

const MAX_DISPLAY_COUNT = 99;

const BadgeCount: SFC = ({className}) => {
  const totalUnreadCount = useSelector(getTotalUnreadNotificationCount);

  if (totalUnreadCount <= 0) return null;

  const displayCount = totalUnreadCount > MAX_DISPLAY_COUNT ? `${MAX_DISPLAY_COUNT}+` : totalUnreadCount;

  return <S.BadgeCount className={className}>{displayCount}</S.BadgeCount>;
};

export default BadgeCount;
