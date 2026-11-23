import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {mdiWeb} from '@mdi/js';

import {getAssetPairs} from 'api/assetPairs';
import Button from 'components/Button';
import {ButtonColor} from 'components/Button/types';
import Linkify from 'components/Linkify';
import SocialLinks from 'components/SocialLinks';
import UserLabel from 'components/UserLabel';
import {DEFAULT_CURRENCY_TICKER} from 'constants/general';
import {Currency, SFC} from 'types';
import {longDate, shortDate} from 'utils/dates';
import {displayErrorToast} from 'utils/toasts';

import * as S from './Styles';

interface CurrencyInfoSectionProps {
  currency: Currency;
  holderCount: number | null;
  isInternalCurrency: boolean;
  isOwner: boolean;
  onMintClick: () => void;
  totalAmountMinted: number | null;
}

const EMPTY_STAT_VALUE = '—';

const CurrencyInfoSection: SFC<CurrencyInfoSectionProps> = ({
  className,
  currency,
  holderCount,
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

  const formatCount = (value: number | null) => {
    return value === null ? EMPTY_STAT_VALUE : value.toLocaleString();
  };

  const formatCreatedDate = () => {
    return new Date(currency.created_date).toLocaleDateString(undefined, {dateStyle: 'medium'});
  };

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
        {showMintButton && (
          <Button
            color={showTradeButton ? ButtonColor.secondary : ButtonColor.primary}
            onClick={onMintClick}
            text="Mint"
          />
        )}
        {showTradeButton && (
          <Button color={ButtonColor.primary} disabled={isLoadingAssetPair} onClick={handleTradeClick} text="Trade" />
        )}
      </S.ActionButtonContainer>
    );
  };

  const renderOrigin = () => {
    if (!currency.domain) return <S.InternalChip>Internal</S.InternalChip>;

    return (
      <S.CurrencyDomain>
        <S.DomainIcon icon={mdiWeb} size={16} totalSize="unset" />
        <S.CurrencyDomainText title={currency.domain}>{currency.domain}</S.CurrencyDomainText>
      </S.CurrencyDomain>
    );
  };

  const renderStat = (label: string, value: string, title?: string) => {
    return (
      <S.StatTile>
        <S.StatLabel>{label}</S.StatLabel>
        <S.StatValue title={title}>{value}</S.StatValue>
      </S.StatTile>
    );
  };

  // External currencies are minted on their own network, so their total here would always read as zero
  const renderSupplyStat = () => {
    if (currency.domain) return renderStat('Issued By', currency.domain, currency.domain);
    return renderStat('Total Minted', formatCount(totalAmountMinted));
  };

  return (
    <S.CurrencyPanel className={className}>
      <S.Summary>
        <S.CurrencyLogo logo={currency.logo} width="100%" />
        <S.Identity>
          <S.TitleRow>
            <S.CurrencyName>{currency.ticker}</S.CurrencyName>
            {renderOrigin()}
          </S.TitleRow>
          <S.OwnerRow>
            <S.OwnerPrefix>Created by</S.OwnerPrefix>
            <UserLabel
              avatar={currency.owner.avatar}
              avatarSize="24px"
              description=""
              id={currency.owner.id}
              username={currency.owner.username}
            />
          </S.OwnerRow>
        </S.Identity>
        {renderActionButtons()}
      </S.Summary>
      {currency.description && (
        <S.CurrencyDescription>
          <Linkify>{currency.description}</Linkify>
        </S.CurrencyDescription>
      )}
      <SocialLinks entity={currency} />
      <S.Stats>
        {renderSupplyStat()}
        {renderStat('Holders', formatCount(holderCount))}
        {renderStat('Created', formatCreatedDate(), longDate(currency.created_date))}
        {renderStat('Last Updated', shortDate(currency.modified_date, false).trim(), longDate(currency.modified_date))}
      </S.Stats>
    </S.CurrencyPanel>
  );
};

export default CurrencyInfoSection;
