import {act} from 'react';
import {createRoot, Root} from 'react-dom/client';

import {Wallet} from 'types';

import WalletList from './index';

(globalThis as {IS_REACT_ACT_ENVIRONMENT?: boolean}).IS_REACT_ACT_ENVIRONMENT = true;
let container: HTMLDivElement;
let root: Root;
const onWalletClick = jest.fn();

const makeWallet = (id: number, ticker: string, balance: number, domain: string | null = null): Wallet =>
  ({balance, currency: {domain, id, logo: `${ticker}.png`, ticker}, id}) as Wallet;

const TNB = makeWallet(1, 'TNB', 500);
const ACID = makeWallet(2, 'ACID', 9000);
const BATTL = makeWallet(3, 'BATTL', 40, 'battlecore.app');
const EYE = makeWallet(4, 'EYE', 300);
// EYE trades at 3 TNB, while ACID and BATTL have never been traded
const PRICES = {4: 3};

const render = async (activeWalletId: number | null = 1, isLoading = false, wallets = [TNB, ACID, BATTL, EYE]) => {
  await act(async () =>
    root.render(
      <WalletList
        activeWalletId={activeWalletId}
        isLoading={isLoading}
        onWalletClick={onWalletClick}
        prices={PRICES}
        wallets={wallets}
      />,
    ),
  );
};
const rows = () => Array.from(container.querySelectorAll('li button'));
const setValue = (element: HTMLInputElement | HTMLSelectElement, value: string) => {
  const prototype = element instanceof HTMLSelectElement ? HTMLSelectElement.prototype : HTMLInputElement.prototype;
  act(() => {
    Object.getOwnPropertyDescriptor(prototype, 'value')!.set!.call(element, value);
    element.dispatchEvent(new Event(element instanceof HTMLSelectElement ? 'change' : 'input', {bubbles: true}));
  });
};
const tickers = () => rows().map((row) => row.querySelector('img')!.getAttribute('src')!.replace('.png', ''));

beforeEach(() => {
  jest.clearAllMocks();
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);
});
afterEach(() => {
  act(() => root.unmount());
  container.remove();
});

it('lists every wallet by value with its balance and its estimated value', async () => {
  await render();

  expect(tickers()).toEqual(['EYE', 'TNB', 'ACID', 'BATTL']);
  expect(rows()[0].textContent).toContain('3 TNB each');
  expect(rows()[0].textContent).toContain('≈ 900 TNB');
  expect(rows()[1].textContent).toContain('Base currency');
  expect(rows()[1].textContent).not.toContain('≈');
  expect(rows()[2].textContent).toContain('Not traded yet');
  expect(rows()[3].textContent).toContain('battlecore.app');
});

it('marks the open wallet and reports the wallet that is clicked', async () => {
  await render(2);

  expect(rows().map((row) => row.getAttribute('aria-current'))).toEqual([null, null, 'true', null]);

  act(() => (rows()[3] as HTMLButtonElement).click());
  expect(onWalletClick).toHaveBeenCalledWith(BATTL);
});

it('filters by ticker or domain and says when nothing matches', async () => {
  await render();
  const search = container.querySelector('input')!;

  setValue(search, 'battle');
  expect(tickers()).toEqual(['BATTL']);

  setValue(search, 'nope');
  expect(rows()).toHaveLength(0);
  expect(container.textContent).toContain('No wallet matches "nope"');
});

it('sorts by balance or by ticker on request', async () => {
  await render();
  const sort = container.querySelector('select')!;

  setValue(sort, 'balance');
  expect(tickers()).toEqual(['ACID', 'TNB', 'EYE', 'BATTL']);

  setValue(sort, 'ticker');
  expect(tickers()).toEqual(['ACID', 'BATTL', 'EYE', 'TNB']);
});

it('shows placeholders instead of an empty message while the wallets load', async () => {
  await render(null, true, []);

  expect(container.querySelector('ul')!.getAttribute('aria-busy')).toBe('true');
  expect(container.textContent).not.toContain('You have no wallets yet');
});
