import {FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {AnyAction, combineReducers, configureStore} from '@reduxjs/toolkit';

import {LOGOUT_USER} from 'store/actions';
import addressesReducer from 'store/addresses';
import artworksReducer from 'store/artworks';
import artworkTransfersReducer from 'store/artworkTransfers';
import assetPairsReducer from 'store/assetPairs';
import authenticationReducer from 'store/authentication';
import cartProductsReducer from 'store/cartProducts';
import commentsReducer from 'store/comments';
import coresReducer from 'store/cores';
import exchangeOrdersReducer from 'store/exchangeOrders';
import invitationLimitsReducer from 'store/invitationLimits';
import invitationsReducer from 'store/invitations';
import managerReducer from 'store/manager';
import notificationsReducer from 'store/notifications';
import ordersReducer from 'store/orders';
import postsReducer from 'store/posts';
import productsReducer from 'store/products';
import selfReducer from 'store/self';
import tradesReducer from 'store/trades';
import usersReducer from 'store/users';
import walletsReducer from 'store/wallets';
import wiresReducer from 'store/wires';

const rootReducer = combineReducers({
  addresses: addressesReducer,
  artworkTransfers: artworkTransfersReducer,
  artworks: artworksReducer,
  assetPairs: assetPairsReducer,
  authentication: authenticationReducer,
  cartProducts: cartProductsReducer,
  comments: commentsReducer,
  cores: coresReducer,
  exchangeOrders: exchangeOrdersReducer,
  invitationLimits: invitationLimitsReducer,
  invitations: invitationsReducer,
  manager: managerReducer,
  notifications: notificationsReducer,
  orders: ordersReducer,
  posts: postsReducer,
  products: productsReducer,
  self: selfReducer,
  trades: tradesReducer,
  users: usersReducer,
  wallets: walletsReducer,
  wires: wiresReducer,
});

const appReducer = (state: any, action: AnyAction) => {
  if (action.type === LOGOUT_USER) state = undefined;
  return rootReducer(state, action);
};

const persistConfig = {
  key: 'thenewboston',
  storage,
};

const persistedReducer = persistReducer(persistConfig, appReducer);

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE],
      },
    }),
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
