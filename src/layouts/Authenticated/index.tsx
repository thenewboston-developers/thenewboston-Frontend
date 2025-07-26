import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useLocation} from 'react-router-dom';

import {getAssetPairs} from 'dispatchers/assetPairs';
import {getCurrencies} from 'dispatchers/currencies';
import {checkForDeploymentUpdate} from 'dispatchers/frontendDeployments';
import {getNotifications} from 'dispatchers/notifications';
import {getWallets} from 'dispatchers/wallets';
import {useIsMobile} from 'hooks';
import {getSelf} from 'selectors/state';
import {AppDispatch, SFC} from 'types';
import {displayErrorToast} from 'utils/toasts';

import BottomNav from './BottomNav';
import FloatingCreatePostButton from './FloatingCreatePostButton';
import LeftNav from './LeftNav';
import MainArea from './MainArea';
import * as S from './Styles';

const Authenticated: SFC = ({className}) => {
  const dispatch = useDispatch<AppDispatch>();
  const isMobile = useIsMobile();
  const location = useLocation();
  const self = useSelector(getSelf);

  const isOnFeed = location.pathname === '/feed';
  const isOnOwnProfile = location.pathname === `/profile/${self.id}`;
  const shouldShowFloatingButton = isMobile && (isOnFeed || isOnOwnProfile);

  useEffect(() => {
    (async () => {
      try {
        await Promise.all([
          dispatch(checkForDeploymentUpdate()),
          dispatch(getAssetPairs()),
          dispatch(getCurrencies()),
          dispatch(getNotifications()),
          dispatch(getWallets()),
        ]);
      } catch (error) {
        displayErrorToast('Error fetching initial data');
      }
    })();
  }, [dispatch]);

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

export default Authenticated;
