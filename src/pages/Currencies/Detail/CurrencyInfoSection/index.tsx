import SocialLinks from 'components/SocialLinks';
import UserLabel from 'components/UserLabel';
import {Currency, SFC} from 'types';

import * as S from './Styles';

interface CurrencyInfoSectionProps {
  currency: Currency;
  totalAmountMinted: number | null;
}

const CurrencyInfoSection: SFC<CurrencyInfoSectionProps> = ({className, currency, totalAmountMinted}) => {
  const isInternalCurrency = currency.domain === null;

  return (
    <S.CurrencyPanel className={className}>
      <S.CurrencyLogo logo={currency.logo} width="150px" />
      <S.CurrencyContent>
        <S.CurrencyInfoContainer>
          <S.CurrencyInfo>
            <S.CurrencyName>{currency.ticker}</S.CurrencyName>
            {currency.domain ? (
              <S.CurrencyDomain>{currency.domain}</S.CurrencyDomain>
            ) : (
              <S.TypeBadge $internal={isInternalCurrency}>{isInternalCurrency ? 'Internal' : 'External'}</S.TypeBadge>
            )}
            {currency.description && <S.CurrencyDescription>{currency.description}</S.CurrencyDescription>}
            <S.OwnerInfo>
              <UserLabel
                avatar={currency.owner.avatar}
                description="Owner"
                id={currency.owner.id}
                username={currency.owner.username}
              />
            </S.OwnerInfo>
            <SocialLinks entity={currency} />
          </S.CurrencyInfo>
          {totalAmountMinted !== null && (
            <S.TotalMintedInfo>
              <S.TotalMintedLabel>Total Minted</S.TotalMintedLabel>
              <S.TotalMintedValue>{totalAmountMinted.toLocaleString()}</S.TotalMintedValue>
            </S.TotalMintedInfo>
          )}
        </S.CurrencyInfoContainer>
      </S.CurrencyContent>
    </S.CurrencyPanel>
  );
};

export default CurrencyInfoSection;
