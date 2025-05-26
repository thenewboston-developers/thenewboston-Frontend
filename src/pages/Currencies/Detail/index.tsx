import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';
import {mdiArrowLeft} from '@mdi/js';

import {getCurrency} from 'api/currencies';
import LeavesEmptyState from 'assets/leaves-empty-state.png';
import Button from 'components/Button';
import CurrencyLogo from 'components/CurrencyLogo';
import EmptyPage from 'components/EmptyPage';
import Icon from 'components/Icon';
import Loader from 'components/Loader';
import {createMint, getMints} from 'dispatchers/mints';
import {ToastType} from 'enums';
import {getMints as getMintsSelector, getSelf} from 'selectors/state';
import {AppDispatch, Currency, Mint, PaginatedResponse, SFC} from 'types';
import {displayErrorToast, displayToast} from 'utils/toasts';

import * as S from './Styles';

const Detail: SFC = ({className}) => {
  const {id} = useParams<{id: string}>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const self = useSelector(getSelf);
  const mints = useSelector(getMintsSelector);
  const [currency, setCurrency] = useState<Currency | null>(null);
  const [loading, setLoading] = useState(true);
  const [mintAmount, setMintAmount] = useState<string>('');
  const [minting, setMinting] = useState(false);
  const [mintsData, setMintsData] = useState<PaginatedResponse<Mint> | null>(null);
  const [loadingMints, setLoadingMints] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

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

  const handleMint = async () => {
    if (!currency || !mintAmount) return;

    const amount = parseInt(mintAmount);
    if (isNaN(amount) || amount <= 0) {
      displayErrorToast('Please enter a valid amount');
      return;
    }

    setMinting(true);
    try {
      await dispatch(createMint({currency: currency.id, amount}));
      setMintAmount('');
      displayToast(`Successfully minted ${amount.toLocaleString()} ${currency.ticker}`, ToastType.SUCCESS);
      // Refresh mints list
      setCurrentPage(1); // Reset to first page
    } catch (error: any) {
      displayErrorToast(error.response?.data?.error || 'Error minting currency');
    } finally {
      setMinting(false);
    }
  };

  const handleBack = () => {
    navigate('/currencies/home');
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const renderMintsList = () => {
    if (loadingMints) return <Loader />;

    if (!mintsData || mintsData.results.length === 0) {
      return <S.EmptyMints>No mints yet</S.EmptyMints>;
    }

    const mintsList = Object.values(mints)
      .filter((mint) => mint.currency === currency?.id)
      .sort((a, b) => new Date(b.created_date).getTime() - new Date(a.created_date).getTime());

    return (
      <>
        <S.MintsList>
          {mintsList.map((mint) => (
            <S.MintItem key={mint.id}>
              <S.MintAmount>{mint.amount.toLocaleString()}</S.MintAmount>
              <S.MintDate>{new Date(mint.created_date).toLocaleString()}</S.MintDate>
            </S.MintItem>
          ))}
        </S.MintsList>
        {mintsData.count > 20 && (
          <S.Pagination>
            {mintsData.previous && <Button onClick={() => handlePageChange(currentPage - 1)} text="Previous" />}
            <S.PageInfo>
              Page {currentPage} of {Math.ceil(mintsData.count / 20)}
            </S.PageInfo>
            {mintsData.next && <Button onClick={() => handlePageChange(currentPage + 1)} text="Next" />}
          </S.Pagination>
        )}
      </>
    );
  };

  const isInternalCurrency = currency?.domain === null;
  const isOwner = currency?.owner === self.id;

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
    <S.Container className={className}>
      <S.Header>
        <S.BackButton onClick={handleBack}>
          <Icon icon={mdiArrowLeft} />
          <span>Back to Currencies</span>
        </S.BackButton>
      </S.Header>

      <S.CurrencyInfo>
        <CurrencyLogo logo={currency.logo} width="80px" />
        <S.CurrencyDetails>
          <S.Ticker>{currency.ticker}</S.Ticker>
          <S.Domain>{currency.domain || 'Internal Currency'}</S.Domain>
          <S.TypeBadge $internal={isInternalCurrency}>{isInternalCurrency ? 'Internal' : 'External'}</S.TypeBadge>
        </S.CurrencyDetails>
      </S.CurrencyInfo>

      {isOwner && isInternalCurrency && (
        <S.MintSection>
          <S.SectionTitle>Mint New Coins</S.SectionTitle>

          <S.MintForm>
            <S.Input
              type="number"
              placeholder="Amount to mint"
              value={mintAmount}
              onChange={(e) => setMintAmount(e.target.value)}
              disabled={minting}
              min="1"
            />
            <Button onClick={handleMint} disabled={minting || !mintAmount} isSubmitting={minting} text="Mint" />
          </S.MintForm>
        </S.MintSection>
      )}

      {!isInternalCurrency && (
        <S.InfoSection>
          <S.InfoText>
            <strong>External Currency</strong>
            <p>This currency interfaces with external blockchain networks and supports deposits and withdrawals.</p>
          </S.InfoText>
        </S.InfoSection>
      )}

      {isInternalCurrency && !isOwner && (
        <S.InfoSection>
          <S.InfoText>
            <strong>Internal Currency</strong>
            <p>
              This is an internal currency that exists only within our platform. It cannot be deposited or withdrawn.
            </p>
          </S.InfoText>
        </S.InfoSection>
      )}

      <S.MintsSection>
        <S.SectionTitle>Minting History</S.SectionTitle>
        {renderMintsList()}
      </S.MintsSection>
    </S.Container>
  );
};

export default Detail;
