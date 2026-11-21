import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useLocation} from 'react-router-dom';

import {PATH_HOME} from 'constants/paths';
import {checkForDeploymentUpdate} from 'dispatchers/frontendDeployments';
import {getNotifications} from 'dispatchers/notifications';
import {useIsAuthenticated, useIsMobile} from 'hooks';
import {getSelf} from 'selectors/state';
import {AppDispatch, SFC} from 'types';
import {isUnauthorizedError} from 'utils/errors';
import {displayErrorToast} from 'utils/toasts';

import BottomNav from './BottomNav';
import FloatingCreatePostButton from './FloatingCreatePostButton';
import LeftNav from './LeftNav';
import MainArea from './MainArea';
import * as S from './Styles';

/**
 * The navigation and page area shared by signed-in members and signed-out visitors. Visitors can browse everything
 * that is public, the parts that need an account are either hidden or ask them to sign in.
 */
const Main: SFC = ({className}) => {
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = useIsAuthenticated();
  const isMobile = useIsMobile();
  const location = useLocation();
  const self = useSelector(getSelf);

  const isOnHome = location.pathname === PATH_HOME;
  const isOnOwnProfile = location.pathname === `/profile/${self.id}`;
  const shouldShowFloatingButton = isAuthenticated && isMobile && (isOnHome || isOnOwnProfile);

  useEffect(() => {
    (async () => {
      try {
        const promises: Promise<unknown>[] = [dispatch(checkForDeploymentUpdate())];

        // Notifications belong to a member, there are none to fetch for a visitor
        if (isAuthenticated) promises.push(dispatch(getNotifications()));

        await Promise.all(promises);
      } catch (error) {
        // An expired session is already reported by the session handler, which also signs the visitor out
        if (!isUnauthorizedError(error)) displayErrorToast('Error fetching initial data');
      }
    })();
  }, [dispatch, isAuthenticated]);

  return (
    <S.Container $isMobile={isMobile} className={className}>
      {!isMobile && <LeftNav />}
      <S.MainArea>
        <MainArea />
      </S.MainArea>
      {isMobile && <BottomNav />}
      {shouldShowFloatingButton && <FloatingCreatePostButton />}
    </S.Container>
  );
};

export default Main;
