import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {mdiWeb} from '@mdi/js';

import {getAssetPairs} from 'api/assetPairs';
import Button from 'components/Button';
import {ButtonColor} from 'components/Button/types';
import DateDisplay from 'components/DateDisplay';
import SocialLinks from 'components/SocialLinks';
import UserLabel from 'components/UserLabel';
import {DEFAULT_CURRENCY_TICKER} from 'constants/general';
import {Currency, SFC} from 'types';
import {displayErrorToast} from 'utils/toasts';

import * as S from './Styles';

interface CurrencyInfoSectionProps {
  currency: Currency;
  isInternalCurrency: boolean;
  isOwner: boolean;
  onMintClick: () => void;
  totalAmountMinted: number | null;
}

const CurrencyInfoSection: SFC<CurrencyInfoSectionProps> = ({
  className,
  currency,
  isInternalCurrency,
  isOwner,
  onMintClick,
  totalAmountMinted,
}) => {
  const [assetPairId, setAssetPairId] = useState<number | null>(null);
  const [isLoadingAssetPair, setIsLoadingAssetPair] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (currency.ticker === DEFAULT_CURRENCY_TICKER) {
        return;
      }

      setIsLoadingAssetPair(true);
      try {
        const assetPairs = await getAssetPairs({
          primary_currency_ticker: currency.ticker,
          secondary_currency_ticker: DEFAULT_CURRENCY_TICKER,
        });

        if (assetPairs.count > 0) {
          setAssetPairId(assetPairs.results[0].id);
        }
      } catch (error) {
        displayErrorToast('Error fetching asset pair');
      } finally {
        setIsLoadingAssetPair(false);
      }
    })();
  }, [currency.ticker]);

  const handleTradeClick = () => {
    if (assetPairId) {
      navigate(`/exchange/trade/${assetPairId}`);
    }
  };

  const showMintButton = isOwner && isInternalCurrency;
  const showTradeButton = currency.ticker !== DEFAULT_CURRENCY_TICKER && assetPairId;

  const renderActionButtons = () => {
    if (!showMintButton && !showTradeButton) return null;

    return (
      <S.ActionButtonContainer>
        {showMintButton && <Button onClick={onMintClick} text="Mint" />}
        {showTradeButton && (
          <Button color={ButtonColor.primary} disabled={isLoadingAssetPair} onClick={handleTradeClick} text="Trade" />
        )}
      </S.ActionButtonContainer>
    );
  };

  const renderDomain = () => {
    if (!currency.domain) return <S.InternalChip>Internal</S.InternalChip>;

    return (
      <S.CurrencyDomain>
        <S.DomainIcon icon={mdiWeb} size={16} totalSize="unset" />
        <S.CurrencyDomainText title={currency.domain}>{currency.domain}</S.CurrencyDomainText>
      </S.CurrencyDomain>
    );
  };

  const renderTotalMinted = () => {
    if (totalAmountMinted === null) return null;

    return (
      <S.StatTile>
        <S.StatLabel>Total Minted</S.StatLabel>
        <S.StatValue>{totalAmountMinted.toLocaleString()}</S.StatValue>
      </S.StatTile>
    );
  };

  return (
    <S.CurrencyPanel className={className}>
      <S.Banner />
      <S.Body>
        <S.TopRow>
          <S.CurrencyLogo logo={currency.logo} width="88px" />
          {renderActionButtons()}
        </S.TopRow>
        <S.HeaderRow>
          <S.Identity>
            <S.CurrencyName>{currency.ticker}</S.CurrencyName>
            {renderDomain()}
          </S.Identity>
          {renderTotalMinted()}
        </S.HeaderRow>
        {currency.description && <S.CurrencyDescription>{currency.description}</S.CurrencyDescription>}
        <S.MetadataRow>
          <UserLabel
            avatar={currency.owner.avatar}
            description="Owner"
            id={currency.owner.id}
            username={currency.owner.username}
          />
          <DateDisplay createdDate={currency.created_date} modifiedDate={currency.modified_date} />
        </S.MetadataRow>
        <SocialLinks entity={currency} />
      </S.Body>
    </S.CurrencyPanel>
  );
};

export default CurrencyInfoSection;
