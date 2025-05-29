import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';
import {mdiArrowLeft} from '@mdi/js';

import {getCurrency} from 'api/currencies';
import LeavesEmptyState from 'assets/leaves-empty-state.png';
import EmptyPage from 'components/EmptyPage';
import Icon from 'components/Icon';
import Loader from 'components/Loader';
import UserLabel from 'components/UserLabel';
import {getMints} from 'dispatchers/mints';
import {AppDispatch, CurrencyReadDetailSerializer, Mint, PaginatedResponse, SFC} from 'types';
import {displayErrorToast} from 'utils/toasts';

import MintSection from './MintSection';
import * as S from './Styles';

const Detail: SFC = ({className}) => {
  const {id} = useParams<{id: string}>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [currency, setCurrency] = useState<CurrencyReadDetailSerializer | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMints, setLoadingMints] = useState(false);
  const [mintsData, setMintsData] = useState<PaginatedResponse<Mint> | null>(null);

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
    if (!currency) return;
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
          <S.CurrencyPanel>
            <S.CurrencyLogo logo={currency.logo} width="96px" />
            <S.CurrencyContent>
              <S.CurrencyHeader>
                <S.CurrencyHeaderInfo>
                  <S.CurrencyName>{currency.ticker}</S.CurrencyName>
                  {currency.domain ? (
                    <S.CurrencyDomain>{currency.domain}</S.CurrencyDomain>
                  ) : (
                    <S.TypeBadge $internal={isInternalCurrency}>
                      {isInternalCurrency ? 'Internal' : 'External'}
                    </S.TypeBadge>
                  )}
                  <S.OwnerInfo>
                    <UserLabel
                      avatar={currency.owner.avatar}
                      description="Owner"
                      id={currency.owner.id}
                      username={currency.owner.username}
                    />
                  </S.OwnerInfo>
                </S.CurrencyHeaderInfo>
              </S.CurrencyHeader>
            </S.CurrencyContent>
          </S.CurrencyPanel>

          <MintSection
            currency={currency}
            mintsData={mintsData}
            loadingMints={loadingMints}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            onMintSuccess={handleMintSuccess}
          />
        </S.Content>
      </S.Container>
    </>
  );
};

export default Detail;
