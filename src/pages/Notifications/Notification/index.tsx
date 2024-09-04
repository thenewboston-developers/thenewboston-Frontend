import {ReactNode} from 'react';
import {Link} from 'react-router-dom';
import {mdiBrushOutline} from '@mdi/js';

import Avatar from 'components/Avatar';
import {Notification as TNotification, SFC} from 'types';
import {longDate} from 'utils/dates';

import * as S from './Styles';

enum NotificationType {
  ARTWORK_PURCHASE = 'ARTWORK_PURCHASE',
  POST_COMMENT = 'POST_COMMENT',
}

export interface NotificationProps {
  notification: TNotification;
}

const Notification: SFC<NotificationProps> = ({className, notification}) => {
  const renderRedDot = () => {
    return notification.is_read ? null : (
      <S.DotContainer>
        <S.Dot />
      </S.DotContainer>
    );
  };

  const renderArtworkPurchaseNotification = () => {
    return (
      <S.ArtworkPurchaseNotificationContainer>
        <Link to={`/profile/${notification.payload.buyer.id}`}>
          <Avatar src={notification.payload.buyer.avatar} size="45px" />
          <S.IconBrush path={mdiBrushOutline} size="23px" />
        </Link>
        <S.TextContainer>
          <S.Link to={`/profile/${notification.payload.buyer.id}`}>{notification.payload.buyer.username}</S.Link>{' '}
          purchased your <S.Link to={`/art/artworks/${notification.payload.artwork_id}`}>artwork</S.Link>.
          <br />
          <S.TimeStamp>{longDate(notification.created_date)}</S.TimeStamp>
        </S.TextContainer>
        {renderRedDot()}
      </S.ArtworkPurchaseNotificationContainer>
    );
  };

  const renderPostCommentNotification = () => {
    return (
      <S.ArtworkPurchaseNotificationContainer>
        <Link to={`/profile/${notification.payload.commenter.id}`}>
          <Avatar src={notification.payload.commenter.avatar} size="45px" />
          <S.IconBrush path={mdiBrushOutline} size="23px" />
        </Link>
        <S.TextContainer>
          <S.Link to={`/profile/${notification.payload.commenter.id}`}>
            {notification.payload.commenter.username}
          </S.Link>{' '}
          commented on your <strong>Post</strong>:"{notification.payload.comment}"
          <br />
          <S.TimeStamp>{longDate(notification.created_date)}</S.TimeStamp>
        </S.TextContainer>
        {renderRedDot()}
      </S.ArtworkPurchaseNotificationContainer>
    );
  };

  const renderContent = () => {
    const notificationTypes: {[key in NotificationType]: () => ReactNode} = {
      [NotificationType.ARTWORK_PURCHASE]: renderArtworkPurchaseNotification,
      [NotificationType.POST_COMMENT]: renderPostCommentNotification,
    };

    const renderFunction = notificationTypes[notification.payload.notification_type as NotificationType];
    return renderFunction ? renderFunction() : null;
  };

  return (
    <S.Container $isRead={notification.is_read} className={className}>
      {renderContent()}
    </S.Container>
  );
};

export default Notification;
