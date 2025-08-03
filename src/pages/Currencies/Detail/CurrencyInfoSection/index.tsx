import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

import {getAssetPairs} from 'api/assetPairs';
import Badge, {BadgeStyle} from 'components/Badge';
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

        if (assetPairs.length > 0) {
          setAssetPairId(assetPairs[0].id);
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

  return (
    <S.CurrencyPanel className={className}>
      <S.CurrencyLogo logo={currency.logo} width="150px" />
      <S.CurrencyContent>
        <S.CurrencyInfoContainer>
          <S.HeaderRow>
            <S.TickerBadgeContainer>
              <S.CurrencyName>{currency.ticker}</S.CurrencyName>
              {currency.domain ? (
                <S.CurrencyDomain>{currency.domain}</S.CurrencyDomain>
              ) : (
                <Badge badgeStyle={BadgeStyle.info}>Internal</Badge>
              )}
            </S.TickerBadgeContainer>
            {totalAmountMinted !== null && (
              <S.TotalMintedInfo>
                <S.TotalMintedLabel>Total Minted</S.TotalMintedLabel>
                <S.TotalMintedValue>{totalAmountMinted.toLocaleString()}</S.TotalMintedValue>
              </S.TotalMintedInfo>
            )}
          </S.HeaderRow>
          <S.CurrencyInfo>
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
            {(showMintButton || showTradeButton) && (
              <S.ActionButtonContainer>
                {showMintButton && <Button onClick={onMintClick} text="Mint" />}
                {showTradeButton && (
                  <Button
                    color={ButtonColor.primary}
                    disabled={isLoadingAssetPair}
                    onClick={handleTradeClick}
                    text="Trade"
                  />
                )}
              </S.ActionButtonContainer>
            )}
          </S.CurrencyInfo>
        </S.CurrencyInfoContainer>
      </S.CurrencyContent>
    </S.CurrencyPanel>
  );
};

export default CurrencyInfoSection;
