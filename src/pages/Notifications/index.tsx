import {useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {mdiCheckAll} from '@mdi/js';
import orderBy from 'lodash/orderBy';

import Button, {ButtonColor, IconColor} from 'components/Button';
import EmptyPage from 'components/EmptyPage';
import LeavesEmptyState from 'assets/leaves-empty-state.png';
import Notification from './Notification';
import {AppDispatch, SFC} from 'types';
import {ToastType} from 'enums';
import {displayToast} from 'utils/toasts';
import {getNotifications as _getNotifications, markAllNotificationsAsRead} from 'dispatchers/notifications';
import {getNotifications} from 'selectors/state';
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

  const getUnreadNotificationsCount = () => {
    return notificationList?.filter((notification) => !notification.is_read).length || 0;
  };

  const renderSectionHeading = () => {
    const unreadCount = getUnreadNotificationsCount();
    const sectionTitle = `Notifications${unreadCount > 0 ? ` - ${unreadCount}` : ''}`;
    const rightContent = unreadCount > 0 ? renderMarkAllAsReadButton() : null;
    return <S.SectionHeading heading={sectionTitle} rightContent={rightContent} />;
  };

  const renderMarkAllAsReadButton = () => {
    return (
      <Button
        color={ButtonColor.secondary}
        iconColor={IconColor.black}
        iconLeft={mdiCheckAll}
        onClick={handleMarkAllAsRead}
        text="Mark all as read"
      />
    );
  };

  const handleMarkAllAsRead = async () => {
    try {
      await dispatch(markAllNotificationsAsRead());
      displayToast('All Notifications marked as read', ToastType.SUCCESS);
    } catch (error) {
      console.error(error);
      displayToast('Oops.. An error occurred.', ToastType.ERROR);
    }
  };

  return (
    <S.Container className={className}>
      {renderSectionHeading()}
      {renderContent()}
    </S.Container>
  );
};

export default Notifications;
