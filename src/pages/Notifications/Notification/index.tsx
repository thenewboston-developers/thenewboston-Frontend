import {ReactNode} from 'react';
import {useDispatch} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import {mdiContentCopy, mdiHeart, mdiSwapHorizontal, mdiWalletBifoldOutline} from '@mdi/js';

import Avatar from 'components/Avatar';
import CurrencyLogo from 'components/CurrencyLogo';
import {updateNotification} from 'dispatchers/notifications';
import {ExchangeOrderSide, NotificationType} from 'enums';
import {AppDispatch, Notification as TNotification, SFC} from 'types';
import {longDate} from 'utils/dates';
import {displayErrorToast} from 'utils/toasts';

import * as S from './Styles';

export interface NotificationProps {
  notification: TNotification;
}

const Notification: SFC<NotificationProps> = ({className, notification}) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleContainerClick = async () => {
    if (!notification.is_read) {
      try {
        await dispatch(updateNotification(notification.id));
      } catch (error) {
        displayErrorToast('Failed to mark notification as read');
      }
    }

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

  const renderExchangeOrderFilledNotification = () => {
    if (notification.payload.notification_type !== NotificationType.EXCHANGE_ORDER_FILLED) return null;

    const {side, price, primary_currency, quantity, secondary_currency} = notification.payload;
    const action = side === ExchangeOrderSide.BUY ? 'buy' : 'sell';

    const totalReceived = side === ExchangeOrderSide.BUY ? quantity : quantity * price;
    const receivedTicker = side === ExchangeOrderSide.BUY ? primary_currency.ticker : secondary_currency.ticker;

    return (
      <S.NotificationContainer>
        <Link to={`/currencies/${primary_currency.id}`}>
          <S.CurrencyLogoContainer>
            <CurrencyLogo logo={primary_currency.logo} width="45px" />
            <S.ExchangeIcon path={mdiSwapHorizontal} size="23px" />
          </S.CurrencyLogoContainer>
        </Link>
        <S.TextContainer>
          <div>
            Your order to {action} {quantity.toLocaleString()} {primary_currency.ticker} was filled. You received a
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

  return (
    <S.Container $isRead={notification.is_read} className={className} onClick={handleContainerClick}>
      {renderContent()}
    </S.Container>
  );
};

export default Notification;
