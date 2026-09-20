import {MigrationManifest} from 'redux-persist';

const migrations: MigrationManifest = {
  2: (state) => {
    if (!state) return state;

    // Earlier order mutations cached incomplete records. Fetch a clean order
    // history without clearing the user's session or other persisted state.
    return {
      ...state,
      exchangeOrders: {
        exchangeOrders: {},
        hasMore: false,
        isLoading: false,
        next: null,
      },
    };
  },
};

export default migrations;
