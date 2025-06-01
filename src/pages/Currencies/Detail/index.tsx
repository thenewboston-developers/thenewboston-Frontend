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
import MintModal from 'modals/MintModal';
import {getSelf} from 'selectors/state';
import {AppDispatch, CurrencyReadDetailSerializer, Mint, PaginatedResponse, SFC} from 'types';
import {displayErrorToast} from 'utils/toasts';

import BalancesSection from './BalancesSection';
import CurrencyInfoSection from './CurrencyInfoSection';
import MintSection from './MintSection';
import * as S from './Styles';

const Detail: SFC = ({className}) => {
  const {id} = useParams<{id: string}>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const self = useSelector(getSelf);
  const [currency, setCurrency] = useState<CurrencyReadDetailSerializer | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMints, setLoadingMints] = useState(false);
  const [mintsData, setMintsData] = useState<PaginatedResponse<Mint> | null>(null);
  const [activeTab, setActiveTab] = useState<'minting' | 'balances'>('minting');
  const [mintModalIsOpen, toggleMintModal] = useToggle(false);

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

  const handleMintSuccess = async () => {
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

  const handleBack = () => {
    navigate('/currencies/home');
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const isInternalCurrency = currency?.domain === null;
  const isOwner = currency?.owner.id === self.id;

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
          <S.BackButton onClick={handleBack}>
            <Icon icon={mdiArrowLeft} size={20} />
            <span>Back to Currencies</span>
          </S.BackButton>
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
                  mintsData={mintsData}
                  loadingMints={loadingMints}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                  onMintSuccess={handleMintSuccess}
                />
              ) : (
                <BalancesSection currency={currency} />
              )}
            </S.TabContent>
          </S.TabSection>
        </S.Content>
      </S.Container>
      {mintModalIsOpen && <MintModal close={toggleMintModal} currency={currency} onSuccess={handleMintSuccess} />}
    </>
  );
};

export default Detail;
