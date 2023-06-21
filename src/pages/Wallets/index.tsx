import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import orderBy from 'lodash/orderBy';

import {getWallets as _getWallets} from 'dispatchers/wallets';
import {WalletTab} from 'enums';
import {getWallets} from 'selectors/state';
import {updateManager} from 'store/manager';
import {AppDispatch, SFC} from 'types';
import MenuItem from './MenuItem';
import Tab from './Tab';
import Tabs from './Tabs';
import * as S from './Styles';

const Wallets: SFC = ({className}) => {
  const dispatch = useDispatch<AppDispatch>();
  const wallets = useSelector(getWallets);

  useEffect(() => {
    (async () => {
      await dispatch(_getWallets());
    })();
  }, [dispatch]);

  const handleTabClick = (walletTab: WalletTab) => {
    dispatch(updateManager({activeWalletTab: walletTab}));
  };

  const renderMenuItems = () => {
    const orderedWallets = orderBy(Object.values(wallets), [(wallet) => wallet.core.ticker]);
    return orderedWallets.map((wallet) => <MenuItem key={wallet.id} wallet={wallet} />);
  };

  return (
    <S.Container className={className}>
      <S.LeftMenu>{renderMenuItems()}</S.LeftMenu>
      <S.Right>
        <Tabs>
          <Tab onClick={handleTabClick} walletTab={WalletTab.deposit}>
            Deposit
          </Tab>
          <Tab onClick={handleTabClick} walletTab={WalletTab.withdraw}>
            Withdraw
          </Tab>
        </Tabs>
      </S.Right>
    </S.Container>
  );
};

export default Wallets;
