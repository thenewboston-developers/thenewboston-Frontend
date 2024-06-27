import {useCallback, useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Icon from '@mdi/react';
import {mdiBankTransferIn, mdiBankTransferOut} from '@mdi/js';
import orderBy from 'lodash/orderBy';

import LeavesEmptyState from 'assets/leaves_empty_state.png';
import EmptyPage from 'components/EmptyPage';
import Tab from 'components/Tab';
import Tabs from 'components/Tabs';
import {AppDispatch, SFC} from 'types';
import {WalletTab} from 'enums';
import {getWallets as _getWallets} from 'dispatchers/wallets';
import {useAvailableWalletCores, useToggle} from 'hooks';
import WalletCreateModal from 'modals/WalletCreateModal';
import {getManager, getWallets} from 'selectors/state';
import {updateManager} from 'store/manager';
import {displayErrorToast} from 'utils/toasts';
import MenuItem from './MenuItem';
import WalletDeposit from './WalletDeposit';
import WalletWithdraw from './WalletWithdraw';

import * as S from './Styles';

const Wallets: SFC = ({className}) => {
  const [walletCreateModalIsOpen, toggleWalletCreateModal] = useToggle(false);
  const availableWalletCores = useAvailableWalletCores();
  const dispatch = useDispatch<AppDispatch>();
  const manager = useSelector(getManager);
  const wallets = useSelector(getWallets);

  useEffect(() => {
    (async () => {
      try {
        await dispatch(_getWallets());
      } catch (error) {
        displayErrorToast('Error fetching wallets');
      }
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
        <S.Button onClick={toggleWalletCreateModal} text="Create Wallet" />
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
        onActionTextClick={toggleWalletCreateModal}
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
      <Tab isActive={manager.activeWalletTab === WalletTab.DEPOSIT} onClick={() => handleTabClick(WalletTab.DEPOSIT)}>
        <Icon path={mdiBankTransferIn} size={'18px'} />
        <span>Deposit</span>
      </Tab>
      <Tab isActive={manager.activeWalletTab === WalletTab.WITHDRAW} onClick={() => handleTabClick(WalletTab.WITHDRAW)}>
        <Icon path={mdiBankTransferOut} size={'18px'} />
        <span>Withdraw</span>
      </Tab>
    </Tabs>
  );
  return (
    <>
      <S.Container className={className}>
        <S.LeftMenu>
          <S.Div>{renderButtonContainer()}</S.Div>
          <S.Box>{renderMenuItems()}</S.Box>
        </S.LeftMenu>
        <S.Right>{renderRightContent()}</S.Right>
      </S.Container>
      {walletCreateModalIsOpen ? <WalletCreateModal close={toggleWalletCreateModal} /> : null}
    </>
  );
};

export default Wallets;
