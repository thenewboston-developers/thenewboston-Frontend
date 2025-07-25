import {useEffect} from 'react';
import {useDispatch} from 'react-redux';

import {getAssetPairs} from 'dispatchers/assetPairs';
import {getCurrencies} from 'dispatchers/currencies';
import {checkForDeploymentUpdate} from 'dispatchers/frontendDeployments';
import {getNotifications} from 'dispatchers/notifications';
import {getWallets} from 'dispatchers/wallets';
import {AppDispatch, SFC} from 'types';
import {displayErrorToast} from 'utils/toasts';

import LeftNav from './LeftNav';
import MainArea from './MainArea';
import * as S from './Styles';

const Authenticated: SFC = ({className}) => {
  const dispatch = useDispatch<AppDispatch>();

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
    <S.Container className={className}>
      <LeftNav />
      <MainArea />
    </S.Container>
  );
};

export default Authenticated;
