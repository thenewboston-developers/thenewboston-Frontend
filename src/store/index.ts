import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  createMigrate,
  persistReducer,
  persistStore,
} from 'redux-persist';
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
import contributionsReducer from 'store/contributions';
import contributionsCumulativeReducer from 'store/contributionsCumulative';
import contributorsReducer from 'store/contributors';
import conversationsReducer from 'store/conversations';
import coresReducer from 'store/cores';
import coursesReducer from 'store/courses';
import exchangeOrdersReducer from 'store/exchangeOrders';
import followersReducer from 'store/followers';
import followingsReducer from 'store/followings';
import iaReducer from 'store/ia';
import lecturesReducer from 'store/lectures';
import managerReducer from 'store/manager';
import messagesReducer from 'store/messages';
import migrations from 'store/migrations';
import notificationsReducer from 'store/notifications';
import ordersReducer from 'store/orders';
import postsReducer from 'store/posts';
import productsReducer from 'store/products';
import selfReducer from 'store/self';
import tradesReducer from 'store/trades';
import userStatsReducer from 'store/userStats';
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
  contributions: contributionsReducer,
  contributionsCumulative: contributionsCumulativeReducer,
  contributors: contributorsReducer,
  conversations: conversationsReducer,
  cores: coresReducer,
  courses: coursesReducer,
  exchangeOrders: exchangeOrdersReducer,
  followers: followersReducer,
  followings: followingsReducer,
  ia: iaReducer,
  lectures: lecturesReducer,
  manager: managerReducer,
  messages: messagesReducer,
  notifications: notificationsReducer,
  orders: ordersReducer,
  posts: postsReducer,
  products: productsReducer,
  self: selfReducer,
  trades: tradesReducer,
  userStats: userStatsReducer,
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
  migrate: createMigrate(migrations, {debug: false}),
  storage,
  version: 1,
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
