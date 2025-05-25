import {AnyAction, combineReducers, configureStore} from '@reduxjs/toolkit';
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
import currenciesReducer from 'store/currencies';
import exchangeOrdersReducer from 'store/exchangeOrders';
import followersReducer from 'store/followers';
import followingsReducer from 'store/followings';
import invitationLimitsReducer from 'store/invitationLimits';
import invitationsReducer from 'store/invitations';
import managerReducer from 'store/manager';
import migrations from 'store/migrations';
import notificationsReducer from 'store/notifications';
import postsReducer from 'store/posts';
import selfReducer from 'store/self';
import tradesReducer from 'store/trades';
import usersReducer from 'store/users';
import userStatsReducer from 'store/userStats';
import walletsReducer from 'store/wallets';
import wiresReducer from 'store/wires';

const rootReducer = combineReducers({
  assetPairs: assetPairsReducer,
  authentication: authenticationReducer,
  comments: commentsReducer,
  currencies: currenciesReducer,
  exchangeOrders: exchangeOrdersReducer,
  followers: followersReducer,
  followings: followingsReducer,
  invitationLimits: invitationLimitsReducer,
  invitations: invitationsReducer,
  manager: managerReducer,
  notifications: notificationsReducer,
  posts: postsReducer,
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
