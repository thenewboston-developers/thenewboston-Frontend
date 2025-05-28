import {ReactNode} from 'react';
import {Link} from 'react-router-dom';
import {mdiContentCopy} from '@mdi/js';

import Avatar from 'components/Avatar';
import {Notification as TNotification, SFC} from 'types';
import {longDate} from 'utils/dates';

import * as S from './Styles';

enum NotificationType {
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

  const renderPostCommentNotification = () => {
    return (
      <S.NotificationContainer>
        <Link to={`/profile/${notification.payload.commenter.id}`}>
          <Avatar src={notification.payload.commenter.avatar} size="45px" />
          <S.Icon path={mdiContentCopy} size="23px" />
        </Link>
        <S.TextContainer>
          <div>
            <S.Link to={`/profile/${notification.payload.commenter.id}`}>
              {notification.payload.commenter.username}
            </S.Link>{' '}
            commented on your <strong>Post</strong>: "{notification.payload.comment}"
          </div>
          <S.TimeStamp>{longDate(notification.created_date)}</S.TimeStamp>
        </S.TextContainer>
        {renderRedDot()}
      </S.NotificationContainer>
    );
  };

  const renderContent = () => {
    const notificationTypes: {[key in NotificationType]: () => ReactNode} = {
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
