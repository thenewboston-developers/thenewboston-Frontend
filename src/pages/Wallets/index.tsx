import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import orderBy from 'lodash/orderBy';

import {getWallets as _getWallets} from 'dispatchers/wallets';
import {getWallets} from 'selectors/state';
import {AppDispatch, SFC} from 'types';
import MenuItem from './MenuItem';
import * as S from './Styles';

const Wallets: SFC = ({className}) => {
  const dispatch = useDispatch<AppDispatch>();
  const wallets = useSelector(getWallets);

  useEffect(() => {
    (async () => {
      await dispatch(_getWallets());
    })();
  }, [dispatch]);

  const renderMenuItems = () => {
    const orderedWallets = orderBy(Object.values(wallets), [(wallet) => wallet.core.ticker]);
    return orderedWallets.map((wallet) => <MenuItem key={wallet.id} wallet={wallet} />);
  };

  return (
    <S.Container className={className}>
      <S.LeftMenu>{renderMenuItems()}</S.LeftMenu>
      <div>
        <div>right</div>
        <div>right</div>
        <div>right</div>
        <div>right</div>
      </div>
    </S.Container>
  );
};

export default Wallets;
