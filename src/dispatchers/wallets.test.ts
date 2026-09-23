import {configureStore} from '@reduxjs/toolkit';

import {
  createWalletDeposit as requestDeposit,
  createWalletWithdraw as requestWithdraw,
  getWalletDepositBalance as requestDepositBalance,
} from 'api/wallets';
import {WalletTab, WireType} from 'enums';
import managerReducer, {updateManager} from 'store/manager';
import walletsReducer, {setWallet, setWallets} from 'store/wallets';
import wiresReducer from 'store/wires';
import {AppDispatch, Currency, Wallet, Wire} from 'types';

import {createWalletDeposit, createWalletWithdraw, getWalletDepositBalance} from './wallets';

jest.mock('api/wallets', () => ({
  createWallet: jest.fn(),
  createWalletDeposit: jest.fn(),
  createWalletWithdraw: jest.fn(),
  getWalletDepositBalance: jest.fn(),
  getWallets: jest.fn(),
}));

const initialWallet: Wallet = {
  balance: 0,
  created_date: '2026-09-22T23:40:00.000001Z',
  currency: {id: 89, ticker: 'BATTL'} as Currency,
  deposit_account_number: 'a'.repeat(64),
  deposit_balance: 0,
  deposit_signing_key: null,
  id: 829,
  modified_date: '2026-09-22T23:40:00.000001Z',
  owner: 1,
};

const depositWire: Wire = {
  amount: 9998,
  created_date: '2026-09-22T23:52:48.000001Z',
  currency: 89,
  id: '00000000-0000-0000-0000-000000000001',
  owner: 1,
  payload: {},
  recipient: 'b'.repeat(64),
  sender: 'a'.repeat(64),
  signature: '0'.repeat(128),
  transaction_fee: 1,
  wire_type: WireType.DEPOSIT,
};

const createTestStore = (wallet = initialWallet, tab = WalletTab.DEPOSIT) => {
  const store = configureStore({reducer: {manager: managerReducer, wallets: walletsReducer, wires: wiresReducer}});
  store.dispatch(setWallet(wallet));
  store.dispatch(updateManager({activeWallet: wallet, activeWalletTab: tab}));
  return store;
};

beforeEach(() => {
  jest.resetAllMocks();
});

describe('selected wallet API updates', () => {
  it('shows a refreshed deposit balance without reselecting the wallet', async () => {
    const store = createTestStore();
    const refreshed = {...initialWallet, deposit_balance: 9999, modified_date: '2026-09-22T23:47:24.123456Z'};
    jest.mocked(requestDepositBalance).mockResolvedValue(refreshed);

    await (store.dispatch as AppDispatch)(getWalletDepositBalance(initialWallet.id));

    expect(store.getState().manager.activeWallet).toEqual(refreshed);
    expect(store.getState().manager.activeWalletTab).toBe(WalletTab.DEPOSIT);
    expect(store.getState().wallets.wallets[initialWallet.id]).toEqual(refreshed);
  });

  it('clears the spendable deposit after a sweep and displays the credited exchange balance', async () => {
    const funded = {...initialWallet, deposit_balance: 9999};
    const store = createTestStore(funded);
    const swept = {...funded, balance: 9998, deposit_balance: 0, modified_date: '2026-09-22T23:52:48.000001Z'};
    const wire = depositWire;
    jest.mocked(requestDeposit).mockResolvedValue({wallet: swept, wire});

    await (store.dispatch as AppDispatch)(createWalletDeposit(initialWallet.id));

    expect(store.getState().manager.activeWallet?.deposit_balance).toBe(0);
    expect(store.getState().manager.activeWallet?.balance).toBe(9998);
    expect(store.getState().manager.activeWalletTab).toBe(WalletTab.DEPOSIT);
    expect(store.getState().wallets.wallets[initialWallet.id]).toEqual(swept);
    expect(store.getState().wires[wire.id]).toEqual(wire);
  });

  it('displays the debited balance after a withdrawal while retaining the selected tab', async () => {
    const funded = {...initialWallet, balance: 4998};
    const store = createTestStore(funded, WalletTab.WITHDRAW);
    const withdrawn = {...funded, balance: 0, modified_date: '2026-09-22T23:55:00.000001Z'};
    const wire = {
      ...depositWire,
      amount: 4997,
      id: '00000000-0000-0000-0000-000000000002',
      wire_type: WireType.WITHDRAW,
    };
    const request = {account_number: 'b'.repeat(64), amount: 4998};
    jest.mocked(requestWithdraw).mockResolvedValue({wallet: withdrawn, wire});

    await (store.dispatch as AppDispatch)(createWalletWithdraw(initialWallet.id, request));

    expect(store.getState().manager.activeWallet).toEqual(withdrawn);
    expect(store.getState().manager.activeWalletTab).toBe(WalletTab.WITHDRAW);
    expect(store.getState().wallets.wallets[initialWallet.id]).toEqual(withdrawn);
    expect(store.getState().wires[wire.id]).toEqual(wire);
  });

  it.each(['switch', 'deselect'])(
    'does not restore the request wallet after the user chooses to %s',
    async (choice) => {
      const store = createTestStore();
      let resolveRequest!: (wallet: Wallet) => void;
      jest.mocked(requestDepositBalance).mockReturnValue(
        new Promise((resolve) => {
          resolveRequest = resolve;
        }),
      );
      const pending = (store.dispatch as AppDispatch)(getWalletDepositBalance(initialWallet.id));
      const selected = choice === 'switch' ? {...initialWallet, id: 830} : null;
      const tab = selected ? WalletTab.TRANSFERS : null;
      store.dispatch(updateManager({activeWallet: selected, activeWalletTab: tab}));

      const refreshed = {...initialWallet, deposit_balance: 9999, modified_date: '2026-09-22T23:47:24.123456Z'};
      resolveRequest(refreshed);
      await pending;

      expect(store.getState().manager.activeWallet).toEqual(selected);
      expect(store.getState().manager.activeWalletTab).toBe(tab);
      expect(store.getState().wallets.wallets[initialWallet.id]).toEqual(refreshed);
    },
  );

  it('does not restore a swept deposit when an earlier refresh response arrives late', async () => {
    const store = createTestStore();
    let resolveRefresh!: (wallet: Wallet) => void;
    jest.mocked(requestDepositBalance).mockReturnValue(
      new Promise((resolve) => {
        resolveRefresh = resolve;
      }),
    );
    const pending = (store.dispatch as AppDispatch)(getWalletDepositBalance(initialWallet.id));
    const swept = {...initialWallet, balance: 9998, deposit_balance: 0, modified_date: '2026-09-22T23:52:48.000002Z'};
    jest.mocked(requestDeposit).mockResolvedValue({wallet: swept, wire: depositWire});
    await (store.dispatch as AppDispatch)(createWalletDeposit(initialWallet.id));

    resolveRefresh({...initialWallet, deposit_balance: 9999, modified_date: '2026-09-22T23:52:48.000001Z'});
    await pending;

    expect(store.getState().manager.activeWallet).toEqual(swept);
    expect(store.getState().wallets.wallets[initialWallet.id]).toEqual(swept);
  });
});

describe('wallet response ordering', () => {
  it('refreshes a persisted selection from a list response without changing its tab', () => {
    const store = createTestStore(initialWallet, WalletTab.WITHDRAW);
    const newer = {...initialWallet, balance: 9998, modified_date: '2026-09-22T23:52:48.000001Z'};

    store.dispatch(setWallets([newer]));

    expect(store.getState().manager.activeWallet).toEqual(newer);
    expect(store.getState().manager.activeWalletTab).toBe(WalletTab.WITHDRAW);
  });

  it('preserves newer and omitted wallets when an older list finishes loading', () => {
    const store = createTestStore();
    const newer = {...initialWallet, balance: 9998, modified_date: '2026-09-22T23:52:48.000002Z'};
    const another = {...newer, id: 830};
    store.dispatch(setWallet(newer));
    store.dispatch(setWallet(another));

    store.dispatch(
      setWallets([{...initialWallet, deposit_balance: 9999, modified_date: '2026-09-22T23:52:48.000001Z'}]),
    );
    store.dispatch(setWallets([]));

    expect(store.getState().manager.activeWallet).toEqual(newer);
    expect(store.getState().wallets.wallets).toEqual({[newer.id]: newer, [another.id]: another});
  });

  it('accepts a newer API version even when its timestamp differs by only one microsecond', () => {
    const store = createTestStore();
    const newer = {...initialWallet, deposit_balance: 9999, modified_date: '2026-09-22T23:40:00.000002Z'};

    store.dispatch(setWallet(newer));

    expect(store.getState().manager.activeWallet).toEqual(newer);
    expect(store.getState().wallets.wallets[initialWallet.id]).toEqual(newer);
  });

  it.each([false, true])('uses the newest duplicate in a paginated list (newest first: %s)', (newestFirst) => {
    const store = createTestStore();
    const older = {...initialWallet, deposit_balance: 9999, modified_date: '2026-09-22T23:52:48.000001Z'};
    const newer = {...older, balance: 9998, deposit_balance: 0, modified_date: '2026-09-22T23:52:48.000002Z'};

    store.dispatch(setWallets(newestFirst ? [newer, older] : [older, newer]));

    expect(store.getState().manager.activeWallet).toEqual(newer);
    expect(store.getState().wallets.wallets[initialWallet.id]).toEqual(newer);
  });

  it('does not replace a wallet with an equal-version payload', () => {
    const store = createTestStore({...initialWallet, balance: 9998});

    store.dispatch(setWallet(initialWallet));
    store.dispatch(setWallets([initialWallet]));

    expect(store.getState().manager.activeWallet?.balance).toBe(9998);
    expect(store.getState().wallets.wallets[initialWallet.id].balance).toBe(9998);
  });

  it('recovers an invalid persisted timestamp and rejects an invalid incoming timestamp', () => {
    const malformed = {...initialWallet, modified_date: 'invalid'};
    const store = createTestStore(malformed);

    store.dispatch(setWallet(initialWallet));
    store.dispatch(setWallet({...malformed, balance: 9999}));

    expect(store.getState().manager.activeWallet).toEqual(initialWallet);
    expect(store.getState().wallets.wallets[initialWallet.id]).toEqual(initialWallet);
  });
});
