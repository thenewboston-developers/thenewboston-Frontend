import {act} from 'react';
import {createRoot, Root} from 'react-dom/client';
import {useDispatch, useSelector} from 'react-redux';
import {MemoryRouter} from 'react-router-dom';

import {depositGameFund, getGameFund} from 'api/gameFund';
import {useIsAuthenticated} from 'hooks';

import GameFund from './index';

jest.mock('api/gameFund', () => ({depositGameFund: jest.fn(), getGameFund: jest.fn()}));
jest.mock('components/AuthButtons', () => () => <div>Sign in to contribute</div>);
jest.mock('dispatchers/wallets', () => ({getAllUserWallets: () => 'wallet-refresh'}));
jest.mock('hooks', () => ({useIsAuthenticated: jest.fn()}));
jest.mock('react-redux', () => ({useDispatch: jest.fn(), useSelector: jest.fn()}));

(globalThis as {IS_REACT_ACT_ENVIRONMENT?: boolean}).IS_REACT_ACT_ENVIRONMENT = true;
let container: HTMLDivElement;
let modal: HTMLDivElement;
let root: Root;
let selfId: number;
const dispatch = jest.fn();
const fund = {
  balance: 0,
  currency: 'TNB',
  reward_amount: 10,
  wins_remaining: 0,
  total_deposited: 0,
  total_paid: 0,
  enabled: true,
  available: false,
};
const requestId = '11111111-1111-4111-8111-111111111111';

const render = async () => {
  await act(async () =>
    root.render(
      <MemoryRouter future={{v7_startTransition: true, v7_relativeSplatPath: true}}>
        <GameFund />
      </MemoryRouter>,
    ),
  );
};
const button = (text: string) =>
  Array.from(document.querySelectorAll('button')).find((element) => element.textContent === text)!;
const review = async (amount = '25') => {
  const input = container.querySelector('input')!;
  act(() => {
    Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')!.set!.call(input, amount);
    input.dispatchEvent(new Event('input', {bubbles: true}));
  });
  await act(async () => button('Review contribution').click());
};

beforeEach(() => {
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
  (getGameFund as jest.Mock).mockResolvedValue(fund);
  Object.defineProperty(window, 'crypto', {configurable: true, value: {randomUUID: () => requestId}});
});
afterEach(() => {
  act(() => root.unmount());
  container.remove();
  modal.remove();
});

it('requires an explicit amount confirmation and does not deposit on review or cancel', async () => {
  await render();
  expect(button('Review contribution')).toBeDisabled();
  await review();
  expect(button('Review contribution')).toBeEnabled();
  expect(modal).toHaveTextContent('Contribute 25 TNB?');
  expect(modal).toHaveTextContent('Contributions are final and cannot be withdrawn');
  expect(depositGameFund).not.toHaveBeenCalled();
  act(() => button('Cancel').click());
  expect(modal.textContent).toBe('');
  expect(depositGameFund).not.toHaveBeenCalled();
});

it('retries an ambiguous contribution with the same request ID, then refreshes wallet and balance', async () => {
  (depositGameFund as jest.Mock).mockRejectedValueOnce(new Error('Network lost')).mockResolvedValueOnce({
    id: 1,
    amount: 25,
    currency: 'TNB',
    fund: {...fund, balance: 25, wins_remaining: 2, available: true},
  });
  await render();
  await review();
  await act(async () => button('Contribute 25 TNB').click());
  expect(modal).toHaveTextContent('without paying twice');
  await act(async () => button('Contribute 25 TNB').click());
  expect((depositGameFund as jest.Mock).mock.calls).toEqual([
    [{amount: 25, request_id: requestId}],
    [{amount: 25, request_id: requestId}],
  ]);
  expect(container).toHaveTextContent('2 rewards funded');
  expect(dispatch).toHaveBeenCalledWith('wallet-refresh');
});

it('shows an empty fund without disabling free games and lets visitors see the balance', async () => {
  (useIsAuthenticated as jest.Mock).mockReturnValue(false);
  await render();
  expect(container).toHaveTextContent('0 TNB');
  expect(container).toHaveTextContent('free play continues without a reward');
  expect(container).toHaveTextContent('Sign in to contribute');
  expect(container.querySelector('form')).toBeNull();
});

it('rejects fractional or zero contributions before review', async () => {
  await render();
  await review('0');
  expect(button('Review contribution')).toBeDisabled();
  expect(modal.textContent).toBe('');
  await review('1.5');
  expect(modal.textContent).toBe('');
  expect(depositGameFund).not.toHaveBeenCalled();
});

it('does not let a previous account session settle a new contribution after switching away and back', async () => {
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
  await review('25');
  act(() => button('Contribute 25 TNB').click());
  selfId = 22;
  await render();
  selfId = 11;
  await render();
  await review('35');
  act(() => button('Contribute 35 TNB').click());
  await act(async () => resolveOld({id: 1, amount: 25, currency: 'TNB', fund: {...fund, balance: 25}}));
  expect(modal).toHaveTextContent('Contribute 35 TNB?');
  expect(Array.from(modal.querySelectorAll('button')).every((element) => element.disabled)).toBe(true);
  await act(async () => resolveNew({id: 2, amount: 35, currency: 'TNB', fund: {...fund, balance: 60}}));
  expect(container).toHaveTextContent('Contributed 35 TNB');
});
