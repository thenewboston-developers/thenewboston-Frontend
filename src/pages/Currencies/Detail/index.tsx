import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';
import {mdiArrowLeft} from '@mdi/js';

import {getCurrency} from 'api/currencies';
import LeavesEmptyState from 'assets/leaves-empty-state.png';
import Button from 'components/Button';
import EmptyPage from 'components/EmptyPage';
import Icon from 'components/Icon';
import Loader from 'components/Loader';
import Tab from 'components/Tab';
import Tabs from 'components/Tabs';
import {getMints} from 'dispatchers/mints';
import {useToggle} from 'hooks';
import CurrencyEditModal from 'modals/CurrencyEditModal';
import MintModal from 'modals/MintModal';
import {getSelf} from 'selectors/state';
import {AppDispatch, CurrencyReadDetailSerializer, Mint, PaginatedResponse, SFC} from 'types';
import {displayErrorToast} from 'utils/toasts';

import BalancesSection from './BalancesSection';
import CurrencyInfoSection from './CurrencyInfoSection';
import MintSection from './MintSection';
import * as S from './Styles';

const Detail: SFC = ({className}) => {
  const [activeTab, setActiveTab] = useState<'minting' | 'balances'>('minting');
  const [currency, setCurrency] = useState<CurrencyReadDetailSerializer | null>(null);
  const [currencyEditModalIsOpen, toggleCurrencyEditModal] = useToggle(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMints, setLoadingMints] = useState(false);
  const [mintModalIsOpen, toggleMintModal] = useToggle(false);
  const [mintsData, setMintsData] = useState<PaginatedResponse<Mint> | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const {id} = useParams<{id: string}>();
  const navigate = useNavigate();
  const self = useSelector(getSelf);

  useEffect(() => {
    if (!id) return;

    (async () => {
      try {
        const data = await getCurrency(parseInt(id));
        setCurrency(data);
      } catch (error) {
        displayErrorToast('Error loading currency');
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

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

  const handleCurrencyEditSuccess = async () => {
    if (!currency || !id) return;

    // Refetch currency details to update the displayed data
    try {
      const updatedCurrency = await getCurrency(parseInt(id));
      setCurrency(updatedCurrency);
    } catch (error) {
      displayErrorToast('Error updating currency details');
    }
  };

  const handleMintModalSuccess = async () => {
    if (!currency || !id) return;

    // Refetch currency details to update total_amount_minted
    try {
      const updatedCurrency = await getCurrency(parseInt(id));
      setCurrency(updatedCurrency);
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

  if (loading) return <Loader />;
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
          {isOwner && <Button onClick={toggleCurrencyEditModal} text="Edit" />}
        </S.Header>

        <S.Content>
          <CurrencyInfoSection currency={currency} />
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
      {currencyEditModalIsOpen && (
        <CurrencyEditModal close={toggleCurrencyEditModal} currency={currency} onSuccess={handleCurrencyEditSuccess} />
      )}
      {mintModalIsOpen && <MintModal close={toggleMintModal} currency={currency} onSuccess={handleMintModalSuccess} />}
    </>
  );
};

export default Detail;
