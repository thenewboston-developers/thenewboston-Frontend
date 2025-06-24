import {useNavigate} from 'react-router-dom';

import CurrencyLogo from 'components/CurrencyLogo';
import UserLabel from 'components/UserLabel';
import {Currency, SFC} from 'types';

import * as S from './Styles';

export interface CurrencyCardProps {
  currency: Currency;
}

const CurrencyCard: SFC<CurrencyCardProps> = ({className, currency}) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/currencies/${currency.id}`);
  };

  return (
    <S.Container className={className} onClick={handleCardClick}>
      <S.CardContent>
        <S.HeaderSection>
          <CurrencyLogo logo={currency.logo} width="56px" />
          <S.Text>
            <S.Ticker>{currency.ticker}</S.Ticker>
            <S.DomainInfo>
              {currency.domain ? <S.Domain>{currency.domain}</S.Domain> : <S.InternalBadge>Internal</S.InternalBadge>}
            </S.DomainInfo>
          </S.Text>
        </S.HeaderSection>
        {currency.description && (
          <S.DescriptionRow>
            <S.Description>{currency.description}</S.Description>
          </S.DescriptionRow>
        )}
        <S.Spacer />
        <S.Line />
        <S.OwnerRow>
          <UserLabel
            avatar={currency.owner.avatar}
            description="Owner"
            id={currency.owner.id}
            username={currency.owner.username}
          />
        </S.OwnerRow>
      </S.CardContent>
    </S.Container>
  );
};

export default CurrencyCard;
