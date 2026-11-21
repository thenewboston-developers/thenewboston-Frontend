import {useCallback} from 'react';
import {useDispatch} from 'react-redux';

import useIsAuthenticated from 'hooks/useIsAuthenticated';
import {openAuthPrompt} from 'store/authPrompt';
import {AppDispatch} from 'types';
import {captureAnalyticsEvent} from 'utils/analytics';

// Keep analytics labels static: some UI intents contain another member's username.
const getAuthenticationAction = (intent: string): string => {
  if (intent === 'chat with the players and spectators') return 'game_chat';
  if (intent === 'comment on this post') return 'comment_create';
  if (intent === 'create your own currency') return 'currency_create';
  if (intent === 'like this post') return 'post_like';
  if (intent.startsWith('follow ')) return 'member_follow';
  if (intent.startsWith('send coins to ')) return 'coins_send';
  return 'member_action';
};

/**
 * Guards the actions that only a signed-in member can take (liking, commenting, following, trading, etc).
 *
 * The returned function reports whether the visitor is authenticated. When they are not, it asks them to sign in or
 * create an account instead, so the caller only has to stop:
 *
 *   if (!requireAuthentication('like this post')) return;
 *
 * The intent completes the sentence "Sign in or create an account to ...".
 */
const useRequireAuthentication = (): ((intent: string) => boolean) => {
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = useIsAuthenticated();

  return useCallback(
    (intent: string): boolean => {
      if (isAuthenticated) return true;
      captureAnalyticsEvent('authentication_required', {action: getAuthenticationAction(intent)});
      dispatch(openAuthPrompt(intent));
      return false;
    },
    [dispatch, isAuthenticated],
  );
};

export default useRequireAuthentication;
