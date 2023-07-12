import {useEffect} from 'react';
import {useDispatch} from 'react-redux';

import {getCores} from 'dispatchers/cores';
import {getExchangeOrders} from 'dispatchers/exchangeOrders';
import {getTransfers} from 'dispatchers/transfers';
import {getWallets} from 'dispatchers/wallets';
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
        await dispatch(getCores());
        await dispatch(getExchangeOrders());
        await dispatch(getTransfers());
        await dispatch(getWallets());
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
