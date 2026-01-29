export const WILDCARD = '*';

export const PATH_AUTHENTICATION = {
  CREATE_ACCOUNT: '/create-account',
  LOGOUT: '/logout',
  SIGN_IN: '/sign-in',
};
export const PATH_CONNECT_FIVE = `/connect-five/${WILDCARD}`;
export const PATH_CURRENCIES = `/currencies/${WILDCARD}`;
export const PATH_EXCHANGE = `/exchange/${WILDCARD}`;
export const PATH_FEED = '/feed';
export const PATH_NOTIFICATIONS = '/notifications';
export const PATH_POST_DETAIL = '/posts/:postId';
export const PATH_PROFILE = `/profile/:id/${WILDCARD}`;
export const PATH_WALLETS = `/wallets/${WILDCARD}`;

// Default redirect path
export const PATH_DEFAULT = '/feed';
