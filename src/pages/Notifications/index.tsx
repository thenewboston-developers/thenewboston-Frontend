import {useEffect, useMemo} from 'react';
import InfiniteScrollComponent from 'react-infinite-scroll-component';
import {useDispatch, useSelector} from 'react-redux';
import orderBy from 'lodash/orderBy';

import LeavesEmptyState from 'assets/leaves-empty-state.png';
import EmptyPage from 'components/EmptyPage';
import EmptyText from 'components/EmptyText';
import Skeleton from 'components/Skeleton';
import {
  getNotifications as _getNotifications,
  markAllNotificationsAsRead,
  resetNotifications as _resetNotifications,
} from 'dispatchers/notifications';
import {ToastType} from 'enums';
import {getNotifications, hasMoreNotifications, isLoadingNotifications} from 'selectors/state';
import {AppDispatch, SFC} from 'types';
import {getUnreadNotificationsCount} from 'utils/notifications';
import {displayErrorToast, displayToast} from 'utils/toasts';

import Notification from './Notification';
import * as S from './Styles';

const Notifications: SFC = ({className}) => {
  const dispatch = useDispatch<AppDispatch>();
  const hasMore = useSelector(hasMoreNotifications);
  const isLoading = useSelector(isLoadingNotifications);
  const notifications = useSelector(getNotifications);

  useEffect(() => {
    (async () => {
      try {
        dispatch(_resetNotifications());
        await dispatch(_getNotifications());
      } catch (error) {
        displayErrorToast('Error fetching notifications');
      }
    })();
  }, [dispatch]);

  const notificationList = useMemo(() => {
    return orderBy(Object.values(notifications), ['created_date'], ['desc']);
  }, [notifications]);

  const fetchMoreNotifications = async () => {
    if (!isLoading) {
      await dispatch(_getNotifications());
    }
  };

  const getNotificationSkeleton = (n: number) => {
    const skeletons = Array.from({length: n}, (_, i) => (
      <S.NotificationSkeletonContainer key={i}>
        <Skeleton width="100%" height="80px" />
      </S.NotificationSkeletonContainer>
    ));
    return <S.SkeletonContainer>{skeletons}</S.SkeletonContainer>;
  };

  const handleMarkAllAsRead = async () => {
    try {
      await dispatch(markAllNotificationsAsRead());
      displayToast('All Notifications marked as read', ToastType.SUCCESS);
    } catch (error) {
      displayToast('Oops.. An error occurred.', ToastType.ERROR);
    }
  };

  const renderNotifications = () => {
    if (isLoading && !notificationList.length) {
      return getNotificationSkeleton(5);
    }

    if (notificationList.length) {
      return (
        <InfiniteScrollComponent
          dataLength={notificationList.length}
          endMessage={
            <S.EndMessageContainer>
              <EmptyText>No more notifications to show.</EmptyText>
            </S.EndMessageContainer>
          }
          hasMore={hasMore}
          loader={getNotificationSkeleton(3)}
          next={fetchMoreNotifications}
          scrollableTarget="main-scrollable-area"
          scrollThreshold={0.9}
        >
          <S.NotificationContainer>
            {notificationList.map((notification) => (
              <Notification key={notification.id} notification={notification} />
            ))}
          </S.NotificationContainer>
        </InfiniteScrollComponent>
      );
    }

    return <EmptyPage bottomText="Create a post or something." graphic={LeavesEmptyState} topText="Nothing here!" />;
  };

  const renderSectionHeading = () => {
    const unreadCount = getUnreadNotificationsCount(notificationList);
    const rightContent = unreadCount > 0 ? renderMarkAllAsReadButton() : null;
    return <S.SectionHeading heading="Notifications" rightContent={rightContent} renderLine={false} />;
  };

  const renderMarkAllAsReadButton = () => {
    return <S.MarkAllButton onClick={handleMarkAllAsRead} text="Mark all as read" />;
  };

  return (
    <S.Container className={className}>
      <S.Header>{renderSectionHeading()}</S.Header>
      <S.Content>{renderNotifications()}</S.Content>
    </S.Container>
  );
};

export default Notifications;
