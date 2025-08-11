import {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';
import {mdiArrowLeft, mdiDotsVertical} from '@mdi/js';

import {getTotalAmountMinted} from 'api/totalAmountMinted';
import {deleteWhitepaper, getWhitepaper} from 'api/whitepapers';
import LeavesEmptyState from 'assets/leaves-empty-state.png';
import Button from 'components/Button';
import {ButtonColor} from 'components/Button/types';
import DropdownMenu from 'components/DropdownMenu';
import EmptyPage from 'components/EmptyPage';
import Icon from 'components/Icon';
import Loader from 'components/Loader';
import Tab from 'components/Tab';
import Tabs from 'components/Tabs';
import {deleteCurrency as _deleteCurrency, getCurrency} from 'dispatchers/currencies';
import {getMints} from 'dispatchers/mints';
import {ToastType} from 'enums';
import {useToggle} from 'hooks';
import ConfirmationModal from 'modals/ConfirmationModal';
import CurrencyModal from 'modals/CurrencyModal';
import MintModal from 'modals/MintModal';
import WhitepaperModal from 'modals/WhitepaperModal';
import {getCurrencies, getSelf} from 'selectors/state';
import {AppDispatch, Mint, PaginatedResponse, SFC, Whitepaper} from 'types';
import {displayErrorToast, displayToast} from 'utils/toasts';

import BalancesSection from './BalancesSection';
import CurrencyInfoSection from './CurrencyInfoSection';
import MintHistoryChart from './MintHistoryChart';
import MintSection from './MintSection';
import * as S from './Styles';
import WhitepaperSection from './WhitepaperSection';

const Detail: SFC = ({className}) => {
  const [activeTab, setActiveTab] = useState<'balances' | 'minting' | 'whitepaper'>('balances');
  const [currentPage, setCurrentPage] = useState(1);
  const [currencyModalIsOpen, toggleCurrencyModal] = useToggle(false);
  const [dataRefreshTrigger, setDataRefreshTrigger] = useState(0);
  const [deleteCurrencyConfirmationOpen, setDeleteCurrencyConfirmationOpen] = useState(false);
  const [deleteWhitepaperConfirmationOpen, setDeleteWhitepaperConfirmationOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingMints, setLoadingMints] = useState(false);
  const [mintModalIsOpen, toggleMintModal] = useToggle(false);
  const [mintsData, setMintsData] = useState<PaginatedResponse<Mint> | null>(null);
  const [totalAmountMinted, setTotalAmountMinted] = useState<number | null>(null);
  const [whitepaper, setWhitepaper] = useState<Whitepaper | null>(null);
  const [whitepaperModalIsOpen, toggleWhitepaperModal] = useToggle(false);
  const {id} = useParams<{id: string}>();
  const currencies = useSelector(getCurrencies);
  const currency = id ? currencies[parseInt(id)] : null;
  const dispatch = useDispatch<AppDispatch>();
  const isDeleting = useRef(false);
  const navigate = useNavigate();
  const self = useSelector(getSelf);

  useEffect(() => {
    if (!id || isDeleting.current) return;

    (async () => {
      try {
        if (!currency) {
          await dispatch(getCurrency(parseInt(id)));
        }

        const totalData = await getTotalAmountMinted(parseInt(id));
        setTotalAmountMinted(totalData.total_amount_minted);

        const whitepaperData = await getWhitepaper(parseInt(id));
        setWhitepaper(whitepaperData);
      } catch (error) {
        if (!isDeleting.current) {
          displayErrorToast('Error loading currency');
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [id, currency, dispatch]);

  useEffect(() => {
    if (!currency) return;

    (async () => {
      setLoadingMints(true);
      try {
        const data = await dispatch(getMints({currency: currency.id, page: currentPage}));
        setMintsData(data);
      } catch (error) {
        displayErrorToast('Error loading mints');
      } finally {
        setLoadingMints(false);
      }
    })();
  }, [currency, currentPage, dispatch]);

  const isInternalCurrency = currency?.domain === null;
  const isOwner = currency?.owner.id === self.id;

  const handleBackClick = () => {
    navigate('/currencies/home');
  };

  const handleConfirmDeleteCurrency = async () => {
    if (!currency) return;

    try {
      isDeleting.current = true;
      await dispatch(_deleteCurrency(currency.id));
      displayToast('Currency deleted!', ToastType.SUCCESS);
      navigate('/currencies/home');
    } catch (error) {
      isDeleting.current = false;
      displayErrorToast('Error deleting currency');
    } finally {
      setDeleteCurrencyConfirmationOpen(false);
    }
  };

  const handleConfirmDeleteWhitepaper = async () => {
    if (!whitepaper) return;

    try {
      await deleteWhitepaper(whitepaper.id);
      setWhitepaper(null);
      setDeleteWhitepaperConfirmationOpen(false);
      displayToast('Whitepaper deleted!', ToastType.SUCCESS);
    } catch (error) {
      displayErrorToast('Error deleting whitepaper');
    }
  };

  const handleCurrencyModalSuccess = async () => {
    if (!id) return;

    try {
      const totalData = await getTotalAmountMinted(parseInt(id));
      setTotalAmountMinted(totalData.total_amount_minted);
    } catch (error) {
      displayErrorToast('Error updating currency details');
    }
  };

  const handleDeleteCurrency = () => {
    setDeleteCurrencyConfirmationOpen(true);
  };

  const handleDeleteWhitepaper = () => {
    setDeleteWhitepaperConfirmationOpen(true);
  };

  const handleMintModalSuccess = async () => {
    if (!currency || !id) return;

    try {
      const totalData = await getTotalAmountMinted(parseInt(id));
      setTotalAmountMinted(totalData.total_amount_minted);
    } catch (error) {
      displayErrorToast('Error updating currency details');
    }

    const data = await dispatch(getMints({currency: currency.id, page: 1}));
    setMintsData(data);
    setCurrentPage(1);
    setDataRefreshTrigger((prev) => prev + 1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleWhitepaperModalSuccess = async () => {
    if (!id) return;

    try {
      const whitepaperData = await getWhitepaper(parseInt(id));
      setWhitepaper(whitepaperData);
    } catch (error) {
      displayErrorToast('Error updating whitepaper');
    }
  };

  const menuOptions = [
    {
      label: 'Edit Details',
      onClick: toggleCurrencyModal,
    },
    {
      label: 'Edit Whitepaper',
      onClick: toggleWhitepaperModal,
    },
    {
      label: 'Delete',
      onClick: handleDeleteCurrency,
    },
  ];

  if (loading)
    return (
      <S.LoaderWrapper>
        <Loader />
      </S.LoaderWrapper>
    );

  if (!currency)
    return (
      <EmptyPage
        bottomText="The requested currency could not be found"
        graphic={LeavesEmptyState}
        topText="Currency not found"
      />
    );

  return (
    <>
      <S.Container className={className}>
        <S.Header>
          <S.BackButton onClick={handleBackClick}>
            <Icon icon={mdiArrowLeft} size={20} />
            <span>All Currencies</span>
          </S.BackButton>
          {isOwner && <DropdownMenu icon={mdiDotsVertical} options={menuOptions} />}
        </S.Header>

        <S.ScrollableContent>
          <S.Content>
            <CurrencyInfoSection
              currency={currency}
              isInternalCurrency={isInternalCurrency}
              isOwner={isOwner}
              onMintClick={toggleMintModal}
              totalAmountMinted={totalAmountMinted}
            />
            <MintHistoryChart currency={currency} refreshTrigger={dataRefreshTrigger} />
            <S.TabSection>
              <S.TabHeader>
                <Tabs stackOnMobile>
                  <Tab isActive={activeTab === 'balances'} onClick={() => setActiveTab('balances')}>
                    Balances
                  </Tab>
                  <Tab isActive={activeTab === 'minting'} onClick={() => setActiveTab('minting')}>
                    Minting History
                  </Tab>
                  <Tab isActive={activeTab === 'whitepaper'} onClick={() => setActiveTab('whitepaper')}>
                    Whitepaper
                  </Tab>
                </Tabs>
                {isOwner && activeTab === 'whitepaper' && whitepaper && (
                  <Button color={ButtonColor.secondary} onClick={handleDeleteWhitepaper} text="Delete Whitepaper" />
                )}
              </S.TabHeader>
              <S.TabContent>
                {(() => {
                  if (activeTab === 'minting') {
                    return (
                      <MintSection
                        currency={currency}
                        currentPage={currentPage}
                        loadingMints={loadingMints}
                        mintsData={mintsData}
                        onPageChange={handlePageChange}
                      />
                    );
                  }
                  if (activeTab === 'whitepaper') {
                    return <WhitepaperSection currency={currency} whitepaper={whitepaper} />;
                  }
                  return <BalancesSection currency={currency} refreshTrigger={dataRefreshTrigger} />;
                })()}
              </S.TabContent>
            </S.TabSection>
          </S.Content>
        </S.ScrollableContent>
      </S.Container>
      {currencyModalIsOpen && currency && (
        <CurrencyModal close={toggleCurrencyModal} currency={currency} onSuccess={handleCurrencyModalSuccess} />
      )}
      {deleteCurrencyConfirmationOpen && (
        <ConfirmationModal
          close={() => setDeleteCurrencyConfirmationOpen(false)}
          confirmText="Delete"
          header="Delete Currency"
          message="Are you sure you want to delete this currency? This action cannot be undone."
          onConfirm={handleConfirmDeleteCurrency}
        />
      )}
      {deleteWhitepaperConfirmationOpen && (
        <ConfirmationModal
          close={() => setDeleteWhitepaperConfirmationOpen(false)}
          confirmText="Delete"
          header="Delete Whitepaper"
          message="Are you sure you want to delete this whitepaper? This action cannot be undone."
          onConfirm={handleConfirmDeleteWhitepaper}
        />
      )}
      {mintModalIsOpen && <MintModal close={toggleMintModal} currency={currency} onSuccess={handleMintModalSuccess} />}
      {whitepaperModalIsOpen && currency && (
        <WhitepaperModal
          close={toggleWhitepaperModal}
          currency={currency}
          onSuccess={handleWhitepaperModalSuccess}
          whitepaper={whitepaper}
        />
      )}
    </>
  );
};

export default Detail;
