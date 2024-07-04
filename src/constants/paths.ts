export const WILDCARD = '*';

export const PATH_ART = `/art/${WILDCARD}`;
export const PATH_AUTHENTICATION = {
  LOGIN: '/signIn',
  LOGOUT: '/logout',
  SIGNUP: '/createAccount',
};
export const BASE_CONTRIBUTIONS = '/contributions';
export const PATH_CONTRIBUTIONS = {
  HOME: `${BASE_CONTRIBUTIONS}/home`,
  LEARN_MORE: `${BASE_CONTRIBUTIONS}/learn-more`,
  ROOT: `${BASE_CONTRIBUTIONS}/${WILDCARD}`,
  SELF: `${BASE_CONTRIBUTIONS}/self`,
};
export const PATH_COURSES = '/university/courses';
export const PATH_COURSES_SELF = '/university/courses/self';
export const PATH_CURRENCIES = `/currencies/${WILDCARD}`;
export const PATH_EXCHANGE = `/exchange/${WILDCARD}`;
export const PATH_FEED = '/feed';
export const PATH_IA = '/ia/:id?';
export const PATH_LECTURES = '/university/lectures';
export const PATH_LECTURES_SELF = '/university/lectures/self';
export const PATH_NOTIFICATIONS = '/notifications';
export const PATH_PROFILE = `/profile/:id/${WILDCARD}`;
export const PATH_SHOP = `/shop/${WILDCARD}`;
export const PATH_WALLETS = '/wallets';

// Default redirect path
export const PATH_DEFAULT = '/feed';
