import {ReactNode} from 'react';
import {Link} from 'react-router-dom';
import {mdiBrush} from '@mdi/js';
import Icon from '@mdi/react';

import Avatar from 'components/Avatar';
import {Notification as TNotification, SFC} from 'types';
import * as S from './Styles';

enum NotificationType {
  ARTWORK_PURCHASE = 'ARTWORK_PURCHASE',
}

export interface NotificationProps {
  notification: TNotification;
}

const Notification: SFC<NotificationProps> = ({className, notification}) => {
  const renderArtworkPurchaseNotification = () => {
    return (
      <>
        <Icon path={mdiBrush} size="36px" />
        <div>
          <Link to={`/profile/${notification.payload.buyer.id}`}>
            <Avatar src={notification.payload.buyer.avatar} />
          </Link>
          <S.TextContainer>
            <S.Link to={`/profile/${notification.payload.buyer.id}`}>{notification.payload.buyer.username}</S.Link>{' '}
            purchased your <S.Link to={`/art/artworks/${notification.payload.artwork_id}`}>artwork</S.Link>.
          </S.TextContainer>
        </div>
      </>
    );
  };

  const renderContent = () => {
    const notificationTypes: {[key in NotificationType]: () => ReactNode} = {
      [NotificationType.ARTWORK_PURCHASE]: renderArtworkPurchaseNotification,
    };

    const renderFunction = notificationTypes[notification.payload.notification_type as NotificationType];
    return renderFunction ? renderFunction() : null;
  };

  return <S.Container className={className}>{renderContent()}</S.Container>;
};

export default Notification;
