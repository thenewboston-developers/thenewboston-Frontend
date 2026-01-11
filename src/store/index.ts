import {combineReducers, configureStore, UnknownAction} from '@reduxjs/toolkit';
import * as Sentry from '@sentry/react';
import {
  createMigrate,
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import {LOGOUT_USER} from 'store/actions';
import assetPairsReducer from 'store/assetPairs';
import authenticationReducer from 'store/authentication';
import commentsReducer from 'store/comments';
import connectFiveReducer from 'store/connectFive';
import currenciesReducer from 'store/currencies';
import exchangeOrdersReducer from 'store/exchangeOrders';
import followersReducer from 'store/followers';
import followingsReducer from 'store/followings';
import frontendDeploymentsReducer from 'store/frontendDeployments';
import invitationLimitsReducer from 'store/invitationLimits';
import invitationsReducer from 'store/invitations';
import managerReducer from 'store/manager';
import migrations from 'store/migrations';
import mintsReducer from 'store/mints';
import notificationsReducer from 'store/notifications';
import orderBookReducer from 'store/orderBook';
import postsReducer from 'store/posts';
import selfReducer from 'store/self';
import tradePriceChartDataReducer from 'store/tradePriceChartData';
import tradesReducer from 'store/trades';
import usersReducer from 'store/users';
import userStatsReducer from 'store/userStats';
import walletsReducer from 'store/wallets';
import wiresReducer from 'store/wires';

const rootReducer = combineReducers({
  assetPairs: assetPairsReducer,
  authentication: authenticationReducer,
  comments: commentsReducer,
  connectFive: connectFiveReducer,
  currencies: currenciesReducer,
  exchangeOrders: exchangeOrdersReducer,
  followers: followersReducer,
  followings: followingsReducer,
  frontendDeployments: frontendDeploymentsReducer,
  invitationLimits: invitationLimitsReducer,
  invitations: invitationsReducer,
  manager: managerReducer,
  mints: mintsReducer,
  notifications: notificationsReducer,
  orderBook: orderBookReducer,
  posts: postsReducer,
  self: selfReducer,
  tradePriceChartData: tradePriceChartDataReducer,
  trades: tradesReducer,
  userStats: userStatsReducer,
  users: usersReducer,
  wallets: walletsReducer,
  wires: wiresReducer,
});

const appReducer = (state: any, action: UnknownAction) => {
  if (action.type === LOGOUT_USER) state = undefined;
  return rootReducer(state, action);
};

const persistConfig = {
  key: 'thenewboston',
  migrate: createMigrate(migrations, {debug: false}),
  storage,
  version: 1,
  blacklist: ['frontendDeployments'],
};

const persistedReducer = persistReducer(persistConfig, appReducer);

const sentryReduxEnhancer = Sentry.createReduxEnhancer({
  // Optional: Configure what state is sent to Sentry
  stateTransformer: (state) => {
    // You can filter out sensitive data here
    return state;
  },
});

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE],
      },
    }),
  reducer: persistedReducer,
  enhancers: (getDefaultEnhancers) => {
    return getDefaultEnhancers().concat(sentryReduxEnhancer);
  },
});

export const persistor = persistStore(store);
