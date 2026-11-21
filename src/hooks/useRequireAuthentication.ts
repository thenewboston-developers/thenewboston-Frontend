import {useCallback} from 'react';
import {useDispatch} from 'react-redux';

import useIsAuthenticated from 'hooks/useIsAuthenticated';
import {openAuthPrompt} from 'store/authPrompt';
import {AppDispatch} from 'types';

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
      dispatch(openAuthPrompt(intent));
      return false;
    },
    [dispatch, isAuthenticated],
  );
};

export default useRequireAuthentication;
