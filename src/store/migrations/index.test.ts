import {createMigrate} from 'redux-persist';

import migrations from './index';

describe('exchange order cache migration', () => {
  it('recovers malformed cached orders while preserving the session and other data', async () => {
    const previousState = {
      _persist: {rehydrated: true, version: 1},
      authentication: {accessToken: 'local-test-token'},
      exchangeOrders: {
        exchangeOrders: {
          undefined: {asset_pair: 2, price: 10, quantity: 5, side: 1, status: 100},
        },
        hasMore: true,
        isLoading: true,
        next: '/api/exchange-orders?page=2',
      },
      wallets: {wallets: {1: {balance: 100}}},
    };

    const migratedState = await createMigrate(migrations)(previousState, 2);

    expect(migratedState).toEqual({
      ...previousState,
      exchangeOrders: {exchangeOrders: {}, hasMore: false, isLoading: false, next: null},
    });
    expect(previousState.exchangeOrders.exchangeOrders.undefined.status).toBe(100);
  });

  it('leaves a fresh browser without persisted state alone', async () => {
    expect(await createMigrate(migrations)(undefined, 2)).toBeUndefined();
  });
});
