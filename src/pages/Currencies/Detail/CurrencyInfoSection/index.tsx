import Badge, {BadgeStyle} from 'components/Badge';
import DateDisplay from 'components/DateDisplay';
import SocialLinks from 'components/SocialLinks';
import UserLabel from 'components/UserLabel';
import {Currency, SFC} from 'types';

import * as S from './Styles';

interface CurrencyInfoSectionProps {
  currency: Currency;
  totalAmountMinted: number | null;
}

const CurrencyInfoSection: SFC<CurrencyInfoSectionProps> = ({className, currency, totalAmountMinted}) => {
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
              <Badge badgeStyle={BadgeStyle.info}>Internal</Badge>
            )}
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
