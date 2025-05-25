import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';
import {mdiArrowLeft} from '@mdi/js';

import {getCurrency, mintCurrency} from 'api/currencies';
import LeavesEmptyState from 'assets/leaves-empty-state.png';
import Button from 'components/Button';
import CurrencyLogo from 'components/CurrencyLogo';
import EmptyPage from 'components/EmptyPage';
import Icon from 'components/Icon';
import Loader from 'components/Loader';
import {MAX_MINT_AMOUNT} from 'constants/general';
import {ToastType} from 'enums';
import {getSelf} from 'selectors/state';
import {Currency, Mint, SFC} from 'types';
import {displayErrorToast, displayToast} from 'utils/toasts';

import * as S from './Styles';

const Detail: SFC = ({className}) => {
  const {id} = useParams<{id: string}>();
  const navigate = useNavigate();
  const self = useSelector(getSelf);
  const [currency, setCurrency] = useState<Currency | null>(null);
  const [loading, setLoading] = useState(true);
  const [mintAmount, setMintAmount] = useState<string>('');
  const [minting, setMinting] = useState(false);
  const [totalMinted, setTotalMinted] = useState(0);

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

  const handleMint = async () => {
    if (!currency || !mintAmount) return;

    const amount = parseInt(mintAmount);
    if (isNaN(amount) || amount <= 0) {
      displayErrorToast('Please enter a valid amount');
      return;
    }

    if (totalMinted + amount > MAX_MINT_AMOUNT) {
      displayErrorToast(
        `Total minted amount would exceed maximum of ${MAX_MINT_AMOUNT.toLocaleString()}. Current total: ${totalMinted.toLocaleString()}`,
      );
      return;
    }

    setMinting(true);
    try {
      const mint: Mint = await mintCurrency(currency.id, amount);
      setTotalMinted(totalMinted + mint.amount);
      setMintAmount('');
      displayToast(`Successfully minted ${amount.toLocaleString()} ${currency.ticker}`, ToastType.SUCCESS);
    } catch (error: any) {
      displayErrorToast(error.response?.data?.error || 'Error minting currency');
    } finally {
      setMinting(false);
    }
  };

  const handleBack = () => {
    navigate('/currencies/home');
  };

  const isInternalCurrency = currency?.domain === null;
  const isOwner = currency?.owner === self.id;
  const remainingMintable = MAX_MINT_AMOUNT - totalMinted;

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
          <S.MintInfo>
            <S.InfoRow>
              <span>Total Minted:</span>
              <strong>{totalMinted.toLocaleString()}</strong>
            </S.InfoRow>
            <S.InfoRow>
              <span>Remaining Mintable:</span>
              <strong>{remainingMintable.toLocaleString()}</strong>
            </S.InfoRow>
          </S.MintInfo>

          <S.MintForm>
            <S.Input
              type="number"
              placeholder="Amount to mint"
              value={mintAmount}
              onChange={(e) => setMintAmount(e.target.value)}
              disabled={minting}
              min="1"
              max={remainingMintable}
            />
            <Button
              onClick={handleMint}
              disabled={minting || !mintAmount || remainingMintable === 0}
              isSubmitting={minting}
              text="Mint"
            />
          </S.MintForm>

          {remainingMintable === 0 && <S.Warning>Maximum mint limit reached</S.Warning>}
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
    </S.Container>
  );
};

export default Detail;
