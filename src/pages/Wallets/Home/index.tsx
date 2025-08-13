import {useCallback, useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {mdiArrowDownCircle, mdiArrowUpCircle, mdiSwapHorizontal} from '@mdi/js';
import Icon from '@mdi/react';
import orderBy from 'lodash/orderBy';

import {getCurrencies} from 'api/currencies';
import LeavesEmptyState from 'assets/leaves-empty-state.png';
import EmptyState from 'components/EmptyState';
import Tab from 'components/Tab';
import Tabs from 'components/Tabs';
import {WalletTab} from 'enums';
import {useToggle} from 'hooks';
import WalletCreateModal from 'modals/WalletCreateModal';
import WalletSelectModal from 'modals/WalletSelectModal';
import {getManager, getWallets} from 'selectors/state';
import {updateManager} from 'store/manager';
import {clearWallets} from 'store/wallets';
import {AppDispatch, SFC} from 'types';
import {displayErrorToast} from 'utils/toasts';

import SendCoinsSection from './SendCoinsSection';
import * as S from './Styles';
import WalletDeposit from './WalletDeposit';
import WalletSelector from './WalletSelector';
import WalletTransfers from './WalletTransfers';
import WalletWithdraw from './WalletWithdraw';

const Home: SFC = ({className}) => {
  const [currencyCheckKey, setCurrencyCheckKey] = useState(0);
  const [hasAvailableCurrencies, setHasAvailableCurrencies] = useState(false);
  const [transfersRefreshKey, setTransfersRefreshKey] = useState(0);
  const [walletCreateModalIsOpen, toggleWalletCreateModal] = useToggle(false);
  const [walletSelectModalIsOpen, toggleWalletSelectModal] = useToggle(false);
  const dispatch = useDispatch<AppDispatch>();
  const manager = useSelector(getManager);
  const wallets = useSelector(getWallets);
  const walletList = useMemo(() => orderBy(Object.values(wallets), [(wallet) => wallet.currency.ticker]), [wallets]);
  const {activeWallet} = manager;

  useEffect(() => {
    dispatch(clearWallets());
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      try {
        const response = await getCurrencies({no_wallet: true, page_size: 1});
        setHasAvailableCurrencies(response.count > 0);
      } catch (error) {
        displayErrorToast('Error checking available currencies');
      }
    })();
  }, [currencyCheckKey]);

  const handleTabClick = useCallback(
    (walletTab: WalletTab) => {
      dispatch(updateManager({activeWalletTab: walletTab}));
    },
    [dispatch],
  );

  const handleTransferSuccess = useCallback(() => {
    // Increment the refresh key to force WalletTransfers to re-render
    setTransfersRefreshKey((prev) => prev + 1);
  }, []);

  const renderButtonContainer = () => {
    if (!hasAvailableCurrencies) return null;

    return (
      <S.ButtonContainer $hasWallets={walletList.length > 0}>
        <S.Button onClick={toggleWalletCreateModal} text="Create Wallet" />
      </S.ButtonContainer>
    );
  };

  const renderRightContent = () => {
    if (manager.activeWallet) {
      return renderTabContent();
    }

    return (
      <S.EmptyStateWrapper>
        <EmptyState
          actionText="create a wallet"
          bottomText="To deposit or withdraw coins,"
          graphic={LeavesEmptyState}
          onActionTextClick={toggleWalletCreateModal}
          topText="Nothing here!"
        />
      </S.EmptyStateWrapper>
    );
  };

  const renderTabContent = () => {
    if (!manager.activeWalletTab) return null;

    const tabContent = {
      [WalletTab.DEPOSIT]: <WalletDeposit />,
      [WalletTab.TRANSFERS]: <WalletTransfers key={transfersRefreshKey} />,
      [WalletTab.WITHDRAW]: <WalletWithdraw />,
    };

    return tabContent[manager.activeWalletTab];
  };

  const renderTabs = () => {
    if (!manager.activeWallet) return null;

    return (
      <S.TabsContainer>
        <Tabs>
          <Tab
            isActive={manager.activeWalletTab === WalletTab.TRANSFERS}
            onClick={() => handleTabClick(WalletTab.TRANSFERS)}
          >
            <Icon path={mdiSwapHorizontal} size={'18px'} />
            <span>Transfers</span>
          </Tab>
          <Tab
            isActive={manager.activeWalletTab === WalletTab.DEPOSIT}
            onClick={() => handleTabClick(WalletTab.DEPOSIT)}
          >
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
      </S.TabsContainer>
    );
  };

  return (
    <>
      <S.Container className={className}>
        <S.MainContent>
          <S.TopSection>
            <S.WalletSelectorWrapper>
              <WalletSelector activeWallet={activeWallet} onClick={toggleWalletSelectModal} />
            </S.WalletSelectorWrapper>
            {renderButtonContainer()}
          </S.TopSection>
          {manager.activeWallet && (
            <SendCoinsSection key={manager.activeWallet.id} onTransferSuccess={handleTransferSuccess} />
          )}
          {renderTabs()}
          <S.ContentArea>{renderRightContent()}</S.ContentArea>
        </S.MainContent>
      </S.Container>
      {walletCreateModalIsOpen ? (
        <WalletCreateModal
          close={async () => {
            toggleWalletCreateModal();
            setCurrencyCheckKey((prev) => prev + 1);
          }}
        />
      ) : null}
      {walletSelectModalIsOpen ? <WalletSelectModal close={toggleWalletSelectModal} /> : null}
    </>
  );
};

export default Home;
