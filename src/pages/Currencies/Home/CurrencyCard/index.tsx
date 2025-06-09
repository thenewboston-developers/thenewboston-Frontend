import {useNavigate} from 'react-router-dom';

import CurrencyLogo from 'components/CurrencyLogo';
import Line from 'components/Line';
import {Currency, SFC} from 'types';

import * as S from './Styles';

export interface CurrencyCardProps {
  currency: Currency;
}

const CurrencyCard: SFC<CurrencyCardProps> = ({className, currency}) => {
  const navigate = useNavigate();

  const handleTickerClick = () => {
    navigate(`/currencies/${currency.id}`);
  };

  return (
    <S.Container className={className}>
      <S.LabelContainer>
        <S.Box>
          <S.BoxLeft>
            <CurrencyLogo logo={currency.logo} />
            <S.Text>
              <S.Ticker onClick={handleTickerClick}>{currency.ticker}</S.Ticker>
            </S.Text>
          </S.BoxLeft>
        </S.Box>
        <Line />
        <S.DomainRow>
          {currency.domain ? <S.Domain>{currency.domain}</S.Domain> : <S.InternalBadge>Internal</S.InternalBadge>}
        </S.DomainRow>
      </S.LabelContainer>
    </S.Container>
  );
};

export default CurrencyCard;
