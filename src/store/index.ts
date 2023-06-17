import {FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {combineReducers, configureStore} from '@reduxjs/toolkit';

import authenticationReducer from 'store/authentication';
import coresReducer from 'store/cores';
import selfReducer from 'store/self';

const persistConfig = {
  key: 'thenewboston',
  storage,
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    authentication: authenticationReducer,
    cores: coresReducer,
    self: selfReducer,
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
