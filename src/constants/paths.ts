export const WILDCARD = '*';

export const PATH_AUTHENTICATION = {
  CREATE_ACCOUNT: '/create-account',
  LOGOUT: '/logout',
  SIGN_IN: '/sign-in',
};
export const PATH_CHECKERS = `/checkers/${WILDCARD}`;
export const PATH_CASINO = `/casino/${WILDCARD}`;
export const PATH_BATTLESHIP = `/battleship/${WILDCARD}`;
export const PATH_BLACKJACK = `/blackjack/${WILDCARD}`;
export const PATH_BACKGAMMON = `/backgammon/${WILDCARD}`;
export const PATH_CONNECT_FIVE = `/connect-five/${WILDCARD}`;
export const PATH_CURRENCIES = `/currencies/${WILDCARD}`;
export const PATH_DOTS_AND_BOXES = `/dots-and-boxes/${WILDCARD}`;
export const PATH_EXCHANGE = `/exchange/${WILDCARD}`;
export const PATH_GAMES = '/games';
export const PATH_HEX = `/hex/${WILDCARD}`;
export const PATH_HOME = '/';
// The feed used to live at this path, so links and bookmarks that point to it are redirected to the home page
export const PATH_LEGACY_FEED = '/feed';
export const PATH_MANCALA = `/mancala/${WILDCARD}`;
export const PATH_NOTIFICATIONS = '/notifications';
export const PATH_POST_DETAIL = '/posts/:postId';
// Search parameter of the post detail page that names the comment to scroll to and highlight
export const POST_DETAIL_COMMENT_PARAM = 'comment';
export const PATH_PROFILE = `/profile/:id/${WILDCARD}`;
export const PATH_REVERSI = `/reversi/${WILDCARD}`;
export const PATH_ROULETTE = `/roulette/${WILDCARD}`;
export const PATH_SLOTS = `/slots/${WILDCARD}`;
export const PATH_WALLETS = `/wallets/${WILDCARD}`;

// Default redirect path
export const PATH_DEFAULT = PATH_HOME;
