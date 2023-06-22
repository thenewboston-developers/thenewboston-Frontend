import {FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {combineReducers, configureStore} from '@reduxjs/toolkit';

import assetPairsReducer from 'store/assetPairs';
import authenticationReducer from 'store/authentication';
import coresReducer from 'store/cores';
import managerReducer from 'store/manager';
import selfReducer from 'store/self';
import walletsReducer from 'store/wallets';

const persistConfig = {
  key: 'thenewboston',
  storage,
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    assetPairs: assetPairsReducer,
    authentication: authenticationReducer,
    cores: coresReducer,
    manager: managerReducer,
    self: selfReducer,
    wallets: walletsReducer,
  }),
);

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
