import {useEffect} from 'react';
import {useDispatch} from 'react-redux';

import {getAddresses} from 'dispatchers/addresses';
import {getAssetPairs} from 'dispatchers/assetPairs';
import {getCartProducts} from 'dispatchers/cartProducts';
import {getCores} from 'dispatchers/cores';
import {getExchangeOrders} from 'dispatchers/exchangeOrders';
import {getWallets} from 'dispatchers/wallets';
import {getWires} from 'dispatchers/wires';
import {AppDispatch, SFC} from 'types';
import {displayErrorToast} from 'utils/toast';
import LeftNav from './LeftNav';
import MainArea from './MainArea';
import * as S from './Styles';

const Authenticated: SFC = ({className}) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    (async () => {
      try {
        await Promise.all([
          dispatch(getAddresses()),
          dispatch(getAssetPairs()),
          dispatch(getCartProducts()),
          dispatch(getCores()),
          dispatch(getExchangeOrders()),
          dispatch(getWallets()),
          dispatch(getWires()),
        ]);
      } catch (error) {
        console.error(error);
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
