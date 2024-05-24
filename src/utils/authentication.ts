import {store} from 'store';

export const authorizationFormHeaders = () => {
  const {
    authentication: {accessToken},
  } = store.getState();

  return {
    headers: {
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'multipart/form-data',
    },
  };
};

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
