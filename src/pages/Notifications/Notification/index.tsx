import {ReactNode} from 'react';
import {useDispatch} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import {
  mdiAccountPlus,
  mdiAt,
  mdiContentCopy,
  mdiGamepadVariantOutline,
  mdiHeart,
  mdiSwapHorizontal,
  mdiWalletBifoldOutline,
} from '@mdi/js';

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
    if (notification.payload.notification_type === NotificationType.CHECKERS_CHALLENGE) {
      navigate(`/checkers/matches/${notification.payload.match_id}`);
      return;
    }
    if (notification.payload.notification_type === NotificationType.BATTLESHIP_CHALLENGE) {
      navigate(`/battleship/matches/${notification.payload.match_id}`);
      return;
    }
    if (notification.payload.notification_type === NotificationType.BACKGAMMON_CHALLENGE) {
      navigate(`/backgammon/matches/${notification.payload.match_id}`);
      return;
    }
    if (notification.payload.notification_type === NotificationType.REVERSI_CHALLENGE) {
      navigate(`/reversi/matches/${notification.payload.match_id}`);
      return;
    }
    if (
      notificationType === NotificationType.COMMENT_MENTION ||
      notificationType === NotificationType.CONNECT_FIVE_CHALLENGE ||
      notificationType === NotificationType.POST_COMMENT ||
      notificationType === NotificationType.POST_COIN_TRANSFER ||
      notificationType === NotificationType.POST_LIKE ||
      notificationType === NotificationType.POST_MENTION
    ) {
      const {payload} = notification;
      if (notificationType === NotificationType.CONNECT_FIVE_CHALLENGE && 'challenge_id' in payload) {
        navigate('/connect-five/home');
        return;
      }
      if ('post_id' in payload) {
        navigate(`/posts/${payload.post_id}`);
      }
    }
  };

  const renderBackgammonChallengeNotification = () => {
    if (notification.payload.notification_type !== NotificationType.BACKGAMMON_CHALLENGE) return null;

    const {challenger, match_id, stake_amount, target_score, time_limit_seconds} = notification.payload;

    return (
      <S.NotificationContainer>
        <Link to={`/backgammon/matches/${match_id}`}>
          <S.AvatarContainer>
            <Avatar size="45px" src={challenger.avatar} />
            <S.AvatarIcon path={mdiGamepadVariantOutline} size="23px" />
          </S.AvatarContainer>
        </Link>
        <S.TextContainer>
          <S.MainText>
            <S.Link onClick={(event) => event.stopPropagation()} to={`/profile/${challenger.id}`}>
              {challenger.username}
            </S.Link>{' '}
            challenged you to Backgammon
          </S.MainText>
          <S.PostPreviewText>
            {stake_amount ? `Fixed stake: ${stake_amount.toLocaleString()} TNB` : 'Free match'} · First to{' '}
            {target_score} {target_score === 1 ? 'point' : 'points'} · {time_limit_seconds / 60} min per player
          </S.PostPreviewText>
          <S.TimeStamp>{longDate(notification.created_date)}</S.TimeStamp>
        </S.TextContainer>
        {renderRedDot()}
      </S.NotificationContainer>
    );
  };

  const renderBattleshipChallengeNotification = () => {
    if (notification.payload.notification_type !== NotificationType.BATTLESHIP_CHALLENGE) return null;

    const {challenger, match_id, stake_amount, time_limit_seconds} = notification.payload;

    return (
      <S.NotificationContainer>
        <Link to={`/battleship/matches/${match_id}`}>
          <S.AvatarContainer>
            <Avatar size="45px" src={challenger.avatar} />
            <S.AvatarIcon path={mdiGamepadVariantOutline} size="23px" />
          </S.AvatarContainer>
        </Link>
        <S.TextContainer>
          <S.MainText>
            <S.Link onClick={(event) => event.stopPropagation()} to={`/profile/${challenger.id}`}>
              {challenger.username}
            </S.Link>{' '}
            challenged you to Battleship
          </S.MainText>
          <S.PostPreviewText>
            {stake_amount ? `Fixed stake: ${stake_amount.toLocaleString()} TNB` : 'Free match'} ·{' '}
            {time_limit_seconds / 60} min per player
          </S.PostPreviewText>
          <S.TimeStamp>{longDate(notification.created_date)}</S.TimeStamp>
        </S.TextContainer>
        {renderRedDot()}
      </S.NotificationContainer>
    );
  };

  const renderCheckersChallengeNotification = () => {
    if (notification.payload.notification_type !== NotificationType.CHECKERS_CHALLENGE) return null;

    const {challenger, match_id, stake_amount, time_limit_seconds} = notification.payload;

    return (
      <S.NotificationContainer>
        <Link to={`/checkers/matches/${match_id}`}>
          <S.AvatarContainer>
            <Avatar size="45px" src={challenger.avatar} />
            <S.AvatarIcon path={mdiGamepadVariantOutline} size="23px" />
          </S.AvatarContainer>
        </Link>
        <S.TextContainer>
          <S.MainText>
            <S.Link onClick={(event) => event.stopPropagation()} to={`/profile/${challenger.id}`}>
              {challenger.username}
            </S.Link>{' '}
            challenged you to Checkers
          </S.MainText>
          <S.PostPreviewText>
            {stake_amount ? `Fixed stake: ${stake_amount.toLocaleString()} TNB` : 'Free match'} ·{' '}
            {time_limit_seconds / 60} min per player
          </S.PostPreviewText>
          <S.TimeStamp>{longDate(notification.created_date)}</S.TimeStamp>
        </S.TextContainer>
        {renderRedDot()}
      </S.NotificationContainer>
    );
  };

  const renderContent = () => {
    const notificationTypes: {[key in NotificationType]: () => ReactNode} = {
      [NotificationType.BACKGAMMON_CHALLENGE]: renderBackgammonChallengeNotification,
      [NotificationType.BATTLESHIP_CHALLENGE]: renderBattleshipChallengeNotification,
      [NotificationType.CHECKERS_CHALLENGE]: renderCheckersChallengeNotification,
      [NotificationType.COMMENT_MENTION]: renderCommentMentionNotification,
      [NotificationType.CONNECT_FIVE_CHALLENGE]: renderConnectFiveChallengeNotification,
      [NotificationType.EXCHANGE_ORDER_FILLED]: renderExchangeOrderFilledNotification,
      [NotificationType.POST_COIN_TRANSFER]: renderPostCoinTransferNotification,
      [NotificationType.POST_COMMENT]: renderPostCommentNotification,
      [NotificationType.POST_LIKE]: renderPostLikeNotification,
      [NotificationType.POST_MENTION]: renderPostMentionNotification,
      [NotificationType.PROFILE_FOLLOW]: renderProfileFollowNotification,
      [NotificationType.REVERSI_CHALLENGE]: renderReversiChallengeNotification,
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

  const renderCommentMentionNotification = () => {
    if (notification.payload.notification_type !== NotificationType.COMMENT_MENTION) return null;

    const {comment_preview, mentioner, post_created, post_image_thumbnail, post_preview} = notification.payload;

    return (
      <S.NotificationContainer>
        <Link to={`/profile/${mentioner.id}`} onClick={(e) => e.stopPropagation()}>
          <S.AvatarContainer>
            <Avatar src={mentioner.avatar} size="45px" />
            <S.AvatarIcon path={mdiAt} size="23px" />
          </S.AvatarContainer>
        </Link>
        <S.TextContainer>
          <S.MainText>
            <S.Link to={`/profile/${mentioner.id}`} onClick={(e) => e.stopPropagation()}>
              {mentioner.username}
            </S.Link>{' '}
            mentioned you in a comment:
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

  const renderPostMentionNotification = () => {
    if (notification.payload.notification_type !== NotificationType.POST_MENTION) return null;

    const {mentioner, post_created, post_image_thumbnail, post_preview} = notification.payload;

    return (
      <S.NotificationContainer>
        <Link to={`/profile/${mentioner.id}`} onClick={(e) => e.stopPropagation()}>
          <S.AvatarContainer>
            <Avatar src={mentioner.avatar} size="45px" />
            <S.AvatarIcon path={mdiAt} size="23px" />
          </S.AvatarContainer>
        </Link>
        <S.TextContainer>
          <S.MainText>
            <S.Link to={`/profile/${mentioner.id}`} onClick={(e) => e.stopPropagation()}>
              {mentioner.username}
            </S.Link>{' '}
            mentioned you in a post:
          </S.MainText>
          <S.PostPreviewText>{post_preview}</S.PostPreviewText>
          <S.TimeStamp>{longDate(post_created)}</S.TimeStamp>
        </S.TextContainer>
        {post_image_thumbnail && <S.PostThumbnail alt="Post thumbnail" src={post_image_thumbnail} />}
        {renderRedDot()}
      </S.NotificationContainer>
    );
  };

  const renderProfileFollowNotification = () => {
    if (notification.payload.notification_type !== NotificationType.PROFILE_FOLLOW) return null;

    const {follower} = notification.payload;

    return (
      <S.NotificationContainer>
        <Link to={`/profile/${follower.id}`} onClick={(e) => e.stopPropagation()}>
          <S.AvatarContainer>
            <Avatar src={follower.avatar} size="45px" />
            <S.AvatarIcon path={mdiAccountPlus} size="23px" />
          </S.AvatarContainer>
        </Link>
        <S.TextContainer>
          <S.MainText>
            <S.Link to={`/profile/${follower.id}`} onClick={(e) => e.stopPropagation()}>
              {follower.username}
            </S.Link>{' '}
            followed you
          </S.MainText>
          <S.TimeStamp>{longDate(notification.created_date)}</S.TimeStamp>
        </S.TextContainer>
        {renderRedDot()}
      </S.NotificationContainer>
    );
  };

  const renderConnectFiveChallengeNotification = () => {
    if (notification.payload.notification_type !== NotificationType.CONNECT_FIVE_CHALLENGE) return null;

    const {challenger, max_spend_amount, stake_amount, time_limit_seconds} = notification.payload;
    const minutes = Math.round(time_limit_seconds / 60);

    return (
      <S.NotificationContainer>
        <Link to="/connect-five/home">
          <S.AvatarContainer>
            <Avatar src={challenger.avatar} size="45px" />
            <S.AvatarIcon path={mdiGamepadVariantOutline} size="23px" />
          </S.AvatarContainer>
        </Link>
        <S.TextContainer>
          <S.MainText>
            <S.Link to={`/profile/${challenger.id}`} onClick={(e) => e.stopPropagation()}>
              {challenger.username}
            </S.Link>{' '}
            challenged you to Connect 5
          </S.MainText>
          <S.PostPreviewText>
            Stake: {stake_amount.toLocaleString()} TNB · Max spend: {max_spend_amount.toLocaleString()} TNB · Time:{' '}
            {minutes} min
          </S.PostPreviewText>
          <S.TimeStamp>{longDate(notification.created_date)}</S.TimeStamp>
        </S.TextContainer>
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

  const renderReversiChallengeNotification = () => {
    if (notification.payload.notification_type !== NotificationType.REVERSI_CHALLENGE) return null;

    const {challenger, match_id, stake_amount, time_limit_seconds} = notification.payload;

    return (
      <S.NotificationContainer>
        <Link to={`/reversi/matches/${match_id}`}>
          <S.AvatarContainer>
            <Avatar size="45px" src={challenger.avatar} />
            <S.AvatarIcon path={mdiGamepadVariantOutline} size="23px" />
          </S.AvatarContainer>
        </Link>
        <S.TextContainer>
          <S.MainText>
            <S.Link onClick={(event) => event.stopPropagation()} to={`/profile/${challenger.id}`}>
              {challenger.username}
            </S.Link>{' '}
            challenged you to Reversi
          </S.MainText>
          <S.PostPreviewText>
            {stake_amount ? `Fixed stake: ${stake_amount.toLocaleString()} TNB` : 'Free match'} ·{' '}
            {time_limit_seconds / 60} min per player
          </S.PostPreviewText>
          <S.TimeStamp>{longDate(notification.created_date)}</S.TimeStamp>
        </S.TextContainer>
        {renderRedDot()}
      </S.NotificationContainer>
    );
  };

  return (
    <S.Container $isRead={notification.is_read} className={className} onClick={handleContainerClick}>
      {renderContent()}
    </S.Container>
  );
};

export default Notification;
