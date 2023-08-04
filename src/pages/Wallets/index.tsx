import {useCallback, useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import orderBy from 'lodash/orderBy';

import LeavesEmptyState from 'assets/leaves-empty-state.png';
import EmptyPage from 'components/EmptyPage';
import {getWallets as _getWallets} from 'dispatchers/wallets';
import {WalletTab} from 'enums';
import {useAvailableWalletCores, useToggle} from 'hooks';
import CreateWalletModal from 'modals/CreateWalletModal';
import {getManager, getWallets} from 'selectors/state';
import {updateManager} from 'store/manager';
import {AppDispatch, SFC} from 'types';
import MenuItem from './MenuItem';
import Tab from './Tab';
import Tabs from './Tabs';
import WalletDeposit from './WalletDeposit';
import WalletWithdraw from './WalletWithdraw';
import * as S from './Styles';

const Wallets: SFC = ({className}) => {
  const [createWalletModalIsOpen, toggleCreateWalletModal] = useToggle(false);
  const availableWalletCores = useAvailableWalletCores();
  const dispatch = useDispatch<AppDispatch>();
  const manager = useSelector(getManager);
  const wallets = useSelector(getWallets);

  useEffect(() => {
    (async () => {
      await dispatch(_getWallets());
    })();
  }, [dispatch]);

  const walletList = useMemo(() => orderBy(Object.values(wallets), [(wallet) => wallet.core.ticker]), [wallets]);

  useEffect(() => {
    (async () => {
      if (!walletList.length) return;
      if (manager.activeWalletId && manager.activeWalletTab) return;

      const firstWallet = walletList[0];

      dispatch(
        updateManager({
          activeWalletId: firstWallet.id,
          activeWalletTab: WalletTab.DEPOSIT,
        }),
      );
    })();
  }, [dispatch, manager.activeWalletId, manager.activeWalletTab, walletList]);

  const handleTabClick = useCallback(
    (walletTab: WalletTab) => {
      dispatch(updateManager({activeWalletTab: walletTab}));
    },
    [dispatch],
  );

  const renderButtonContainer = () => {
    if (!availableWalletCores.length) return null;

    return (
      <S.ButtonContainer>
        <S.Button onClick={toggleCreateWalletModal} text="Create Wallet" />
      </S.ButtonContainer>
    );
  };

  const renderMenuItems = () => {
    return walletList.map((wallet) => <MenuItem key={wallet.id} wallet={wallet} />);
  };

  const renderRightContent = () => {
    if (manager.activeWalletId) {
      return (
        <>
          {renderTabs()}
          {renderTabContent()}
        </>
      );
    }

    return (
      <EmptyPage
        actionText="create a wallet"
        bottomText="To deposit or withdraw coins"
        graphic={LeavesEmptyState}
        onActionTextClick={toggleCreateWalletModal}
        topText="Nothing here!"
      />
    );
  };

  const renderTabContent = () => {
    if (!manager.activeWalletTab) return null;

    const tabContent = {
      [WalletTab.DEPOSIT]: <WalletDeposit />,
      [WalletTab.WITHDRAW]: <WalletWithdraw />,
    };

    return tabContent[manager.activeWalletTab];
  };

  const renderTabs = () => (
    <Tabs>
      <Tab onClick={handleTabClick} walletTab={WalletTab.DEPOSIT}>
        Deposit
      </Tab>
      <Tab onClick={handleTabClick} walletTab={WalletTab.WITHDRAW}>
        Withdraw
      </Tab>
    </Tabs>
  );

  return (
    <>
      <S.Container className={className}>
        <S.LeftMenu>
          {renderButtonContainer()}
          {renderMenuItems()}
        </S.LeftMenu>
        <S.Right>{renderRightContent()}</S.Right>
      </S.Container>
      {createWalletModalIsOpen ? <CreateWalletModal close={toggleCreateWalletModal} /> : null}
    </>
  );
};

export default Wallets;
