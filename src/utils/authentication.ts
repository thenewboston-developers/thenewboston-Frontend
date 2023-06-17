import {store} from 'store';

export const authorizationHeaders = () => {
  const {
    authentication: {accessToken},
  } = store.getState();

  return {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
};
