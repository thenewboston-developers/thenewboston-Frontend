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

describe('post cache migration', () => {
  it('empties the cached posts, which have no images list, while preserving the session and other data', async () => {
    const previousState = {
      _persist: {rehydrated: true, version: 2},
      authentication: {accessToken: 'local-test-token'},
      comments: {1: {content: 'Nice', id: 1, post: 7}},
      posts: {
        hasMore: true,
        isLoading: true,
        next: '/api/posts?page=2',
        posts: [{content: 'One photo', id: 7, image: 'https://example.test/media/images/photo.png'}],
      },
    };

    const migratedState = await createMigrate(migrations)(previousState, 3);

    expect(migratedState).toEqual({
      ...previousState,
      posts: {hasMore: false, isLoading: false, next: null, posts: []},
    });
  });

  it('leaves a fresh browser without persisted state alone', async () => {
    expect(await createMigrate(migrations)(undefined, 3)).toBeUndefined();
  });
});
