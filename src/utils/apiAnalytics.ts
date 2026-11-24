import axios, {AxiosRequestConfig, InternalAxiosRequestConfig} from 'axios';

import {captureAnalyticsEvent} from 'utils/analytics';

// Only these method/path pairs may become analytics properties. Numeric IDs are normalized before lookup;
// request bodies, query strings, headers, response data, and error messages never enter an event.
const API_OPERATIONS: Record<string, string> = {
  'DELETE /comments/:id': 'comment_delete',
  'DELETE /currencies/:id': 'currency_delete',
  'DELETE /followers/:id': 'member_unfollow',
  'DELETE /invitations/:id': 'invitation_delete',
  'DELETE /posts/:id': 'post_delete',
  'DELETE /whitepapers/:id': 'whitepaper_delete',
  'GET /asset-pairs': 'asset_pairs_load',
  'GET /asset-pairs/:id': 'asset_pair_load',
  'GET /checkers/matches': 'checkers_matches_load',
  'GET /checkers/matches/:id': 'checkers_match_load',
  'GET /battleship/matches': 'battleship_matches_load',
  'GET /battleship/matches/:id': 'battleship_match_load',
  'GET /game-fund': 'game_fund_load',
  'GET /backgammon/matches': 'backgammon_matches_load',
  'GET /backgammon/matches/:id': 'backgammon_match_load',
  'GET /mancala/matches': 'mancala_matches_load',
  'GET /mancala/matches/:id': 'mancala_match_load',
  'GET /connect-five/challenges': 'game_challenges_load',
  'GET /connect-five/challenges/:id': 'game_challenge_load',
  'GET /connect-five/elo-snapshots': 'game_rating_history_load',
  'GET /connect-five/leaderboard': 'game_leaderboard_load',
  'GET /connect-five/matches': 'game_matches_load',
  'GET /connect-five/matches/:id': 'game_match_load',
  'GET /connect-five/matches/:id/chat': 'game_chat_load',
  'GET /connect-five/matches/:id/rematch-status': 'game_rematch_status_load',
  'GET /currencies': 'currencies_load',
  'GET /currencies/:id': 'currency_load',
  'GET /currency-balances': 'currency_balances_load',
  'GET /dots-and-boxes/matches': 'dots_and_boxes_matches_load',
  'GET /dots-and-boxes/matches/:id': 'dots_and_boxes_match_load',
  'GET /exchange-orders': 'exchange_orders_load',
  'GET /exchange-orders/book': 'order_book_load',
  'GET /followers': 'followers_load',
  'GET /invitations': 'invitations_load',
  'GET /mints': 'mints_load',
  'GET /notifications': 'notifications_load',
  'GET /post-likes': 'post_likes_load',
  'GET /posts': 'feed_load',
  'GET /posts/:id': 'post_load',
  'GET /reversi/matches': 'reversi_matches_load',
  'GET /reversi/matches/:id': 'reversi_match_load',
  'GET /trades': 'trades_load',
  'GET /transfers': 'transfers_load',
  'GET /user-wallets/:id': 'user_wallets_load',
  'GET /users/:id': 'profile_load',
  'GET /users/search': 'user_search',
  'GET /wallets': 'wallets_load',
  'GET /wallets/:id/deposit-balance': 'deposit_balance_load',
  'GET /whitepapers': 'whitepapers_load',
  'GET /wires': 'wires_load',
  'PATCH /comments/:id': 'comment_update',
  'PATCH /currencies/:id': 'currency_update',
  'PATCH /exchange-orders/:id': 'exchange_order_update',
  'PATCH /invitations/:id': 'invitation_update',
  'PATCH /notifications/:id': 'notification_read',
  'PATCH /notifications/mark-all-as-read': 'notifications_read_all',
  'PATCH /posts/:id': 'post_update',
  'PATCH /users/:id': 'profile_update',
  'PATCH /whitepapers/:id': 'whitepaper_update',
  'POST /comments': 'comment_create',
  'POST /checkers/matches': 'checkers_match_create',
  'POST /checkers/matches/:id/accept': 'checkers_accept',
  'POST /checkers/matches/:id/cancel': 'checkers_cancel',
  'POST /checkers/matches/:id/decline': 'checkers_decline',
  'POST /checkers/matches/:id/move': 'checkers_move',
  'POST /checkers/matches/:id/rematch': 'checkers_rematch',
  'POST /checkers/matches/:id/resign': 'checkers_resign',
  'POST /battleship/matches': 'battleship_match_create',
  'POST /battleship/matches/:id/accept': 'battleship_accept',
  'POST /battleship/matches/:id/cancel': 'battleship_cancel',
  'POST /battleship/matches/:id/decline': 'battleship_decline',
  'POST /battleship/matches/:id/place': 'battleship_place',
  'POST /battleship/matches/:id/fire': 'battleship_fire',
  'POST /battleship/matches/:id/rematch': 'battleship_rematch',
  'POST /battleship/matches/:id/resign': 'battleship_resign',
  'POST /game-fund/deposits': 'game_fund_contribute',
  'POST /connect-five/matches/computer': 'connect_five_computer_create',
  'POST /mancala/matches': 'mancala_match_create',
  'POST /mancala/matches/:id/accept': 'mancala_challenge_accept',
  'POST /mancala/matches/:id/cancel': 'mancala_challenge_cancel',
  'POST /mancala/matches/:id/decline': 'mancala_challenge_decline',
  'POST /mancala/matches/:id/move': 'mancala_move',
  'POST /mancala/matches/:id/rematch': 'mancala_rematch_request',
  'POST /mancala/matches/:id/resign': 'mancala_resign',
  'POST /backgammon/matches': 'backgammon_match_create',
  'POST /backgammon/matches/:id/accept': 'backgammon_challenge_accept',
  'POST /backgammon/matches/:id/cancel': 'backgammon_challenge_cancel',
  'POST /backgammon/matches/:id/decline': 'backgammon_challenge_decline',
  'POST /backgammon/matches/:id/double': 'backgammon_double',
  'POST /backgammon/matches/:id/move': 'backgammon_move',
  'POST /backgammon/matches/:id/next-game': 'backgammon_next_game',
  'POST /backgammon/matches/:id/rematch': 'backgammon_rematch_request',
  'POST /backgammon/matches/:id/resign': 'backgammon_resign',
  'POST /backgammon/matches/:id/respond-double': 'backgammon_double_response',
  'POST /backgammon/matches/:id/roll': 'backgammon_roll',
  'POST /connect-five/challenges': 'game_challenge_create',
  'POST /connect-five/challenges/:id/accept': 'game_challenge_accept',
  'POST /connect-five/challenges/:id/cancel': 'game_challenge_cancel',
  'POST /connect-five/challenges/:id/decline': 'game_challenge_decline',
  'POST /connect-five/matches/:id/chat': 'game_chat_send',
  'POST /connect-five/matches/:id/move': 'game_move',
  'POST /connect-five/matches/:id/purchase': 'game_special_purchase',
  'POST /connect-five/matches/:id/rematch': 'game_rematch_request',
  'POST /connect-five/matches/:id/resign': 'game_resign',
  'POST /currencies': 'currency_create',
  'POST /exchange-orders': 'exchange_order_create',
  'POST /followers': 'member_follow',
  'POST /invitations': 'invitation_create',
  'POST /login': 'sign_in',
  'POST /mints': 'currency_mint',
  'POST /posts': 'post_create',
  'POST /posts/:id/like': 'post_like',
  'POST /posts/:id/unlike': 'post_unlike',
  'POST /dots-and-boxes/matches': 'dots_and_boxes_match_create',
  'POST /dots-and-boxes/matches/:id/accept': 'dots_and_boxes_challenge_accept',
  'POST /dots-and-boxes/matches/:id/cancel': 'dots_and_boxes_challenge_cancel',
  'POST /dots-and-boxes/matches/:id/decline': 'dots_and_boxes_challenge_decline',
  'POST /dots-and-boxes/matches/:id/move': 'dots_and_boxes_move',
  'POST /dots-and-boxes/matches/:id/rematch': 'dots_and_boxes_rematch_request',
  'POST /dots-and-boxes/matches/:id/resign': 'dots_and_boxes_resign',
  'POST /reversi/matches': 'reversi_match_create',
  'POST /reversi/matches/:id/accept': 'reversi_challenge_accept',
  'POST /reversi/matches/:id/cancel': 'reversi_challenge_cancel',
  'POST /reversi/matches/:id/decline': 'reversi_challenge_decline',
  'POST /reversi/matches/:id/move': 'reversi_move',
  'POST /reversi/matches/:id/rematch': 'reversi_rematch_request',
  'POST /reversi/matches/:id/resign': 'reversi_resign',
  'POST /users': 'sign_up',
  'POST /wallets': 'wallet_create',
  'POST /wallets/:id/deposit': 'wallet_deposit',
  'POST /wallets/:id/withdraw': 'wallet_withdraw',
  'POST /whitepapers': 'whitepaper_create',
};

interface RequestAnalytics {
  endpoint: string;
  method: string;
  operation: string;
  startedAt: number;
  trackSuccess: boolean;
}

let unregisterApiAnalytics: (() => void) | undefined;

const getRequestAnalytics = (config: AxiosRequestConfig): RequestAnalytics | null => {
  const apiUrl = process.env.REACT_APP_API_URL;
  if (!apiUrl || !config.url) return null;

  try {
    const apiRoot = new URL(`${apiUrl.replace(/\/$/, '')}/api/`, window.location.origin);
    const requestUrl = new URL(config.url, config.baseURL || window.location.origin);
    if (requestUrl.origin !== apiRoot.origin || !requestUrl.pathname.startsWith(apiRoot.pathname)) return null;

    const endpoint = `/${requestUrl.pathname.slice(apiRoot.pathname.length)}`
      .replace(/\/\d+(?=\/|$)/g, '/:id')
      .replace(/\/$/, '');
    const method = (config.method || 'GET').toUpperCase();
    const operation = API_OPERATIONS[`${method} ${endpoint}`];
    if (!operation) return null;

    return {
      endpoint,
      method,
      operation,
      startedAt: Date.now(),
      trackSuccess: method !== 'GET' || operation === 'user_search',
    };
  } catch {
    return null;
  }
};

export const registerApiAnalytics = (): (() => void) => {
  if (unregisterApiAnalytics) return unregisterApiAnalytics;

  const requests = new WeakMap<InternalAxiosRequestConfig, RequestAnalytics>();
  const requestInterceptor = axios.interceptors.request.use((config) => {
    const request = getRequestAnalytics(config);
    if (request) {
      requests.set(config, request);
      if (request.trackSuccess) {
        const {endpoint, method, operation} = request;
        captureAnalyticsEvent('api_operation_started', {endpoint, method, operation});
      }
    }
    return config;
  });

  const captureOutcome = (config: InternalAxiosRequestConfig | undefined, outcome: string, status: number | null) => {
    if (!config) return;
    const request = requests.get(config);
    if (!request) return;
    requests.delete(config);
    if (!request.trackSuccess && outcome !== 'failed') return;

    const {endpoint, method, operation, startedAt} = request;
    captureAnalyticsEvent(`api_operation_${outcome}`, {
      duration_ms: Math.max(0, Date.now() - startedAt),
      endpoint,
      method,
      operation,
      status,
    });
  };

  const responseInterceptor = axios.interceptors.response.use(
    (response) => {
      captureOutcome(response.config, 'succeeded', response.status);
      return response;
    },
    (error: unknown) => {
      if (axios.isAxiosError(error)) {
        captureOutcome(error.config, axios.isCancel(error) ? 'cancelled' : 'failed', error.response?.status ?? null);
      }
      return Promise.reject(error);
    },
  );

  unregisterApiAnalytics = () => {
    axios.interceptors.request.eject(requestInterceptor);
    axios.interceptors.response.eject(responseInterceptor);
    unregisterApiAnalytics = undefined;
  };
  return unregisterApiAnalytics;
};
