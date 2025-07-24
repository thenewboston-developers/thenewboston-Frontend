import {useNavigate} from 'react-router-dom';

import UserLabel from 'components/UserLabel';
import {Currency, SFC} from 'types';
import {shortDate} from 'utils/dates';

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
          <S.CurrencyLogo logo={currency.logo} width="96px" />
          <S.Text>
            <S.TickerRow>
              <S.Ticker>{currency.ticker}</S.Ticker>
              {currency.domain ? <S.Domain>{currency.domain}</S.Domain> : <S.InternalBadge>Internal</S.InternalBadge>}
            </S.TickerRow>
            {currency.description && <S.Description>{currency.description}</S.Description>}
          </S.Text>
        </S.HeaderSection>
        <S.Spacer />
        <S.Line />
        <S.MetadataRow>
          <UserLabel
            avatar={currency.owner.avatar}
            description="Owner"
            id={currency.owner.id}
            username={currency.owner.username}
          />
          <S.DateContainer>
            <S.DateLabel>Created: {shortDate(currency.created_date, false)}</S.DateLabel>
            <S.DateLabel>Modified: {shortDate(currency.modified_date, false)}</S.DateLabel>
          </S.DateContainer>
        </S.MetadataRow>
      </S.CardContent>
    </S.Container>
  );
};

export default CurrencyCard;
