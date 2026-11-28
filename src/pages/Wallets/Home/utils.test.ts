import {AssetPair, TradeHistoryItem, Transfer, Wallet} from 'types';

import {
  filterWallets,
  getAllPages,
  getDayLabel,
  getMarkets,
  getTotalValue,
  getWalletValue,
  groupTransfersByDay,
  mergeTransfers,
  sortWallets,
  WalletSort,
} from './utils';

const makeTransfer = (postId: number, timestamp: string, commentId: number | null = null): Transfer =>
  ({amount: 10, comment_id: commentId, content: '', post_id: postId, timestamp}) as Transfer;

const makeWallet = (id: number, ticker: string, balance: number, domain: string | null = null): Wallet =>
  ({balance, currency: {domain, id, ticker}, id}) as Wallet;

const TNB = makeWallet(1, 'TNB', 500);
const ACID = makeWallet(2, 'ACID', 9000);
const BATTL = makeWallet(3, 'BATTL', 40, 'battlecore.app');
const EYE = makeWallet(4, 'EYE', 300);
const ZERO = makeWallet(5, 'ZERO', 0);

// EYE trades at 3 TNB and ZERO at 2 TNB, while ACID and BATTL have never been traded
const PRICES = {4: 3, 5: 2};

describe('filterWallets', () => {
  it('keeps every wallet while the search is blank', () => {
    expect(filterWallets([TNB, ACID], '   ')).toEqual([TNB, ACID]);
  });

  it('matches the ticker and the domain, whatever the case', () => {
    expect(filterWallets([TNB, ACID, BATTL], 'ac')).toEqual([ACID]);
    expect(filterWallets([TNB, ACID, BATTL], 'BattleCore')).toEqual([BATTL]);
  });
});

describe('getAllPages', () => {
  it('follows the pages until there is no next one', async () => {
    const getPage = jest.fn(async (page: number) => ({next: page < 3 ? 'next' : null, results: [page]}));

    await expect(getAllPages(getPage)).resolves.toEqual([1, 2, 3]);
    expect(getPage).toHaveBeenCalledTimes(3);
  });
});

describe('getDayLabel', () => {
  const now = new Date(2026, 10, 28, 9, 30);

  it('names today and yesterday', () => {
    expect(getDayLabel(new Date(2026, 10, 28, 0, 5), now)).toBe('Today');
    expect(getDayLabel(new Date(2026, 10, 27, 23, 55), now)).toBe('Yesterday');
  });

  it('leaves the year out for the current year only', () => {
    expect(getDayLabel(new Date(2026, 8, 5), now)).toBe(
      new Date(2026, 8, 5).toLocaleDateString(undefined, {day: 'numeric', month: 'long'}),
    );
    expect(getDayLabel(new Date(2025, 8, 5), now)).toBe(
      new Date(2025, 8, 5).toLocaleDateString(undefined, {day: 'numeric', month: 'long', year: 'numeric'}),
    );
  });
});

describe('getMarkets', () => {
  it('only keeps the markets priced in the default currency', () => {
    const assetPairs = [
      {id: 10, primary_currency: {id: 4}, secondary_currency: {ticker: 'TNB'}},
      {id: 11, primary_currency: {id: 5}, secondary_currency: {ticker: 'EYE'}},
    ] as AssetPair[];
    const tradeHistoryItems = [
      {asset_pair: {primary_currency: {id: 4}, secondary_currency: {ticker: 'TNB'}}, price: 3},
      {asset_pair: {primary_currency: {id: 5}, secondary_currency: {ticker: 'EYE'}}, price: 7},
    ] as TradeHistoryItem[];

    expect(getMarkets(assetPairs, tradeHistoryItems)).toEqual({pairIds: {4: 10}, prices: {4: 3}});
  });
});

describe('getWalletValue and getTotalValue', () => {
  it('counts the default currency at face value', () => {
    expect(getWalletValue(TNB, PRICES)).toBe(500);
  });

  it('multiplies the balance by the last trade price', () => {
    expect(getWalletValue(EYE, PRICES)).toBe(900);
  });

  it('has no value for a currency that was never traded', () => {
    expect(getWalletValue(ACID, PRICES)).toBeNull();
  });

  it('adds up the wallets that have a value', () => {
    expect(getTotalValue([TNB, ACID, BATTL, EYE, ZERO], PRICES)).toBe(1400);
  });
});

describe('groupTransfersByDay', () => {
  it('groups consecutive transfers of the same day under one label', () => {
    const now = new Date(2026, 10, 28, 12);
    const first = makeTransfer(1, new Date(2026, 10, 28, 11).toISOString());
    const second = makeTransfer(2, new Date(2026, 10, 28, 8).toISOString());
    const third = makeTransfer(3, new Date(2026, 10, 27, 20).toISOString());

    expect(groupTransfersByDay([first, second, third], now)).toEqual([
      {label: 'Today', transfers: [first, second]},
      {label: 'Yesterday', transfers: [third]},
    ]);
  });
});

describe('mergeTransfers', () => {
  it('puts the latest transfers first and keeps the older ones once', () => {
    const older = makeTransfer(1, '2026-11-01T10:00:00Z');
    const shown = makeTransfer(2, '2026-11-02T10:00:00Z');
    const comment = makeTransfer(2, '2026-11-02T10:00:00Z', 7);
    const latest = makeTransfer(3, '2026-11-03T10:00:00Z');

    expect(mergeTransfers([shown, comment, older], [latest, shown])).toEqual([latest, shown, comment, older]);
  });
});

describe('sortWallets', () => {
  const wallets = [ZERO, BATTL, TNB, ACID, EYE];

  it('sorts by value, then by balance for wallets without a price', () => {
    expect(sortWallets(wallets, WalletSort.VALUE, PRICES)).toEqual([EYE, TNB, ACID, BATTL, ZERO]);
  });

  it('sorts by balance', () => {
    expect(sortWallets(wallets, WalletSort.BALANCE, PRICES)).toEqual([ACID, TNB, EYE, BATTL, ZERO]);
  });

  it('sorts by ticker', () => {
    expect(sortWallets(wallets, WalletSort.TICKER, PRICES)).toEqual([ACID, BATTL, EYE, TNB, ZERO]);
  });

  it('leaves the given list untouched', () => {
    sortWallets(wallets, WalletSort.TICKER, PRICES);
    expect(wallets).toEqual([ZERO, BATTL, TNB, ACID, EYE]);
  });
});
