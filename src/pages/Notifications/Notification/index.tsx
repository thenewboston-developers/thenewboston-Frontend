import {ReactNode, useId} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  mdiAccountPlus,
  mdiAt,
  mdiCommentText,
  mdiGamepadVariant,
  mdiHandCoin,
  mdiHeart,
  mdiSwapHorizontal,
} from '@mdi/js';
import MdiIcon from '@mdi/react';

import Avatar from 'components/Avatar';
import CurrencyLogo from 'components/CurrencyLogo';
import {updateNotification} from 'dispatchers/notifications';
import {ExchangeOrderSide, NotificationType} from 'enums';
import {getSelf} from 'selectors/state';
import {
  AppDispatch,
  CommentReadSerializer,
  CurrencyTinySerializer,
  Notification as TNotification,
  SFC,
  UserReadSerializer,
} from 'types';
import {NotificationPayload} from 'types/notifications';
import {getTimeAgo, longDate} from 'utils/dates';
import {getNotificationPath} from 'utils/notifications';
import {splitMentions} from 'utils/strings';
import {displayErrorToast} from 'utils/toasts';

import * as S from './Styles';

interface CommentSnapshot {
  content: string;
  mentionedUsernames?: string[];
  tip: {amount: number; currency: CurrencyTinySerializer} | null;
}

export interface NotificationProps {
  notification: TNotification;
}

interface NotificationView {
  actor?: Pick<UserReadSerializer, 'avatar' | 'id' | 'username'>;
  badge: {icon: string; kind: S.BadgeKind};
  body?: ReactNode;
  // Shown instead of the avatar of the actor
  leading?: ReactNode;
  summary: ReactNode;
}

interface PostPreview {
  // Names the post when it is the context of what happened rather than what happened
  label?: string;
  preview?: string;
  thumbnail?: string | null;
}

const CHALLENGE_GAME_NAMES: {[type: string]: string} = {
  [NotificationType.BACKGAMMON_CHALLENGE]: 'Backgammon',
  [NotificationType.BATTLESHIP_CHALLENGE]: 'Battleship',
  [NotificationType.CHECKERS_CHALLENGE]: 'Checkers',
  [NotificationType.CONNECT_FIVE_CHALLENGE]: 'Connect Five',
  [NotificationType.DOTS_AND_BOXES_CHALLENGE]: 'Dots and Boxes',
  [NotificationType.HEX_CHALLENGE]: 'Hex',
  [NotificationType.MANCALA_CHALLENGE]: 'Mancala',
  [NotificationType.REVERSI_CHALLENGE]: 'Reversi',
};

const formatMinutesPerPlayer = (seconds: number) => `${Math.round(seconds / 60)} min per player`;

const formatStake = (stakeAmount: number) => (stakeAmount ? `Stake ${stakeAmount.toLocaleString()} TNB` : 'Free match');

const getChallengeDetails = (payload: NotificationPayload): string[] => {
  switch (payload.notification_type) {
    case NotificationType.BACKGAMMON_CHALLENGE:
      return [
        formatStake(payload.stake_amount),
        `First to ${payload.target_score} ${payload.target_score === 1 ? 'point' : 'points'}`,
        formatMinutesPerPlayer(payload.time_limit_seconds),
      ];
    case NotificationType.CONNECT_FIVE_CHALLENGE:
      return [
        formatStake(payload.stake_amount),
        ...(payload.max_spend_amount ? [`Max spend ${payload.max_spend_amount.toLocaleString()} TNB`] : []),
        formatMinutesPerPlayer(payload.time_limit_seconds),
      ];
    case NotificationType.DOTS_AND_BOXES_CHALLENGE:
    case NotificationType.HEX_CHALLENGE:
      return [
        formatStake(payload.stake_amount),
        `${payload.board_size} × ${payload.board_size} board`,
        formatMinutesPerPlayer(payload.time_limit_seconds),
      ];
    case NotificationType.BATTLESHIP_CHALLENGE:
    case NotificationType.CHECKERS_CHALLENGE:
    case NotificationType.MANCALA_CHALLENGE:
    case NotificationType.REVERSI_CHALLENGE:
      return [formatStake(payload.stake_amount), formatMinutesPerPlayer(payload.time_limit_seconds)];
    default:
      return [];
  }
};

// Notifications created before January 2026 hold only the text of the comment, the oldest ones not even that
const getCommentSnapshot = (comment: CommentReadSerializer | string | undefined, preview?: string): CommentSnapshot => {
  if (comment && typeof comment === 'object') {
    const {content, mentioned_users, price_amount, price_currency} = comment;
    return {
      content,
      mentionedUsernames: mentioned_users?.map(({username}) => username),
      tip: price_amount && price_currency ? {amount: price_amount, currency: price_currency} : null,
    };
  }

  return {content: typeof comment === 'string' ? comment : preview || '', tip: null};
};

const Notification: SFC<NotificationProps> = ({className, notification}) => {
  const dispatch = useDispatch<AppDispatch>();
  const self = useSelector(getSelf);
  const summaryId = useId();
  const {created_date, id, is_read, payload} = notification;
  const path = getNotificationPath(payload);

  const getView = (): NotificationView | null => {
    switch (payload.notification_type) {
      case NotificationType.BACKGAMMON_CHALLENGE:
      case NotificationType.BATTLESHIP_CHALLENGE:
      case NotificationType.CHECKERS_CHALLENGE:
      case NotificationType.CONNECT_FIVE_CHALLENGE:
      case NotificationType.DOTS_AND_BOXES_CHALLENGE:
      case NotificationType.HEX_CHALLENGE:
      case NotificationType.MANCALA_CHALLENGE:
      case NotificationType.REVERSI_CHALLENGE:
        return {
          actor: payload.challenger,
          badge: {icon: mdiGamepadVariant, kind: 'neutral'},
          body: renderDetails(getChallengeDetails(payload)),
          summary: `challenged you to ${CHALLENGE_GAME_NAMES[payload.notification_type]}`,
        };
      case NotificationType.COMMENT_MENTION: {
        const {comment, comment_preview, mentioner, post_image_thumbnail, post_owner, post_preview} = payload;
        const postIsOwn = !!post_owner && post_owner.id === self.id;
        let postLabel = 'Post';
        if (postIsOwn) postLabel = 'Your post';
        else if (post_owner) postLabel = `${post_owner.username}'s post`;

        return {
          actor: mentioner,
          badge: {icon: mdiAt, kind: 'mention'},
          body: (
            <>
              {renderComment(getCommentSnapshot(comment, comment_preview), postIsOwn)}
              {renderPost({label: postLabel, preview: post_preview, thumbnail: post_image_thumbnail})}
            </>
          ),
          summary: 'mentioned you in a comment',
        };
      }
      case NotificationType.EXCHANGE_ORDER_FILLED: {
        const {primary_currency, price, quantity, secondary_currency, side} = payload;
        const isBuy = side === ExchangeOrderSide.BUY;
        const received = isBuy ? quantity : quantity * price;
        const receivedTicker = isBuy ? primary_currency.ticker : secondary_currency.ticker;

        return {
          badge: {icon: mdiSwapHorizontal, kind: 'neutral'},
          body: (
            <S.Secondary>
              You received {received.toLocaleString()} {receivedTicker}
            </S.Secondary>
          ),
          leading: <CurrencyLogo logo={primary_currency.logo} width="44px" />,
          summary: `Your order to ${isBuy ? 'buy' : 'sell'} ${quantity.toLocaleString()} ${
            primary_currency.ticker
          } was filled`,
        };
      }
      case NotificationType.POST_COIN_TRANSFER: {
        const {owner, post_image_thumbnail, post_preview, price_amount, price_currency_ticker} = payload;

        return {
          actor: owner,
          badge: {icon: mdiHandCoin, kind: 'money'},
          body: renderPost({preview: post_preview, thumbnail: post_image_thumbnail}),
          summary: (
            <>
              sent you{' '}
              <strong>
                {price_amount.toLocaleString()} {price_currency_ticker}
              </strong>{' '}
              with a post
            </>
          ),
        };
      }
      case NotificationType.POST_COMMENT: {
        const {comment, comment_preview, commenter, post_image_thumbnail, post_preview} = payload;

        return {
          actor: commenter,
          badge: {icon: mdiCommentText, kind: 'comment'},
          body: (
            <>
              {renderComment(getCommentSnapshot(comment, comment_preview), true)}
              {renderPost({label: 'Your post', preview: post_preview, thumbnail: post_image_thumbnail})}
            </>
          ),
          summary: 'commented on your post',
        };
      }
      case NotificationType.POST_LIKE:
        return {
          actor: payload.liker,
          badge: {icon: mdiHeart, kind: 'like'},
          body: renderPost({
            label: 'Your post',
            preview: payload.post_preview,
            thumbnail: payload.post_image_thumbnail,
          }),
          summary: 'liked your post',
        };
      case NotificationType.POST_MENTION:
        return {
          actor: payload.mentioner,
          badge: {icon: mdiAt, kind: 'mention'},
          body: renderPost({preview: payload.post_preview, thumbnail: payload.post_image_thumbnail}),
          summary: 'mentioned you in a post',
        };
      case NotificationType.PROFILE_FOLLOW:
        return {
          actor: payload.follower,
          badge: {icon: mdiAccountPlus, kind: 'neutral'},
          summary: 'started following you',
        };
      default:
        return null;
    }
  };

  const handleClick = async () => {
    if (is_read) return;

    try {
      await dispatch(updateNotification(id));
    } catch (error) {
      displayErrorToast('Failed to mark notification as read');
    }
  };

  const renderComment = ({content, mentionedUsernames, tip}: CommentSnapshot, tipIsForSelf: boolean) => {
    return (
      <>
        {content ? (
          <S.CommentBubble>
            <S.CommentText>{renderText(content, mentionedUsernames)}</S.CommentText>
          </S.CommentBubble>
        ) : null}
        {tip && tipIsForSelf ? (
          <S.Tip>
            <S.TipLogo alt="" src={tip.currency.logo} />
            Tipped you {tip.amount.toLocaleString()} {tip.currency.ticker}
          </S.Tip>
        ) : null}
      </>
    );
  };

  const renderDetails = (details: string[]) => {
    if (!details.length) return null;

    return (
      <S.Details>
        {details.map((detail) => (
          <S.Detail key={detail}>{detail}</S.Detail>
        ))}
      </S.Details>
    );
  };

  // The oldest notifications have neither a preview nor an image of the post, then the summary says enough
  const renderPost = ({label, preview, thumbnail}: PostPreview) => {
    if (!preview && !thumbnail) return null;

    return (
      <S.PostCard>
        <S.PostCardTextContainer>
          {label ? <S.PostCardLabel>{label}</S.PostCardLabel> : null}
          <S.PostCardText $isContext={!!label}>
            {preview ? renderText(preview) : <S.PostCardWithoutText>Photo</S.PostCardWithoutText>}
          </S.PostCardText>
        </S.PostCardTextContainer>
        {thumbnail ? <S.PostCardThumbnail alt="" src={thumbnail} /> : null}
      </S.PostCard>
    );
  };

  const renderText = (text: string, usernames?: string[]) => {
    return splitMentions(text, usernames).map((part, index) =>
      part.isMention ? <S.Mention key={index}>{part.text}</S.Mention> : part.text,
    );
  };

  const view = getView();
  if (!view) return null;

  const {actor, badge, body, leading, summary} = view;
  const profilePath = actor ? `/profile/${actor.id}` : '';

  return (
    <S.Container $isRead={is_read} className={className} onClick={handleClick}>
      {path ? <S.CardLink aria-labelledby={summaryId} to={path} /> : null}
      <S.Leading>
        {leading ??
          (actor ? (
            <S.AvatarLink aria-hidden="true" tabIndex={-1} to={profilePath}>
              <Avatar size="44px" src={actor.avatar} />
            </S.AvatarLink>
          ) : null)}
        <S.Badge $kind={badge.kind} aria-hidden="true">
          <MdiIcon path={badge.icon} size="12px" />
        </S.Badge>
      </S.Leading>
      <S.Main>
        <S.Header>
          <S.SummaryContainer>
            <S.Summary id={summaryId}>
              {actor ? (
                <>
                  <S.ActorLink to={profilePath}>{actor.username}</S.ActorLink>{' '}
                </>
              ) : null}
              {summary}
            </S.Summary>
            <S.Time dateTime={new Date(created_date).toISOString()} title={longDate(created_date)}>
              {getTimeAgo(created_date)}
            </S.Time>
          </S.SummaryContainer>
          {is_read ? null : (
            <S.UnreadDot>
              <S.VisuallyHidden>Unread</S.VisuallyHidden>
            </S.UnreadDot>
          )}
        </S.Header>
        {body ? <S.Body>{body}</S.Body> : null}
      </S.Main>
    </S.Container>
  );
};

export default Notification;
