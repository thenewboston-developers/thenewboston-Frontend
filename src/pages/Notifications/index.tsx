import {useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import orderBy from 'lodash/orderBy';

import LeavesEmptyState from 'assets/leaves-empty-state.png';
import EmptyPage from 'components/EmptyPage';
import {getNotifications as _getNotifications} from 'dispatchers/notifications';
import {getNotifications} from 'selectors/state';
import {AppDispatch, SFC} from 'types';
import * as S from './Styles';

const Notifications: SFC = ({className}) => {
  const dispatch = useDispatch<AppDispatch>();
  const notifications = useSelector(getNotifications);

  useEffect(() => {
    (async () => {
      await dispatch(_getNotifications());
    })();
  }, [dispatch]);

  const notificationList = useMemo(() => {
    return orderBy(Object.values(notifications), ['created_date'], ['desc']);
  }, [notifications]);

  const renderContent = () => {
    if (!!notificationList.length) return renderNotificationContainer();
    return (
      <EmptyPage
        bottomText="Make a comment or sell some art or something."
        graphic={LeavesEmptyState}
        topText="Nothing here!"
      />
    );
  };

  const renderNotificationContainer = () => {
    const _notifications = notificationList.map((notification) => <div key={notification.id}>{notification.id}</div>);
    return <S.NotificationContainer>{_notifications}</S.NotificationContainer>;
  };

  return <S.Container className={className}>{renderContent()}</S.Container>;
};

export default Notifications;
