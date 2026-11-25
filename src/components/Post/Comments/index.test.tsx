import {act} from 'react';
import {createRoot, Root} from 'react-dom/client';
import {useDispatch, useSelector} from 'react-redux';
import {MemoryRouter} from 'react-router-dom';

import Comments from '.';

jest.mock('axios', () => ({}));
jest.mock('hooks', () => ({
  ...jest.requireActual('hooks'),
  useIsAuthenticated: () => false,
  useRequireAuthentication: () => jest.fn(),
}));
jest.mock('react-redux', () => ({useDispatch: jest.fn(), useSelector: jest.fn()}));

(globalThis as {IS_REACT_ACT_ENVIRONMENT?: boolean}).IS_REACT_ACT_ENVIRONMENT = true;

const POST_ID = 4;
const owner = {avatar: null, id: 3, username: 'demo_maya'};
const comments = Object.fromEntries(
  Array.from({length: 11}, (_, index) => {
    const id = index + 1;
    return [
      id,
      {
        content: `Comment ${id}`,
        created_date: '2026-11-24T12:00:00Z',
        id,
        mentioned_users: [],
        modified_date: '2026-11-24T12:00:00Z',
        owner,
        post: POST_ID,
        price_amount: null,
        price_currency: null,
      },
    ];
  }),
);

let container: HTMLDivElement;
let root: Root;
let scrollIntoView: jest.Mock;

const render = async (highlightedCommentId?: number) => {
  await act(async () =>
    root.render(
      <MemoryRouter future={{v7_relativeSplatPath: true, v7_startTransition: true}}>
        <Comments highlightedCommentId={highlightedCommentId} postId={POST_ID} />
      </MemoryRouter>,
    ),
  );
  // Images never load here, so the scroll waits for the longest wait for images above the comment
  await act(async () => {
    jest.advanceTimersByTime(1500);
  });
};

const scrolledElements = () => scrollIntoView.mock.instances as unknown as HTMLElement[];

const shownComments = () =>
  Array.from(container.querySelectorAll('a[href="/profile/3"]:not([aria-hidden])')).map(
    (username) => username.nextElementSibling?.textContent,
  );

beforeEach(() => {
  jest.useFakeTimers();
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);
  scrollIntoView = jest.fn();
  Element.prototype.scrollIntoView = scrollIntoView;
  (useDispatch as unknown as jest.Mock).mockReturnValue(jest.fn());
  (useSelector as unknown as jest.Mock).mockImplementation((selector) =>
    selector({comments, manager: {activeCommentCurrency: null}, self: {id: 1}}),
  );
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
  jest.useRealTimers();
});

it('shows the first comments and scrolls nowhere without a highlighted comment', async () => {
  await render();

  expect(shownComments()).toEqual(['Comment 1', 'Comment 2', 'Comment 3', 'Comment 4']);
  expect(container).toHaveTextContent('Show 4 more comments');
  expect(scrollIntoView).not.toHaveBeenCalled();
});

it('shows comments up to the highlighted one and scrolls it into view', async () => {
  await render(6);

  expect(shownComments()).toEqual(['Comment 1', 'Comment 2', 'Comment 3', 'Comment 4', 'Comment 5', 'Comment 6']);
  expect(container).toHaveTextContent('Show 4 more comments');
  expect(scrollIntoView).toHaveBeenCalledTimes(1);
  expect(scrollIntoView).toHaveBeenCalledWith({behavior: 'smooth', block: 'center'});
  expect(scrolledElements()[0]).toHaveTextContent('Comment 6');
});

it('shows every comment when the highlighted one is the last', async () => {
  await render(11);

  expect(shownComments()).toHaveLength(11);
  expect(container).not.toHaveTextContent('more comments');
  expect(scrollIntoView).toHaveBeenCalledTimes(1);
  expect(scrolledElements()[0]).toHaveTextContent('Comment 11');
});
