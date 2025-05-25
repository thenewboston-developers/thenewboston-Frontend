import {useCurrencyLogo} from 'hooks';
import {SFC} from 'types';
import * as S from './Styles';

export interface PriceProps {
  price_amount: number;
  price_currency: number;
}

const Price: SFC<PriceProps> = ({className, price_amount, price_currency}) => {
  const currencyLogo = useCurrencyLogo(price_currency);

  return (
    <S.Container className={className}>
      <S.CurrencyLogo alt="currency logo" src={currencyLogo} />
      <S.Amount>{price_amount.toLocaleString()}</S.Amount>
    </S.Container>
  );
};

export default Price;
