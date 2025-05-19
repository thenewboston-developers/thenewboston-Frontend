export const WILDCARD = '*';

export const PATH_ART = `/art/${WILDCARD}`;
export const PATH_AUTHENTICATION = {
  LOGIN: '/signIn',
  LOGOUT: '/logout',
  SIGNUP: '/createAccount',
};

export const PATH_CURRENCIES = `/currencies/${WILDCARD}`;
export const PATH_EXCHANGE = `/exchange/${WILDCARD}`;
export const PATH_FEED = '/feed';
export const PATH_NOTIFICATIONS = '/notifications';
export const PATH_PROFILE = `/profile/:id/${WILDCARD}`;
export const PATH_SHOP = `/shop/${WILDCARD}`;
export const PATH_WALLETS = '/wallets';

// Default redirect path
export const PATH_DEFAULT = '/feed';
