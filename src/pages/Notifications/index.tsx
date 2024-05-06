import {useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {mdiCheckAll} from '@mdi/js';
import orderBy from 'lodash/orderBy';

import LeavesEmptyState from 'assets/leaves-empty-state.png';
import EmptyPage from 'components/EmptyPage';
import Button, {ButtonColor, IconColor} from 'components/Button';
import {getNotifications as _getNotifications} from 'dispatchers/notifications';
import {getNotifications} from 'selectors/state';
import {AppDispatch, SFC} from 'types';
import Notification from './Notification';
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
    const _notifications = notificationList.map((notification) => (
      <Notification key={notification.id} notification={notification} />
    ));
    return <S.NotificationContainer>{_notifications}</S.NotificationContainer>;
  };

  const renderSectionHeading = () => {
    const unreadCount = notificationList?.filter((notification) => !notification.is_read).length || 0;
    return <S.SectionHeading heading={`Notifcations - ${unreadCount}`} rightContent={renderMarkAllAsReadButton()} />;
  };

  const renderMarkAllAsReadButton = () => {
    return (
      <Button
        color={ButtonColor.secondary}
        iconColor={IconColor.black}
        iconLeft={mdiCheckAll}
        text="Mark all as read"
      />
    );
  };

  return (
    <S.Container className={className}>
      {renderSectionHeading()}
      {renderContent()}
    </S.Container>
  );
};

export default Notifications;
