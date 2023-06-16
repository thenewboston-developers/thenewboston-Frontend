import {configureStore} from '@reduxjs/toolkit';

import authenticationReducer from 'store/authentication';
import selfReducer from 'store/self';

const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    self: selfReducer,
  },
});

export default store;
