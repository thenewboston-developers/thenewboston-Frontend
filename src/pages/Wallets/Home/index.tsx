import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {
  mdiArrowDownCircleOutline,
  mdiArrowUpCircleOutline,
  mdiBookOpenPageVariantOutline,
  mdiPlus,
  mdiSwapHorizontal,
} from '@mdi/js';
import MdiIcon from '@mdi/react';

import {getAssetPairs} from 'api/assetPairs';
import {getCurrencies} from 'api/currencies';
import {getTradeHistoryItems} from 'api/tradeHistoryItems';
import Skeleton from 'components/Skeleton';
import Tab from 'components/Tab';
import Tabs from 'components/Tabs';
import {DEFAULT_CURRENCY_TICKER} from 'constants/general';
import {createWallet, getAllUserWallets} from 'dispatchers/wallets';
import {WalletTab} from 'enums';
import {useToggle} from 'hooks';
import SendModal from 'modals/SendModal';
import WalletCreateModal from 'modals/WalletCreateModal';
import {getManager, getSelf, getWallets as getWalletsState} from 'selectors/state';
import {updateManager} from 'store/manager';
import {AppDispatch, SFC, Wallet} from 'types';
import {displayErrorToast} from 'utils/toasts';

import * as S from './Styles';
import {EMPTY_MARKETS, getAllPages, getMarkets, getTotalValue, Markets} from './utils';
import WalletDeposit from './WalletDeposit';
import WalletHero from './WalletHero';
import WalletList from './WalletList';
import WalletTransfers from './WalletTransfers';
import WalletWithdraw from './WalletWithdraw';

type WalletsStatus = 'failed' | 'loaded' | 'loading';

const Home: SFC = ({className}) => {
  const [currencyCheckKey, setCurrencyCheckKey] = useState(0);
  const [hasAvailableCurrencies, setHasAvailableCurrencies] = useState(false);
  const [markets, setMarkets] = useState<Markets>(EMPTY_MARKETS);
  const [sendModalIsOpen, toggleSendModal] = useToggle(false);
  const [transfersRefreshKey, setTransfersRefreshKey] = useState(0);
  const [walletCreateModalIsOpen, toggleWalletCreateModal] = useToggle(false);
  const [walletSwitchModalIsOpen, toggleWalletSwitchModal] = useToggle(false);
  const [walletsStatus, setWalletsStatus] = useState<WalletsStatus>('loading');
  const defaultWalletInitializationAttemptedRef = useRef(false);
  const dispatch = useDispatch<AppDispatch>();
  const heroAnchorRef = useRef<HTMLDivElement>(null);
  const manager = useSelector(getManager);
  const self = useSelector(getSelf);
  const wallets = useSelector(getWalletsState);
  const walletList = useMemo(() => Object.values(wallets || {}), [wallets]);
  const {activeWallet} = manager;
  const activeWalletId = activeWallet?.id;
  const previousWalletIdRef = useRef(activeWalletId);
  const isExternalCurrency = !!activeWallet?.currency.domain;
  // Only a currency that lives on another network can be deposited or withdrawn
  const activeTab = (isExternalCurrency && manager.activeWalletTab) || WalletTab.TRANSFERS;
  const hasPrices = Object.keys(markets.prices).length > 0;
  const totalValue = useMemo(() => getTotalValue(walletList, markets.prices), [markets.prices, walletList]);

  useEffect(() => {
    let isCancelled = false;

    (async () => {
      try {
        await dispatch(getAllUserWallets());
        if (!isCancelled) setWalletsStatus('loaded');
      } catch (error) {
        if (isCancelled) return;
        displayErrorToast('Error fetching wallets');
        setWalletsStatus('failed');
      }
    })();

    return () => {
      isCancelled = true;
    };
  }, [dispatch]);

  useEffect(() => {
    let isCancelled = false;

    (async () => {
      try {
        const [assetPairs, tradeHistoryItems] = await Promise.all([
          getAllPages((page) => getAssetPairs({page, page_size: 100})),
          getAllPages((page) => getTradeHistoryItems('-market_cap', page)),
        ]);

        if (!isCancelled) setMarkets(getMarkets(assetPairs, tradeHistoryItems));
      } catch (error) {
        // The page works without the exchange: estimates and the link to the trading desk are simply left out
      }
    })();

    return () => {
      isCancelled = true;
    };
  }, []);

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

  // Everyone starts with a wallet for the default currency: it is opened when no wallet is, and created when missing
  useEffect(() => {
    if (defaultWalletInitializationAttemptedRef.current) return;
    if (walletsStatus !== 'loaded' || self.id === null) return;

    defaultWalletInitializationAttemptedRef.current = true;
    if (activeWallet) return;

    const defaultWallet = walletList.find(({currency}) => currency.ticker === DEFAULT_CURRENCY_TICKER);

    if (defaultWallet) {
      dispatch(updateManager({activeWallet: defaultWallet, activeWalletTab: WalletTab.TRANSFERS}));
      return;
    }

    const selfId = self.id;

    (async () => {
      let defaultCurrencyId: number;

      try {
        const currenciesResponse = await getCurrencies({page_size: 100, search: DEFAULT_CURRENCY_TICKER});
        const defaultCurrency = currenciesResponse.results.find(
          ({ticker}) => ticker.toUpperCase() === DEFAULT_CURRENCY_TICKER,
        );

        if (!defaultCurrency) {
          displayErrorToast(`${DEFAULT_CURRENCY_TICKER} currency is unavailable`);
          return;
        }

        defaultCurrencyId = defaultCurrency.id;
      } catch (error) {
        displayErrorToast('Error checking default wallet');
        return;
      }

      try {
        const wallet = await dispatch(createWallet({currency: defaultCurrencyId, owner: selfId}));
        dispatch(updateManager({activeWallet: wallet, activeWalletTab: WalletTab.TRANSFERS}));
      } catch (error) {
        displayErrorToast('Error creating wallet');
      }
    })();
  }, [activeWallet, dispatch, self.id, walletList, walletsStatus]);

  // A wallet picked while its activity is on screen would otherwise open with its balance out of sight
  useEffect(() => {
    if (previousWalletIdRef.current === activeWalletId) return;

    const isSwitch = previousWalletIdRef.current !== undefined;
    previousWalletIdRef.current = activeWalletId;
    if (isSwitch) heroAnchorRef.current?.scrollIntoView?.({block: 'nearest'});
  }, [activeWalletId]);

  const getSummary = (): string => {
    if (!walletList.length) return 'Every coin you hold on thenewboston, in one place.';

    const count = `${walletList.length.toLocaleString()} ${walletList.length === 1 ? 'wallet' : 'wallets'}`;
    if (!hasPrices) return count;

    return `${count} worth about ${totalValue.toLocaleString()} ${DEFAULT_CURRENCY_TICKER} at the last trade prices`;
  };

  const handleTabClick = useCallback(
    (walletTab: WalletTab) => {
      dispatch(updateManager({activeWalletTab: walletTab}));
    },
    [dispatch],
  );

  const handleTransferSuccess = useCallback(() => {
    setTransfersRefreshKey((previous) => previous + 1);
  }, []);

  const handleWalletClick = useCallback(
    (wallet: Wallet) => {
      if (wallet.id !== activeWalletId) {
        dispatch(updateManager({activeWallet: wallet, activeWalletTab: WalletTab.TRANSFERS}));
      }
    },
    [activeWalletId, dispatch],
  );

  const handleWalletSwitch = (wallet: Wallet) => {
    handleWalletClick(wallet);
    toggleWalletSwitchModal();
  };

  const renderMain = () => {
    if (!activeWallet) {
      return (
        <S.Main aria-busy="true" aria-label="Loading wallet">
          <Skeleton borderRadius={16} height={264} />
          <Skeleton borderRadius={16} height={320} />
        </S.Main>
      );
    }

    return (
      <S.Main>
        <S.HeroAnchor ref={heroAnchorRef}>
          <WalletHero
            markets={markets}
            onSendClick={toggleSendModal}
            onSwitchClick={toggleWalletSwitchModal}
            wallet={activeWallet}
            walletCount={walletList.length}
          />
        </S.HeroAnchor>
        {renderTabs()}
        {renderTabContent(activeWallet)}
      </S.Main>
    );
  };

  const renderTabContent = (wallet: Wallet) => {
    if (activeTab === WalletTab.DEPOSIT) return <WalletDeposit />;
    if (activeTab === WalletTab.WITHDRAW) return <WalletWithdraw />;
    return <WalletTransfers refreshKey={transfersRefreshKey} wallet={wallet} />;
  };

  const renderTabs = () => {
    if (!isExternalCurrency) return null;

    return (
      <Tabs>
        <Tab isActive={activeTab === WalletTab.TRANSFERS} onClick={() => handleTabClick(WalletTab.TRANSFERS)}>
          <MdiIcon aria-hidden="true" path={mdiSwapHorizontal} size="18px" />
          <span>Activity</span>
        </Tab>
        <Tab isActive={activeTab === WalletTab.DEPOSIT} onClick={() => handleTabClick(WalletTab.DEPOSIT)}>
          <MdiIcon aria-hidden="true" path={mdiArrowDownCircleOutline} size="18px" />
          <span>Deposit</span>
        </Tab>
        <Tab isActive={activeTab === WalletTab.WITHDRAW} onClick={() => handleTabClick(WalletTab.WITHDRAW)}>
          <MdiIcon aria-hidden="true" path={mdiArrowUpCircleOutline} size="18px" />
          <span>Withdraw</span>
        </Tab>
      </Tabs>
    );
  };

  return (
    <>
      <S.Container className={className}>
        <S.Content>
          <S.Introduction>
            <div>
              <S.PageTitle>Wallets</S.PageTitle>
              <S.IntroductionDescription>{getSummary()}</S.IntroductionDescription>
            </div>
            <S.IntroductionActions>
              <Link to="/wallets/learn-more">
                <MdiIcon aria-hidden="true" path={mdiBookOpenPageVariantOutline} size="20px" />
                How wallets work
              </Link>
              {hasAvailableCurrencies ? (
                <S.NewWalletButton iconLeft={mdiPlus} onClick={toggleWalletCreateModal} text="New wallet" />
              ) : null}
            </S.IntroductionActions>
          </S.Introduction>
          <S.Layout>
            <S.Sidebar aria-label="Your wallets">
              <S.SidebarHeading>Your wallets</S.SidebarHeading>
              <WalletList
                activeWalletId={activeWalletId ?? null}
                isLoading={walletsStatus === 'loading'}
                onWalletClick={handleWalletClick}
                prices={markets.prices}
                wallets={walletList}
              />
            </S.Sidebar>
            {renderMain()}
          </S.Layout>
        </S.Content>
      </S.Container>
      {sendModalIsOpen ? <SendModal close={toggleSendModal} onSuccess={handleTransferSuccess} /> : null}
      {walletCreateModalIsOpen ? (
        <WalletCreateModal
          close={() => {
            toggleWalletCreateModal();
            setCurrencyCheckKey((previous) => previous + 1);
          }}
        />
      ) : null}
      {walletSwitchModalIsOpen ? (
        <S.WalletSwitchModal close={toggleWalletSwitchModal} header="Your wallets">
          <S.WalletSwitchModalBody>
            <WalletList
              activeWalletId={activeWalletId ?? null}
              isLoading={walletsStatus === 'loading'}
              onWalletClick={handleWalletSwitch}
              prices={markets.prices}
              wallets={walletList}
            />
          </S.WalletSwitchModalBody>
        </S.WalletSwitchModal>
      ) : null}
    </>
  );
};

export default Home;
