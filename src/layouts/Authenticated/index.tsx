import {useEffect} from 'react';
import {useDispatch} from 'react-redux';

import {getAssetPairs} from 'dispatchers/assetPairs';
import {getCurrencies} from 'dispatchers/currencies';
import {getNotifications} from 'dispatchers/notifications';
import {getWallets} from 'dispatchers/wallets';
import {getWires} from 'dispatchers/wires';
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
          dispatch(getAssetPairs()),
          dispatch(getCurrencies()),
          dispatch(getNotifications()),
          dispatch(getWallets()),
          dispatch(getWires()),
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
