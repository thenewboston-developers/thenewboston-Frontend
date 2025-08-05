import {CurrencyTinySerializer, SFC} from 'types';

import * as S from './Styles';

export interface PriceMiniProps {
  currency: CurrencyTinySerializer;
  price: number;
}

const PriceMini: SFC<PriceMiniProps> = ({className, currency, price}) => {
  return (
    <S.Container className={className}>
      <S.CurrencyLogo alt="currency logo" src={currency.logo} />
      <S.Amount>{price.toLocaleString()}</S.Amount>
    </S.Container>
  );
};

export default PriceMini;
