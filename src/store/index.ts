import {configureStore} from '@reduxjs/toolkit';

import authenticationReducer from 'store/authentication';

const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
  },
});

export default store;
