import {act} from 'react';
import {createRoot, Root} from 'react-dom/client';
import {useDispatch, useSelector} from 'react-redux';

import {depositGameFund} from 'api/gameFund';
import {useIsAuthenticated} from 'hooks';

import ContributionModal from './index';

jest.mock('api/gameFund', () => ({depositGameFund: jest.fn()}));
jest.mock('components/AuthButtons', () => () => <div>Sign in to contribute</div>);
jest.mock('dispatchers/wallets', () => ({getAllUserWallets: () => 'wallet-refresh'}));
jest.mock('hooks', () => ({useIsAuthenticated: jest.fn()}));
jest.mock('react-redux', () => ({useDispatch: jest.fn(), useSelector: jest.fn()}));

(globalThis as {IS_REACT_ACT_ENVIRONMENT?: boolean}).IS_REACT_ACT_ENVIRONMENT = true;
let container: HTMLDivElement;
let modal: HTMLDivElement;
let root: Root;
let selfId: number;
const close = jest.fn();
const dispatch = jest.fn();
const onSuccess = jest.fn();
const fund = {
  available: true,
  balance: 25,
  currency: 'TNB',
  enabled: true,
  reward_amount: 10,
  total_deposited: 25,
  total_paid: 0,
  wins_remaining: 2,
};
const requestId = '11111111-1111-4111-8111-111111111111';

const render = async () => {
  await act(async () => root.render(<ContributionModal close={close} onSuccess={onSuccess} rewardAmount={10} />));
};
const button = (text: string) =>
  Array.from(modal.querySelectorAll('button')).find((element) => element.textContent === text)!;
const enterAmount = (amount = '25') => {
  const input = modal.querySelector('input')!;
  act(() => {
    Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')!.set!.call(input, amount);
    input.dispatchEvent(new Event('input', {bubbles: true}));
  });
};
const review = async (amount = '25') => {
  enterAmount(amount);
  await act(async () => button('Review contribution').click());
};

beforeEach(() => {
  jest.clearAllMocks();
  container = document.createElement('div');
  document.body.appendChild(container);
  modal = document.createElement('div');
  modal.id = 'modal-root';
  document.body.appendChild(modal);
  root = createRoot(container);
  selfId = 11;
  dispatch.mockImplementation(() => Promise.resolve());
  (useDispatch as unknown as jest.Mock).mockReturnValue(dispatch);
  (useSelector as unknown as jest.Mock).mockImplementation((selector) => selector({self: {id: selfId}}));
  (useIsAuthenticated as jest.Mock).mockReturnValue(true);
  Object.defineProperty(window, 'crypto', {configurable: true, value: {randomUUID: () => requestId}});
});
afterEach(() => {
  act(() => root.unmount());
  container.remove();
  modal.remove();
});

it('focuses the amount and requires explicit confirmation before depositing', async () => {
  await render();
  expect(document.activeElement).toBe(modal.querySelector('input'));
  expect(modal.querySelector('[role="dialog"]')).toHaveAttribute('aria-modal', 'true');
  expect(button('Review contribution')).toBeDisabled();
  await review();
  expect(modal).toHaveTextContent('Contribute 25 TNB?');
  expect(modal).toHaveTextContent('Contributions are final and cannot be withdrawn');
  expect(document.activeElement).toBe(modal.querySelector('h2'));
  expect(depositGameFund).not.toHaveBeenCalled();
  act(() => button('Back').click());
  expect(modal.querySelector('input')).toHaveValue(25);
  act(() => button('Cancel').click());
  expect(close).toHaveBeenCalledTimes(1);
  expect(depositGameFund).not.toHaveBeenCalled();
});

it('retries the same contribution after a network failure and refreshes the wallet on success', async () => {
  (depositGameFund as jest.Mock)
    .mockRejectedValueOnce(new Error('Network lost'))
    .mockResolvedValueOnce({amount: 25, fund});
  await render();
  await review();
  await act(async () => button('Contribute 25 TNB').click());
  expect(modal).toHaveTextContent('without paying twice');
  await act(async () => button('Contribute 25 TNB').click());
  expect((depositGameFund as jest.Mock).mock.calls).toEqual([
    [{amount: 25, request_id: requestId}],
    [{amount: 25, request_id: requestId}],
  ]);
  expect(dispatch).toHaveBeenCalledWith('wallet-refresh');
  expect(onSuccess).toHaveBeenCalledWith(fund, 'Contributed 25 TNB to the game fund. Thank you!');
  expect(close).toHaveBeenCalledTimes(1);
});

it('preserves ambiguous request IDs across closing and reopening the modal', async () => {
  (depositGameFund as jest.Mock)
    .mockRejectedValueOnce(new Error('Network lost'))
    .mockResolvedValueOnce({amount: 27, fund});
  await render();
  await review('27');
  await act(async () => button('Contribute 27 TNB').click());
  act(() => root.render(null));
  Object.defineProperty(window, 'crypto', {configurable: true, value: {randomUUID: () => 'a-new-request-id'}});
  await render();
  await review('27');
  await act(async () => button('Contribute 27 TNB').click());
  expect((depositGameFund as jest.Mock).mock.calls).toEqual([
    [{amount: 27, request_id: requestId}],
    [{amount: 27, request_id: requestId}],
  ]);
});

it.each(['0', '1.5', '1000000001'])('rejects invalid contribution %s before review', async (amount) => {
  await render();
  enterAmount(amount);
  expect(button('Review contribution')).toBeDisabled();
  act(() => modal.querySelector('form')!.dispatchEvent(new Event('submit', {bubbles: true, cancelable: true})));
  expect(modal).toHaveTextContent('Enter a whole-number contribution');
  expect(depositGameFund).not.toHaveBeenCalled();
});

it('shows authentication actions instead of an amount input for guests', async () => {
  (useIsAuthenticated as jest.Mock).mockReturnValue(false);
  await render();
  expect(modal).toHaveTextContent('Sign in to contribute');
  expect(modal.querySelector('input')).toBeNull();
});

it('traps keyboard focus, closes with Escape, and restores the original focus', async () => {
  const trigger = document.createElement('button');
  document.body.appendChild(trigger);
  trigger.focus();
  await render();
  enterAmount();
  const buttons = Array.from(modal.querySelectorAll('button'));
  const first = buttons[0];
  const last = buttons[buttons.length - 1];
  act(() => last.focus());
  act(() => document.dispatchEvent(new KeyboardEvent('keydown', {key: 'Tab', bubbles: true, cancelable: true})));
  expect(document.activeElement).toBe(first);
  act(() =>
    document.dispatchEvent(new KeyboardEvent('keydown', {key: 'Tab', shiftKey: true, bubbles: true, cancelable: true})),
  );
  expect(document.activeElement).toBe(last);
  act(() => document.dispatchEvent(new KeyboardEvent('keydown', {key: 'Escape', bubbles: true})));
  expect(close).toHaveBeenCalledTimes(1);
  act(() => root.render(null));
  expect(document.activeElement).toBe(trigger);
  trigger.remove();
});

it('locks submission and ignores responses from a previous account session', async () => {
  let resolveOld: (value: unknown) => void = () => undefined;
  let resolveNew: (value: unknown) => void = () => undefined;
  (depositGameFund as jest.Mock)
    .mockReturnValueOnce(
      new Promise((resolve) => {
        resolveOld = resolve;
      }),
    )
    .mockReturnValueOnce(
      new Promise((resolve) => {
        resolveNew = resolve;
      }),
    );
  await render();
  await review('31');
  act(() => {
    const submit = button('Contribute 31 TNB');
    submit.click();
    submit.click();
  });
  expect(depositGameFund).toHaveBeenCalledTimes(1);
  act(() => document.dispatchEvent(new KeyboardEvent('keydown', {key: 'Escape', bubbles: true})));
  expect(close).not.toHaveBeenCalled();
  selfId = 22;
  await render();
  selfId = 11;
  await render();
  await review('35');
  act(() => button('Contribute 35 TNB').click());
  await act(async () => resolveOld({amount: 31, fund}));
  expect(onSuccess).not.toHaveBeenCalled();
  expect(modal).toHaveTextContent('Contribute 35 TNB?');
  expect(Array.from(modal.querySelectorAll('button')).every((element) => element.disabled)).toBe(true);
  await act(async () => resolveNew({amount: 35, fund}));
  expect(onSuccess).toHaveBeenCalledTimes(1);
});

it('keeps the original request ID when an old session succeeds before the current retry loses its response', async () => {
  let resolveOld: (value: unknown) => void = () => undefined;
  let rejectCurrent: (reason: Error) => void = () => undefined;
  const randomUUID = jest.fn().mockReturnValueOnce(requestId).mockReturnValue('22222222-2222-4222-8222-222222222222');
  Object.defineProperty(window, 'crypto', {configurable: true, value: {randomUUID}});
  (depositGameFund as jest.Mock)
    .mockReturnValueOnce(
      new Promise((resolve) => {
        resolveOld = resolve;
      }),
    )
    .mockReturnValueOnce(
      new Promise((_resolve, reject) => {
        rejectCurrent = reject;
      }),
    )
    .mockResolvedValueOnce({amount: 25, fund});
  await render();
  await review();
  act(() => button('Contribute 25 TNB').click());
  selfId = 22;
  await render();
  selfId = 11;
  await render();
  await review();
  act(() => button('Contribute 25 TNB').click());
  await act(async () => resolveOld({amount: 25, fund}));
  expect(onSuccess).not.toHaveBeenCalled();
  await act(async () => rejectCurrent(new Error('Response lost')));
  expect(modal).toHaveTextContent('without paying twice');
  await act(async () => button('Contribute 25 TNB').click());
  expect((depositGameFund as jest.Mock).mock.calls).toEqual([
    [{amount: 25, request_id: requestId}],
    [{amount: 25, request_id: requestId}],
    [{amount: 25, request_id: requestId}],
  ]);
  expect(randomUUID).toHaveBeenCalledTimes(1);
  expect(onSuccess).toHaveBeenCalledTimes(1);
  expect(close).toHaveBeenCalledTimes(1);
});
