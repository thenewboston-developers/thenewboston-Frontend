import {useEffect} from 'react';
import {useDispatch} from 'react-redux';

import {getCores} from 'dispatchers/cores';
import {getOrders} from 'dispatchers/orders';
import {getTransfers} from 'dispatchers/transfers';
import {getWallets} from 'dispatchers/wallets';
import {AppDispatch, SFC} from 'types';
import LeftNav from './LeftNav';
import MainArea from './MainArea';
import * as S from './Styles';

const Authenticated: SFC = ({className}) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    (async () => {
      await dispatch(getCores());
      await dispatch(getOrders());
      await dispatch(getTransfers());
      await dispatch(getWallets());
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
