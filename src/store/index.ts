import {FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {AnyAction, combineReducers, configureStore} from '@reduxjs/toolkit';

import {LOGOUT_USER} from 'store/actions';
import assetPairsReducer from 'store/assetPairs';
import authenticationReducer from 'store/authentication';
import coresReducer from 'store/cores';
import exchangeOrdersReducer from 'store/exchangeOrders';
import managerReducer from 'store/manager';
import selfReducer from 'store/self';
import tradesReducer from 'store/trades';
import walletsReducer from 'store/wallets';
import wiresReducer from 'store/wires';

const rootReducer = combineReducers({
  assetPairs: assetPairsReducer,
  authentication: authenticationReducer,
  cores: coresReducer,
  exchangeOrders: exchangeOrdersReducer,
  manager: managerReducer,
  self: selfReducer,
  trades: tradesReducer,
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
