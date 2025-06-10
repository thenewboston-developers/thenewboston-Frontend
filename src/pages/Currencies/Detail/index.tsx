import {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';
import {mdiArrowLeft, mdiDotsVertical} from '@mdi/js';

import {getTotalAmountMinted} from 'api/totalAmountMinted';
import LeavesEmptyState from 'assets/leaves-empty-state.png';
import Button from 'components/Button';
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
import CurrencyModal from 'modals/CurrencyModal';
import MintModal from 'modals/MintModal';
import {getCurrencies, getSelf} from 'selectors/state';
import {AppDispatch, Mint, PaginatedResponse, SFC} from 'types';
import {displayErrorToast, displayToast} from 'utils/toasts';

import BalancesSection from './BalancesSection';
import CurrencyInfoSection from './CurrencyInfoSection';
import MintSection from './MintSection';
import * as S from './Styles';

const Detail: SFC = ({className}) => {
  const [activeTab, setActiveTab] = useState<'minting' | 'balances'>('minting');
  const [currentPage, setCurrentPage] = useState(1);
  const [currencyModalIsOpen, toggleCurrencyModal] = useToggle(false);
  const [loading, setLoading] = useState(true);
  const [loadingMints, setLoadingMints] = useState(false);
  const [mintModalIsOpen, toggleMintModal] = useToggle(false);
  const [mintsData, setMintsData] = useState<PaginatedResponse<Mint> | null>(null);
  const [totalAmountMinted, setTotalAmountMinted] = useState<number | null>(null);
  const currencies = useSelector(getCurrencies);
  const dispatch = useDispatch<AppDispatch>();
  const isDeleting = useRef(false);
  const navigate = useNavigate();
  const self = useSelector(getSelf);
  const {id} = useParams<{id: string}>();
  const currency = id ? currencies[parseInt(id)] : null;

  useEffect(() => {
    if (!id || isDeleting.current) return;

    (async () => {
      try {
        // Check if currency is already in store
        if (!currency) {
          await dispatch(getCurrency(parseInt(id)));
        }

        // Fetch total amount minted separately
        const totalData = await getTotalAmountMinted(parseInt(id));
        setTotalAmountMinted(totalData.total_amount_minted);
      } catch (error) {
        // Only show error if we're not in the process of deleting
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

  const handleDelete = async () => {
    if (!currency) return;

    try {
      isDeleting.current = true;
      await dispatch(_deleteCurrency(currency.id));
      displayToast('Currency deleted!', ToastType.SUCCESS);
      navigate('/currencies/home');
    } catch (error) {
      isDeleting.current = false;
      displayErrorToast('Error deleting currency');
    }
  };

  const menuOptions = [
    {
      label: 'Edit',
      onClick: toggleCurrencyModal,
    },
    {
      label: 'Delete',
      onClick: handleDelete,
    },
  ];

  const handleBackClick = () => {
    navigate('/currencies/home');
  };

  const handleCurrencyModalSuccess = async () => {
    if (!id) return;

    // Refetch total amount minted after update
    try {
      const totalData = await getTotalAmountMinted(parseInt(id));
      setTotalAmountMinted(totalData.total_amount_minted);
    } catch (error) {
      displayErrorToast('Error updating currency details');
    }
  };

  const handleMintModalSuccess = async () => {
    if (!currency || !id) return;

    // Refetch total amount minted after minting
    try {
      const totalData = await getTotalAmountMinted(parseInt(id));
      setTotalAmountMinted(totalData.total_amount_minted);
    } catch (error) {
      displayErrorToast('Error updating currency details');
    }

    // Refetch mints list
    const data = await dispatch(getMints({currency: currency.id, page: 1}));
    setMintsData(data);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

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
            <span>Back to Currencies</span>
          </S.BackButton>
          {isOwner && <DropdownMenu icon={mdiDotsVertical} options={menuOptions} />}
        </S.Header>

        <S.Content>
          <CurrencyInfoSection currency={currency} totalAmountMinted={totalAmountMinted} />
          <S.TabSection>
            <S.TabHeader>
              <Tabs>
                <Tab isActive={activeTab === 'minting'} onClick={() => setActiveTab('minting')}>
                  Minting History
                </Tab>
                <Tab isActive={activeTab === 'balances'} onClick={() => setActiveTab('balances')}>
                  Balances
                </Tab>
              </Tabs>
              {isOwner && isInternalCurrency && activeTab === 'minting' && (
                <Button onClick={toggleMintModal} text="Mint" />
              )}
            </S.TabHeader>
            <S.TabContent>
              {activeTab === 'minting' ? (
                <MintSection
                  currency={currency}
                  currentPage={currentPage}
                  loadingMints={loadingMints}
                  mintsData={mintsData}
                  onPageChange={handlePageChange}
                />
              ) : (
                <BalancesSection currency={currency} />
              )}
            </S.TabContent>
          </S.TabSection>
        </S.Content>
      </S.Container>
      {currencyModalIsOpen && currency && (
        <CurrencyModal close={toggleCurrencyModal} currency={currency} onSuccess={handleCurrencyModalSuccess} />
      )}
      {mintModalIsOpen && <MintModal close={toggleMintModal} currency={currency} onSuccess={handleMintModalSuccess} />}
    </>
  );
};

export default Detail;
