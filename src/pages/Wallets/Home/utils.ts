import {DEFAULT_CURRENCY_TICKER} from 'constants/general';
import {AssetPair, TradeHistoryItem, Transfer, Wallet} from 'types';

export enum WalletSort {
  BALANCE = 'balance',
  TICKER = 'ticker',
  VALUE = 'value',
}

export const WALLET_SORT_OPTIONS = [
  {label: 'Highest value', value: WalletSort.VALUE},
  {label: 'Highest balance', value: WalletSort.BALANCE},
  {label: 'Ticker A to Z', value: WalletSort.TICKER},
];

// What the exchange knows about each currency, keyed by currency id
export interface Markets {
  // Trading desk (asset pair) where the currency is traded against the default currency
  pairIds: Record<number, number>;
  // Last trade price of one coin, in the default currency
  prices: Record<number, number>;
}

export interface TransferGroup {
  label: string;
  transfers: Transfer[];
}

export const EMPTY_MARKETS: Markets = {pairIds: {}, prices: {}};

export const filterWallets = (wallets: Wallet[], searchTerm: string): Wallet[] => {
  const term = searchTerm.trim().toLowerCase();
  if (!term) return wallets;

  return wallets.filter(
    ({currency}) => currency.ticker.toLowerCase().includes(term) || !!currency.domain?.toLowerCase().includes(term),
  );
};

export const getAllPages = async <T>(
  getPage: (page: number) => Promise<{next: string | null; results: T[]}>,
): Promise<T[]> => {
  const results: T[] = [];
  let hasMore = true;
  let page = 1;

  while (hasMore) {
    // eslint-disable-next-line no-await-in-loop
    const response = await getPage(page);
    results.push(...response.results);
    hasMore = !!response.next;
    page += 1;
  }

  return results;
};

const isSameDay = (a: Date, b: Date): boolean =>
  a.getDate() === b.getDate() && a.getMonth() === b.getMonth() && a.getFullYear() === b.getFullYear();

export const getDayLabel = (date: Date, now: Date = new Date()): string => {
  if (isSameDay(date, now)) return 'Today';

  const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
  if (isSameDay(date, yesterday)) return 'Yesterday';

  return date.toLocaleDateString(undefined, {
    day: 'numeric',
    month: 'long',
    ...(date.getFullYear() === now.getFullYear() ? {} : {year: 'numeric'}),
  });
};

export const getMarkets = (assetPairs: AssetPair[], tradeHistoryItems: TradeHistoryItem[]): Markets => {
  const markets: Markets = {pairIds: {}, prices: {}};

  for (const {id, primary_currency, secondary_currency} of assetPairs) {
    if (secondary_currency.ticker === DEFAULT_CURRENCY_TICKER) markets.pairIds[primary_currency.id] = id;
  }

  for (const {asset_pair, price} of tradeHistoryItems) {
    if (asset_pair.secondary_currency.ticker === DEFAULT_CURRENCY_TICKER) {
      markets.prices[asset_pair.primary_currency.id] = price;
    }
  }

  return markets;
};

// A comment and the post it belongs to can both carry coins, so the comment id is part of the key
export const getTransferKey = ({comment_id, post_id, timestamp}: Transfer): string =>
  `${post_id}-${comment_id}-${timestamp}`;

// What a wallet is worth in the default currency, or null while its currency has never been traded
export const getWalletValue = (wallet: Wallet, prices: Markets['prices']): number | null => {
  if (wallet.currency.ticker === DEFAULT_CURRENCY_TICKER) return wallet.balance;

  const price = prices[wallet.currency.id];
  return price === undefined ? null : wallet.balance * price;
};

export const getTotalValue = (wallets: Wallet[], prices: Markets['prices']): number =>
  wallets.reduce((total, wallet) => total + (getWalletValue(wallet, prices) || 0), 0);

// Transfers arrive newest first, so each day is one unbroken run
export const groupTransfersByDay = (transfers: Transfer[], now: Date = new Date()): TransferGroup[] => {
  const groups: TransferGroup[] = [];

  for (const transfer of transfers) {
    const label = getDayLabel(new Date(transfer.timestamp), now);
    const lastGroup = groups[groups.length - 1];

    if (lastGroup?.label === label) {
      lastGroup.transfers.push(transfer);
    } else {
      groups.push({label, transfers: [transfer]});
    }
  }

  return groups;
};

// Newly fetched transfers go in front of the ones already shown, without repeating any of them
export const mergeTransfers = (current: Transfer[], latest: Transfer[]): Transfer[] => {
  const latestKeys = new Set(latest.map(getTransferKey));
  return [...latest, ...current.filter((transfer) => !latestKeys.has(getTransferKey(transfer)))];
};

export const sortWallets = (wallets: Wallet[], sort: WalletSort, prices: Markets['prices']): Wallet[] => {
  const byTicker = (a: Wallet, b: Wallet) => a.currency.ticker.localeCompare(b.currency.ticker);

  if (sort === WalletSort.TICKER) return [...wallets].sort(byTicker);

  if (sort === WalletSort.BALANCE) return [...wallets].sort((a, b) => b.balance - a.balance || byTicker(a, b));

  // A wallet without a market price is worth nothing here, so among those the fuller wallet comes first
  return [...wallets].sort(
    (a, b) =>
      (getWalletValue(b, prices) || 0) - (getWalletValue(a, prices) || 0) || b.balance - a.balance || byTicker(a, b),
  );
};
