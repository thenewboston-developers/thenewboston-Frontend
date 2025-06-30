import {ReactNode} from 'react';
import {useSelector} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import {mdiContentCopy, mdiHeart, mdiSwapHorizontal, mdiWalletBifoldOutline} from '@mdi/js';

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
  const navigate = useNavigate();

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
          <Link to={`/currencies/${primary_currency_id}`}>
            <S.CurrencyLogoContainer>
              <CurrencyLogo logo={primaryCurrency.logo} width="45px" />
              <S.ExchangeIcon path={mdiSwapHorizontal} size="23px" />
            </S.CurrencyLogoContainer>
          </Link>
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

  const renderPostCoinTransferNotification = () => {
    if (notification.payload.notification_type !== NotificationType.POST_COIN_TRANSFER) return null;

    const {owner, post_created, post_image_thumbnail, post_preview, price_amount, price_currency_ticker} =
      notification.payload;

    return (
      <S.NotificationContainer>
        <Link to={`/profile/${owner.id}`} onClick={(e) => e.stopPropagation()}>
          <S.AvatarContainer>
            <Avatar src={owner.avatar} size="45px" />
            <S.AvatarIcon path={mdiWalletBifoldOutline} size="23px" />
          </S.AvatarContainer>
        </Link>
        <S.TextContainer>
          <S.MainText>
            <S.Link to={`/profile/${owner.id}`} onClick={(e) => e.stopPropagation()}>
              {owner.username}
            </S.Link>{' '}
            sent you {price_amount.toLocaleString()} {price_currency_ticker} via a post:
          </S.MainText>
          <S.PostPreviewText>{post_preview}</S.PostPreviewText>
          <S.TimeStamp>{longDate(post_created)}</S.TimeStamp>
        </S.TextContainer>
        {post_image_thumbnail && <S.PostThumbnail alt="Post thumbnail" src={post_image_thumbnail} />}
        {renderRedDot()}
      </S.NotificationContainer>
    );
  };

  const renderPostCommentNotification = () => {
    if (notification.payload.notification_type !== NotificationType.POST_COMMENT) return null;

    const {comment_preview, commenter, post_created, post_image_thumbnail, post_preview} = notification.payload;

    return (
      <S.NotificationContainer>
        <Link to={`/profile/${commenter.id}`} onClick={(e) => e.stopPropagation()}>
          <S.AvatarContainer>
            <Avatar src={commenter.avatar} size="45px" />
            <S.AvatarIcon path={mdiContentCopy} size="23px" />
          </S.AvatarContainer>
        </Link>
        <S.TextContainer>
          <S.MainText>
            <S.Link to={`/profile/${commenter.id}`} onClick={(e) => e.stopPropagation()}>
              {commenter.username}
            </S.Link>{' '}
            commented on your post
          </S.MainText>
          <S.PostPreviewText>{post_preview}</S.PostPreviewText>
          <S.CommentText>{comment_preview}</S.CommentText>
          <S.TimeStamp>{longDate(post_created)}</S.TimeStamp>
        </S.TextContainer>
        {post_image_thumbnail && <S.PostThumbnail alt="Post thumbnail" src={post_image_thumbnail} />}
        {renderRedDot()}
      </S.NotificationContainer>
    );
  };

  const renderPostLikeNotification = () => {
    if (notification.payload.notification_type !== NotificationType.POST_LIKE) return null;

    const {liker, post_created, post_image_thumbnail, post_preview} = notification.payload;

    return (
      <S.NotificationContainer>
        <Link to={`/profile/${liker.id}`} onClick={(e) => e.stopPropagation()}>
          <S.AvatarContainer>
            <Avatar src={liker.avatar} size="45px" />
            <S.AvatarIcon path={mdiHeart} size="23px" />
          </S.AvatarContainer>
        </Link>
        <S.TextContainer>
          <S.MainText>
            <S.Link to={`/profile/${liker.id}`} onClick={(e) => e.stopPropagation()}>
              {liker.username}
            </S.Link>{' '}
            liked your post:
          </S.MainText>
          <S.PostPreviewText>{post_preview}</S.PostPreviewText>
          <S.TimeStamp>{longDate(post_created)}</S.TimeStamp>
        </S.TextContainer>
        {post_image_thumbnail && <S.PostThumbnail alt="Post thumbnail" src={post_image_thumbnail} />}
        {renderRedDot()}
      </S.NotificationContainer>
    );
  };

  const renderRedDot = () => {
    return notification.is_read ? null : (
      <S.DotContainer>
        <S.Dot />
      </S.DotContainer>
    );
  };

  const renderContent = () => {
    const notificationTypes: {[key in NotificationType]: () => ReactNode} = {
      [NotificationType.EXCHANGE_ORDER_FILLED]: renderExchangeOrderFilledNotification,
      [NotificationType.POST_COIN_TRANSFER]: renderPostCoinTransferNotification,
      [NotificationType.POST_COMMENT]: renderPostCommentNotification,
      [NotificationType.POST_LIKE]: renderPostLikeNotification,
    };

    const renderFunction = notificationTypes[notification.payload.notification_type as NotificationType];
    return renderFunction ? renderFunction() : null;
  };

  const handleContainerClick = () => {
    const notificationType = notification.payload.notification_type;
    if (
      notificationType === NotificationType.POST_LIKE ||
      notificationType === NotificationType.POST_COMMENT ||
      notificationType === NotificationType.POST_COIN_TRANSFER
    ) {
      const {payload} = notification;
      if ('post_id' in payload) {
        navigate(`/posts/${payload.post_id}`);
      }
    }
  };

  return (
    <S.Container $isRead={notification.is_read} className={className} onClick={handleContainerClick}>
      {renderContent()}
    </S.Container>
  );
};

export default Notification;
