import {Wallet} from 'types/wallets';

const fractionalSeconds = (timestamp: string) => (timestamp.match(/\.(\d+)/)?.[1] || '').padEnd(6, '0');

export const isNewerWallet = (incoming: Wallet, current?: Wallet | null) => {
  const incomingTime = Date.parse(incoming.modified_date);
  if (!Number.isFinite(incomingTime)) return false;
  if (!current) return true;

  const currentTime = Date.parse(current.modified_date);
  if (!Number.isFinite(currentTime)) return true;

  // The API preserves microseconds; Date alone would discard updates within the same millisecond.
  return (
    incomingTime > currentTime ||
    (incomingTime === currentTime &&
      fractionalSeconds(incoming.modified_date) > fractionalSeconds(current.modified_date))
  );
};
