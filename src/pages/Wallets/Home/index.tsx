import {useCallback, useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {mdiArrowDownCircle, mdiArrowUpCircle, mdiSwapHorizontal} from '@mdi/js';
import Icon from '@mdi/react';
import orderBy from 'lodash/orderBy';

import LeavesEmptyState from 'assets/leaves-empty-state.png';
import EmptyPage from 'components/EmptyPage';
import Tab from 'components/Tab';
import Tabs from 'components/Tabs';
import {getWallets as _getWallets} from 'dispatchers/wallets';
import {WalletTab} from 'enums';
import {useAvailableWalletCurrencies, useToggle} from 'hooks';
import WalletCreateModal from 'modals/WalletCreateModal';
import {getManager, getWallets} from 'selectors/state';
import {updateManager} from 'store/manager';
import {AppDispatch, SFC} from 'types';
import {displayErrorToast} from 'utils/toasts';

import MenuItem from '../MenuItem';
import SendCoinsSection from '../SendCoinsSection';
import WalletDeposit from '../WalletDeposit';
import WalletTransfers from '../WalletTransfers';
import WalletWithdraw from '../WalletWithdraw';

import * as S from './Styles';

const Home: SFC = ({className}) => {
  const [walletCreateModalIsOpen, toggleWalletCreateModal] = useToggle(false);
  const availableWalletCores = useAvailableWalletCurrencies();
  const dispatch = useDispatch<AppDispatch>();
  const manager = useSelector(getManager);
  const wallets = useSelector(getWallets);
  const walletList = useMemo(() => orderBy(Object.values(wallets), [(wallet) => wallet.currency.ticker]), [wallets]);

  useEffect(() => {
    (async () => {
      try {
        await dispatch(_getWallets());
      } catch (error) {
        displayErrorToast('Error fetching wallets');
      }
    })();
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      if (!walletList.length) return;
      if (manager.activeWalletId && manager.activeWalletTab) return;

      const firstWallet = walletList[0];

      dispatch(
        updateManager({
          activeWalletId: firstWallet.id,
          activeWalletTab: WalletTab.TRANSFERS,
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
      <S.ButtonContainer $hasWallets={walletList.length > 0}>
        <S.Button onClick={toggleWalletCreateModal} text="Create Wallet" />
      </S.ButtonContainer>
    );
  };

  const renderMenuItems = () => {
    return walletList.map((wallet) => <MenuItem key={wallet.id} wallet={wallet} />);
  };

  const renderRightContent = () => {
    if (manager.activeWalletId) {
      return renderTabContent();
    }

    return (
      <S.EmptyPageWrapper>
        <EmptyPage
          actionText="create a wallet"
          bottomText="To deposit or withdraw coins,"
          graphic={LeavesEmptyState}
          onActionTextClick={toggleWalletCreateModal}
          topText="Nothing here!"
        />
      </S.EmptyPageWrapper>
    );
  };

  const renderTabContent = () => {
    if (!manager.activeWalletTab) return null;

    const tabContent = {
      [WalletTab.TRANSFERS]: <WalletTransfers />,
      [WalletTab.DEPOSIT]: <WalletDeposit />,
      [WalletTab.WITHDRAW]: <WalletWithdraw />,
    };

    return tabContent[manager.activeWalletTab];
  };

  const renderTabs = () => {
    if (!manager.activeWalletId) return null;

    return (
      <Tabs>
        <Tab
          isActive={manager.activeWalletTab === WalletTab.TRANSFERS}
          onClick={() => handleTabClick(WalletTab.TRANSFERS)}
        >
          <Icon path={mdiSwapHorizontal} size={'18px'} />
          <span>Transfers</span>
        </Tab>
        <Tab isActive={manager.activeWalletTab === WalletTab.DEPOSIT} onClick={() => handleTabClick(WalletTab.DEPOSIT)}>
          <Icon path={mdiArrowDownCircle} size={'18px'} />
          <span>Deposit</span>
        </Tab>
        <Tab
          isActive={manager.activeWalletTab === WalletTab.WITHDRAW}
          onClick={() => handleTabClick(WalletTab.WITHDRAW)}
        >
          <Icon path={mdiArrowUpCircle} size={'18px'} />
          <span>Withdraw</span>
        </Tab>
      </Tabs>
    );
  };

  return (
    <>
      <S.Container className={className}>
        <S.LeftMenu>
          <S.FlexContainer>{renderButtonContainer()}</S.FlexContainer>
          {walletList.length > 0 && <S.Box>{renderMenuItems()}</S.Box>}
        </S.LeftMenu>
        <S.MainContent>
          {manager.activeWalletId && <SendCoinsSection key={manager.activeWalletId} />}
          {renderTabs()}
          <S.ContentArea>{renderRightContent()}</S.ContentArea>
        </S.MainContent>
      </S.Container>
      {walletCreateModalIsOpen ? <WalletCreateModal close={toggleWalletCreateModal} /> : null}
    </>
  );
};

export default Home;
