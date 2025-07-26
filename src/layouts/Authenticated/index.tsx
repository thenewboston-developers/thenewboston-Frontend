import {useEffect} from 'react';
import {useDispatch} from 'react-redux';

import {getAssetPairs} from 'dispatchers/assetPairs';
import {getCurrencies} from 'dispatchers/currencies';
import {checkForDeploymentUpdate} from 'dispatchers/frontendDeployments';
import {getNotifications} from 'dispatchers/notifications';
import {getWallets} from 'dispatchers/wallets';
import {useWindowSize} from 'hooks';
import {breakpoints} from 'styles';
import {AppDispatch, SFC} from 'types';
import {displayErrorToast} from 'utils/toasts';

import BottomNav from './BottomNav';
import FloatingCreatePostButton from './FloatingCreatePostButton';
import LeftNav from './LeftNav';
import MainArea from './MainArea';
import * as S from './Styles';

const Authenticated: SFC = ({className}) => {
  const dispatch = useDispatch<AppDispatch>();
  const {width} = useWindowSize();

  const isMobile = width < parseInt(breakpoints.mobile);

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
      {isMobile && (
        <>
          <BottomNav />
          <FloatingCreatePostButton />
        </>
      )}
    </S.Container>
  );
};

export default Authenticated;
