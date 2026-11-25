import {act} from 'react';
import {createRoot, Root} from 'react-dom/client';
import {useDispatch, useSelector} from 'react-redux';
import {MemoryRouter} from 'react-router-dom';

import {updateNotification} from 'dispatchers/notifications';
import {NotificationType} from 'enums';
import {Notification as TNotification} from 'types';

import Notification from '.';

jest.mock('axios', () => ({}));
jest.mock('dispatchers/notifications', () => ({updateNotification: jest.fn()}));
jest.mock('react-redux', () => ({useDispatch: jest.fn(), useSelector: jest.fn()}));
jest.mock('utils/toasts', () => ({displayErrorToast: jest.fn()}));

(globalThis as {IS_REACT_ACT_ENVIRONMENT?: boolean}).IS_REACT_ACT_ENVIRONMENT = true;

const SELF_ID = 1;
const commenter = {avatar: null, id: 3, username: 'demo_maya'};
const currency = {id: 1, logo: 'https://example.com/tnb.png', ticker: 'TNB'};
const comment = {
  content: 'Where was this taken? @bucky',
  created_date: '2026-11-24T12:00:00Z',
  id: 12,
  mentioned_users: [{avatar: null, id: SELF_ID, username: 'bucky'}],
  modified_date: '2026-11-24T12:00:00Z',
  owner: commenter,
  post: 4,
  price_amount: 25,
  price_currency: currency,
};

let container: HTMLDivElement;
let dispatch: jest.Mock;
let root: Root;

const buildNotification = (payload: object, overrides: Partial<TNotification> = {}) =>
  ({
    created_date: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    id: 99,
    is_read: false,
    modified_date: new Date().toISOString(),
    owner: SELF_ID,
    payload,
    ...overrides,
  }) as unknown as TNotification;

const render = async (notification: TNotification) => {
  await act(async () =>
    root.render(
      <MemoryRouter future={{v7_relativeSplatPath: true, v7_startTransition: true}}>
        <Notification notification={notification} />
      </MemoryRouter>,
    ),
  );
};

const query = (selector: string) => container.querySelector(selector) as HTMLElement;

// The innermost element that holds exactly the text
const findByText = (text: string) =>
  Array.from(container.querySelectorAll<HTMLElement>('*'))
    .reverse()
    .find((element) => element.textContent === text)!;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);
  dispatch = jest.fn();
  (useDispatch as unknown as jest.Mock).mockReturnValue(dispatch);
  (useSelector as unknown as jest.Mock).mockImplementation((selector) => selector({self: {id: SELF_ID}}));
  (updateNotification as jest.Mock).mockImplementation((id) => ({id, type: 'updateNotification'}));
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
});

describe('comment on your post', () => {
  const payload = {
    comment,
    comment_preview: 'Where was this taken? @bucky',
    commenter,
    notification_type: NotificationType.POST_COMMENT,
    post_created: '2025-01-01T00:00:00Z',
    post_id: 4,
    post_image_thumbnail: 'https://example.com/photo.png',
    post_preview: 'Sunset over the lake',
  };

  it('tells the comment apart from the post it was left on', async () => {
    await render(buildNotification(payload));

    expect(query('article').textContent).toBe(
      'demo_maya commented on your post5 minutes agoUnread' +
        'Where was this taken? @bucky' +
        'Tipped you 25 TNB' +
        'Your postSunset over the lake',
    );
    const postCard = findByText('Your post').parentElement!.parentElement!;
    expect(postCard).toHaveTextContent(/^Your postSunset over the lake$/);
    expect(postCard.querySelector('img')).toHaveAttribute('src', payload.post_image_thumbnail);
    expect(findByText('Where was this taken? @bucky')).not.toBe(postCard);
    expect(postCard).not.toContainElement(findByText('Where was this taken? @bucky'));
  });

  it('dates the notification by the comment, not by the post', async () => {
    const notification = buildNotification(payload);
    await render(notification);

    const time = query('time');
    expect(time).toHaveTextContent('5 minutes ago');
    expect(time).toHaveAttribute('dateTime', notification.created_date);
  });

  it('opens the comment on the post and marks the notification as read', async () => {
    await render(buildNotification(payload));

    const link = query('a[aria-labelledby]');
    expect(link).toHaveAttribute('href', '/posts/4?comment=12');
    expect(document.getElementById(link.getAttribute('aria-labelledby')!)).toHaveTextContent(
      'demo_maya commented on your post',
    );

    await act(async () => link.click());
    expect(updateNotification).toHaveBeenCalledWith(99);
    expect(dispatch).toHaveBeenCalledWith({id: 99, type: 'updateNotification'});
  });

  it('does not mark a read notification again', async () => {
    await render(buildNotification(payload, {is_read: true}));

    await act(async () => query('a[aria-labelledby]').click());
    expect(dispatch).not.toHaveBeenCalled();
    expect(container).not.toHaveTextContent('Unread');
  });

  it('shows older notifications that hold only the text of the comment', async () => {
    await render(
      buildNotification({
        comment: 'Old style comment',
        commenter,
        notification_type: NotificationType.POST_COMMENT,
        post_id: 4,
      }),
    );

    expect(container).toHaveTextContent('demo_maya commented on your post');
    expect(container).toHaveTextContent('Old style comment');
    expect(container).not.toHaveTextContent('Your post');
    expect(container).not.toHaveTextContent('Tipped');
    expect(query('a[aria-labelledby]')).toHaveAttribute('href', '/posts/4');
  });
});

describe('mention in a comment', () => {
  const buildMention = (postOwner?: {id: number; username: string}) =>
    buildNotification({
      comment,
      comment_id: 12,
      comment_preview: comment.content,
      mentioner: commenter,
      notification_type: NotificationType.COMMENT_MENTION,
      post_created: '2025-01-01T00:00:00Z',
      post_id: 4,
      post_image_thumbnail: null,
      post_owner: postOwner,
      post_preview: 'Sunset over the lake',
    });

  it('names your own post and the tip you received', async () => {
    await render(buildMention({id: SELF_ID, username: 'bucky'}));

    expect(container).toHaveTextContent('demo_maya mentioned you in a comment');
    expect(container).toHaveTextContent('Your postSunset over the lake');
    expect(container).toHaveTextContent('Tipped you 25 TNB');
  });

  it("names someone else's post and leaves out the tip that went to them", async () => {
    await render(buildMention({id: 10, username: 'demo_omar'}));

    expect(container).toHaveTextContent("demo_omar's postSunset over the lake");
    expect(container).not.toHaveTextContent('Tipped');
  });

  it('falls back to a plain label when the owner of the post is unknown', async () => {
    await render(buildMention());

    expect(container).toHaveTextContent('PostSunset over the lake');
    expect(container).not.toHaveTextContent('Your post');
  });
});

it('lists the terms of a game challenge', async () => {
  await render(
    buildNotification({
      board_size: 11,
      challenger: commenter,
      match_id: 5,
      notification_type: NotificationType.HEX_CHALLENGE,
      stake_amount: 500,
      time_limit_seconds: 600,
    }),
  );

  expect(container).toHaveTextContent('demo_maya challenged you to Hex');
  expect(Array.from(container.querySelectorAll('li')).map((item) => item.textContent)).toEqual([
    'Stake 500 TNB',
    '11 × 11 board',
    '10 min per player',
  ]);
  expect(query('a[aria-labelledby]')).toHaveAttribute('href', '/hex/matches/5');
});
