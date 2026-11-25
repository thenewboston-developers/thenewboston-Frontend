import {NotificationType} from 'enums';
import {NotificationPayload} from 'types/notifications';
import {getNotificationPath} from 'utils/notifications';
import {getPostDetailPath} from 'utils/urls';

const user = {avatar: null, id: 7, username: 'demo_maya'};

const path = (payload: object) => getNotificationPath(payload as NotificationPayload);

describe('getNotificationPath', () => {
  it('opens the comment of a comment notification on its post', () => {
    expect(
      path({comment: {id: 12}, commenter: user, notification_type: NotificationType.POST_COMMENT, post_id: 4}),
    ).toBe('/posts/4?comment=12');
    expect(
      path({
        comment: {id: 13},
        comment_id: 13,
        mentioner: user,
        notification_type: NotificationType.COMMENT_MENTION,
        post_id: 4,
      }),
    ).toBe('/posts/4?comment=13');
  });

  it('opens only the post when an older comment notification holds just the text of the comment', () => {
    expect(path({comment: 'Nice', commenter: user, notification_type: NotificationType.POST_COMMENT, post_id: 4})).toBe(
      '/posts/4',
    );
  });

  it('opens the post of likes, mentions in posts and coins sent with a post', () => {
    expect(path({liker: user, notification_type: NotificationType.POST_LIKE, post_id: 5})).toBe('/posts/5');
    expect(path({mentioner: user, notification_type: NotificationType.POST_MENTION, post_id: 6})).toBe('/posts/6');
    expect(path({notification_type: NotificationType.POST_COIN_TRANSFER, owner: user, post_id: 8})).toBe('/posts/8');
  });

  it('opens the profile of a new follower', () => {
    expect(path({follower: user, notification_type: NotificationType.PROFILE_FOLLOW})).toBe('/profile/7');
  });

  it('opens the match or challenge of a game challenge', () => {
    expect(path({match_id: 3, notification_type: NotificationType.DOTS_AND_BOXES_CHALLENGE})).toBe(
      '/dots-and-boxes/matches/3',
    );
    expect(path({match_id: 9, notification_type: NotificationType.REVERSI_CHALLENGE})).toBe('/reversi/matches/9');
    expect(path({challenge_id: 21, notification_type: NotificationType.CONNECT_FIVE_CHALLENGE})).toBe(
      '/connect-five/challenges/21',
    );
    expect(path({notification_type: NotificationType.CONNECT_FIVE_CHALLENGE})).toBe('/connect-five/home');
  });

  it('opens the orders of a filled exchange order and nothing for unknown types', () => {
    expect(path({notification_type: NotificationType.EXCHANGE_ORDER_FILLED})).toBe('/exchange/orders');
    expect(path({notification_type: 'SOMETHING_NEW'})).toBeNull();
  });
});

describe('getPostDetailPath', () => {
  it('names the comment to highlight only when there is one', () => {
    expect(getPostDetailPath(4, 12)).toBe('/posts/4?comment=12');
    expect(getPostDetailPath(4)).toBe('/posts/4');
    expect(getPostDetailPath(4, null)).toBe('/posts/4');
  });
});
