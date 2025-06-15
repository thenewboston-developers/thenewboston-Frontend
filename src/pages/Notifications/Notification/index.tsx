import {ReactNode} from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {mdiContentCopy, mdiHeart, mdiSwapHorizontal} from '@mdi/js';

import Avatar from 'components/Avatar';
import CurrencyLogo from 'components/CurrencyLogo';
import {NotificationType} from 'enums';
import {getCurrencies} from 'selectors/state';
import {Notification as TNotification, SFC} from 'types';
import {longDate} from 'utils/dates';

import * as S from './Styles';

export interface NotificationProps {
  notification: TNotification;
}

const Notification: SFC<NotificationProps> = ({className, notification}) => {
  const currencies = useSelector(getCurrencies);

  const renderRedDot = () => {
    return notification.is_read ? null : (
      <S.DotContainer>
        <S.Dot />
      </S.DotContainer>
    );
  };

  const renderPostCommentNotification = () => {
    if (notification.payload.notification_type !== NotificationType.POST_COMMENT) return null;

    return (
      <S.NotificationContainer>
        <Link to={`/profile/${notification.payload.commenter.id}`}>
          <Avatar src={notification.payload.commenter.avatar} size="45px" />
          <S.AvatarIcon path={mdiContentCopy} size="23px" />
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

  const renderExchangeOrderFilledNotification = () => {
    if (notification.payload.notification_type !== NotificationType.EXCHANGE_ORDER_FILLED) return null;

    const {order_type, price, primary_currency_id, primary_currency_ticker, quantity, secondary_currency_ticker} =
      notification.payload;
    const action = order_type === 'BUY' ? 'buy' : 'sell';

    const totalReceived = order_type === 'BUY' ? quantity : quantity * price;
    const receivedTicker = order_type === 'BUY' ? primary_currency_ticker : secondary_currency_ticker;

    const primaryCurrency = currencies[primary_currency_id];

    return (
      <S.NotificationContainer>
        {primaryCurrency?.logo ? (
          <S.CurrencyLogoContainer>
            <CurrencyLogo logo={primaryCurrency.logo} width="45px" />
            <S.ExchangeIcon path={mdiSwapHorizontal} size="23px" />
          </S.CurrencyLogoContainer>
        ) : (
          <S.ExchangeIconContainer>
            <S.ExchangeIcon path={mdiSwapHorizontal} size="23px" />
          </S.ExchangeIconContainer>
        )}
        <S.TextContainer>
          <div>
            Your order to {action} {quantity.toLocaleString()} {primary_currency_ticker} was filled. You received a
            total of {totalReceived.toLocaleString()} {receivedTicker}.
          </div>
          <S.TimeStamp>{longDate(notification.created_date)}</S.TimeStamp>
        </S.TextContainer>
        {renderRedDot()}
      </S.NotificationContainer>
    );
  };

  const renderPostLikeNotification = () => {
    if (notification.payload.notification_type !== NotificationType.POST_LIKE) return null;

    return (
      <S.NotificationContainer>
        <Link to={`/profile/${notification.payload.liker.id}`}>
          <Avatar src={notification.payload.liker.avatar} size="45px" />
          <S.AvatarIcon path={mdiHeart} size="23px" />
        </Link>
        <S.TextContainer>
          <div>
            <S.Link to={`/profile/${notification.payload.liker.id}`}>{notification.payload.liker.username}</S.Link>{' '}
            liked your <strong>Post</strong>
          </div>
          <S.TimeStamp>{longDate(notification.created_date)}</S.TimeStamp>
        </S.TextContainer>
        {renderRedDot()}
      </S.NotificationContainer>
    );
  };

  const renderContent = () => {
    const notificationTypes: {[key in NotificationType]: () => ReactNode} = {
      [NotificationType.EXCHANGE_ORDER_FILLED]: renderExchangeOrderFilledNotification,
      [NotificationType.POST_COMMENT]: renderPostCommentNotification,
      [NotificationType.POST_LIKE]: renderPostLikeNotification,
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
