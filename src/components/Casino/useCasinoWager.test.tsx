import {act} from 'react';
import {createRoot, Root} from 'react-dom/client';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';

import {createCasinoCommitment, getCasino, getCasinoBet, getCasinoBets, placeCasinoBet} from 'api/casino';
import walletsReducer, {setWallet} from 'store/wallets';
import {Wallet} from 'types';
import {CasinoBet, CasinoSummary} from 'types/casino';
import {readPendingCasinoBet, savePendingCasinoBet} from 'utils/casino';

import useCasinoWager, {CasinoWager} from './useCasinoWager';

jest.mock('api/casino', () => ({
  createCasinoCommitment: jest.fn(),
  getCasino: jest.fn(),
  getCasinoBet: jest.fn(),
  getCasinoBets: jest.fn(),
  placeCasinoBet: jest.fn(),
}));
jest.mock('dispatchers/wallets', () => ({getAllUserWallets: () => () => Promise.resolve()}));
jest.mock('hooks', () => ({useIsAuthenticated: () => true}));

(globalThis as {IS_REACT_ACT_ENVIRONMENT?: boolean}).IS_REACT_ACT_ENVIRONMENT = true;

const wallet = {
  balance: 20,
  currency: {ticker: 'TNB'},
  id: 1,
  modified_date: '2026-11-25T12:00:00.000100Z',
  owner: 7,
} as Wallet;
const summary = {
  can_manage: false,
  fund: {available: 100000, balance: 100000, currency: 'TNB', enabled: true, reserved: 0, risk_limit_bps: 100},
  games: [{available: true, enabled: true, id: 'plinko', max_bet: 20, min_bet: 1, rules_version: 1}],
} as CasinoSummary;
const makeStore = () => configureStore({reducer: {self: () => ({id: 7}), wallets: walletsReducer}});
const receipt = (requestId: string, balance: number, revision = '2026-11-25T12:00:00.000200Z') =>
  ({
    amount: 20,
    game: 'plinko',
    request_id: requestId,
    status: 'settled',
    wallet_balance: balance,
    wallet_modified_date: revision,
  }) as CasinoBet;

let container: HTMLDivElement;
let root: Root;
let store: ReturnType<typeof makeStore>;
let wager: CasinoWager;

const Probe = () => {
  wager = useCasinoWager({gameId: 'plinko'});
  return <button disabled={!wager.canPlace}>Drop</button>;
};

const render = async () => {
  await act(async () => {
    root.render(
      <Provider store={store}>
        <Probe />
      </Provider>,
    );
  });
  act(() => wager.setAmount('20'));
};

beforeEach(() => {
  jest.clearAllMocks();
  localStorage.clear();
  let identity = 0;
  Object.defineProperty(globalThis, 'crypto', {
    configurable: true,
    value: {
      randomUUID: () => {
        identity += 1;
        return `identity-${identity}`;
      },
    },
  });
  store = makeStore();
  store.dispatch(setWallet(wallet));
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);
  (getCasino as jest.Mock).mockResolvedValue(summary);
  (getCasinoBets as jest.Mock).mockResolvedValue([]);
  (createCasinoCommitment as jest.Mock).mockResolvedValue({id: 'commitment', server_seed_hash: 'hash'});
  (placeCasinoBet as jest.Mock).mockImplementation((payload) => Promise.resolve(receipt(payload.request_id, 0)));
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
});

it('applies a settled balance immediately and blocks an unaffordable next wager before creating its commitment', async () => {
  await render();
  expect(wager.canPlace).toBe(true);
  await act(async () => {
    await wager.place();
  });
  expect(wager.wallet?.balance).toBe(0);
  expect(wager.canPlace).toBe(false);
  await act(async () => {
    expect(await wager.place()).toBeNull();
  });
  expect(placeCasinoBet).toHaveBeenCalledTimes(1);
  expect(createCasinoCommitment).toHaveBeenCalledTimes(1);
});

it('uses each consecutive receipt and rejects an older wallet update within the same millisecond', async () => {
  (placeCasinoBet as jest.Mock)
    .mockImplementationOnce((payload) => Promise.resolve(receipt(payload.request_id, 30)))
    .mockImplementationOnce((payload) =>
      Promise.resolve(receipt(payload.request_id, 10, '2026-11-25T12:00:00.000300Z')),
    );
  await render();
  await act(async () => {
    await wager.place();
  });
  expect(wager.wallet?.balance).toBe(30);
  expect(wager.canPlace).toBe(true);
  await act(async () => {
    await wager.place();
  });
  expect(wager.wallet?.balance).toBe(10);
  expect(wager.canPlace).toBe(false);
  act(() => store.dispatch(setWallet({...wallet, balance: 99, modified_date: '2026-11-25T12:00:00.000250Z'})));
  expect(wager.wallet?.balance).toBe(10);
  expect(wager.history).toHaveLength(2);
});

it('does not overwrite a newer wallet stream update with a delayed wager response', async () => {
  let resolve!: (bet: CasinoBet) => void;
  (placeCasinoBet as jest.Mock).mockReturnValue(
    new Promise<CasinoBet>((done) => {
      resolve = done;
    }),
  );
  await render();
  let placed!: Promise<CasinoBet | null>;
  await act(async () => {
    placed = wager.place();
  });
  act(() => store.dispatch(setWallet({...wallet, balance: 7, modified_date: '2026-11-25T12:00:00.000900Z'})));
  await act(async () => {
    const payload = (placeCasinoBet as jest.Mock).mock.calls[0][0];
    resolve(receipt(payload.request_id, 25));
    await placed;
  });
  expect(wager.wallet?.balance).toBe(7);
  expect(wager.canPlace).toBe(false);
});

it('supports receipts from an older backend without fabricating a wallet revision', async () => {
  (placeCasinoBet as jest.Mock).mockImplementation((payload) => {
    const bet = receipt(payload.request_id, 0);
    delete bet.wallet_modified_date;
    return Promise.resolve(bet);
  });
  await render();
  await act(async () => {
    await wager.place();
  });
  expect(wager.receipt?.wallet_balance).toBe(0);
  expect(wager.wallet).toEqual(wallet);
});

it('does not replace newer fund limits with an older refresh response', async () => {
  await render();
  let resolve!: (value: CasinoSummary) => void;
  (getCasino as jest.Mock)
    .mockReturnValueOnce(
      new Promise<CasinoSummary>((done) => {
        resolve = done;
      }),
    )
    .mockResolvedValueOnce({...summary, games: [{...summary.games[0], max_bet: 3}]});
  let previous!: Promise<void>;
  await act(async () => {
    previous = wager.refresh();
    await wager.refresh();
  });
  expect(wager.maxBet).toBe(3);
  await act(async () => {
    resolve(summary);
    await previous;
  });
  expect(wager.maxBet).toBe(3);
});

it('keeps a newer uncertain wager recoverable when an earlier automatic recovery arrives late', async () => {
  let resolveRecovery!: (bet: CasinoBet) => void;
  (getCasinoBet as jest.Mock).mockReturnValue(
    new Promise<CasinoBet>((done) => {
      resolveRecovery = done;
    }),
  );
  savePendingCasinoBet(7, {
    payload: {
      amount: 20,
      client_seed: 'client-a',
      commitment_id: 'commitment-a',
      game: 'plinko',
      request_id: 'a',
      rules_version: 1,
    },
    serverSeedHash: 'hash-a',
  });
  const recovered = receipt('a', 30);
  (placeCasinoBet as jest.Mock)
    .mockResolvedValueOnce(recovered)
    .mockRejectedValueOnce(new Error('Response interrupted'));
  await render();
  await act(async () => {
    await wager.place();
  });
  await act(async () => {
    await wager.place();
  });
  const uncertain = readPendingCasinoBet(7);
  const previousError = wager.error;
  expect(uncertain?.payload.request_id).not.toBe('a');
  expect(wager.pending).toEqual(uncertain);
  act(() => store.dispatch(setWallet({...wallet, balance: 0, modified_date: '2026-11-25T12:00:00.000900Z'})));
  await act(async () => {
    resolveRecovery(recovered);
  });
  expect(wager.canPlace).toBe(false);
  expect(wager.pending).toEqual(uncertain);
  expect(wager.error).toBe(previousError);
  expect(wager.wallet?.balance).toBe(0);
});
