import {act} from 'react';
import {createRoot, Root} from 'react-dom/client';
import {MemoryRouter} from 'react-router-dom';

import {getTransfers} from 'api/transfers';
import {Transfer, Wallet} from 'types';
import {displayErrorToast} from 'utils/toasts';

import WalletTransfers from './index';

jest.mock('api/transfers', () => ({getTransfers: jest.fn()}));
jest.mock('utils/toasts', () => ({displayErrorToast: jest.fn()}));

(globalThis as {IS_REACT_ACT_ENVIRONMENT?: boolean}).IS_REACT_ACT_ENVIRONMENT = true;
let container: HTMLDivElement;
let root: Root;
const getTransfersMock = getTransfers as jest.Mock;

const makeTransfer = (postId: number, amount: number, username: string, commentId: number | null = null): Transfer =>
  ({
    amount,
    comment_id: commentId,
    content: `Message ${postId}`,
    counterparty: {avatar: null, id: postId, username},
    currency: 9,
    post_id: postId,
    timestamp: new Date(2026, 10, 20, 12, postId).toISOString(),
  }) as Transfer;

const makeWallet = (balance: number): Wallet => ({balance, currency: {id: 9, ticker: 'EYE'}, id: 4}) as Wallet;

const RECEIVED = makeTransfer(3, 40, 'alice');
const SENT = makeTransfer(2, -15, 'bob', 8);
const OLDER = makeTransfer(1, -5, 'carol');

const button = (text: string) =>
  Array.from(container.querySelectorAll('button, [role="tab"]')).find(
    (element) => element.textContent === text,
  ) as HTMLElement;
const links = () => Array.from(container.querySelectorAll('li a'));
const render = async (wallet = makeWallet(100), refreshKey = 0) => {
  await act(async () =>
    root.render(
      <MemoryRouter>
        <WalletTransfers refreshKey={refreshKey} wallet={wallet} />
      </MemoryRouter>,
    ),
  );
};

beforeEach(() => {
  jest.clearAllMocks();
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);
  getTransfersMock.mockResolvedValue({count: 2, next: null, previous: null, results: [RECEIVED, SENT]});
});
afterEach(() => {
  act(() => root.unmount());
  container.remove();
});

it('shows who sent or received the coins, how many, and links to the post or the comment', async () => {
  await render();

  expect(getTransfersMock).toHaveBeenCalledWith({currency: 9, direction: undefined});
  expect(links().map((link) => link.getAttribute('href'))).toEqual(['/posts/3', '/posts/2?comment=8']);
  expect(links()[0].textContent).toContain('Received from alice');
  expect(links()[0].textContent).toContain('+40EYE');
  expect(links()[0].textContent).toContain('In a post');
  expect(links()[1].textContent).toContain('Sent to bob');
  expect(links()[1].textContent).toContain('−15EYE');
  expect(links()[1].textContent).toContain('In a comment');
  expect(container.textContent).toContain('Showing 2 of 2');
  expect(button('Show more')).toBeUndefined();
});

it('asks for one direction only when a filter is picked', async () => {
  await render();
  getTransfersMock.mockResolvedValue({count: 0, next: null, previous: null, results: []});

  await act(async () => button('Received').click());

  expect(getTransfersMock).toHaveBeenLastCalledWith({currency: 9, direction: 'received'});
  expect(container.textContent).toContain('Nothing received yet');
});

it('adds the next page below the transfers already shown', async () => {
  getTransfersMock.mockResolvedValueOnce({count: 3, next: 'next', previous: null, results: [RECEIVED, SENT]});
  await render();
  // The second page repeats a transfer of the first one, as happens when a new transfer arrived in between
  getTransfersMock.mockResolvedValueOnce({count: 3, next: null, previous: 'previous', results: [SENT, OLDER]});

  await act(async () => button('Show more').click());

  expect(getTransfersMock).toHaveBeenLastCalledWith({currency: 9, direction: undefined, page: 2});
  expect(links().map((link) => link.getAttribute('href'))).toEqual(['/posts/3', '/posts/2?comment=8', '/posts/1']);
  expect(container.textContent).toContain('Showing 3 of 3');
  expect(button('Show more')).toBeUndefined();
});

it('picks up new transfers when the balance changes or coins were just sent, keeping the list in place', async () => {
  getTransfersMock.mockResolvedValueOnce({count: 2, next: null, previous: null, results: [SENT, OLDER]});
  await render(makeWallet(100));
  getTransfersMock.mockResolvedValue({count: 3, next: null, previous: null, results: [RECEIVED, SENT]});

  await render(makeWallet(140));

  expect(getTransfersMock).toHaveBeenCalledTimes(2);
  expect(links().map((link) => link.getAttribute('href'))).toEqual(['/posts/3', '/posts/2?comment=8', '/posts/1']);

  await render(makeWallet(140), 1);

  expect(getTransfersMock).toHaveBeenCalledTimes(3);
  expect(links()).toHaveLength(3);
});

it('says when the activity could not be loaded and loads it again on request', async () => {
  getTransfersMock.mockRejectedValueOnce(new Error('offline'));

  await render();

  expect(container.textContent).toContain('Activity could not be loaded');
  expect(container.textContent).not.toContain('No activity yet');

  await act(async () => button('Try again').click());

  expect(links()).toHaveLength(2);
  expect(container.textContent).not.toContain('Activity could not be loaded');
});

it('reports a failed request for more transfers without losing the ones shown', async () => {
  getTransfersMock.mockResolvedValueOnce({count: 3, next: 'next', previous: null, results: [RECEIVED, SENT]});
  await render();
  getTransfersMock.mockRejectedValueOnce(new Error('offline'));

  await act(async () => button('Show more').click());

  expect(displayErrorToast).toHaveBeenCalledWith('Error fetching transfers');
  expect(links()).toHaveLength(2);
  expect(button('Show more')).toBeDefined();
});
