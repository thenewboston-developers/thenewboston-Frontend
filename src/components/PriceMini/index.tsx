import {useCurrencyLogo} from 'hooks';
import {SFC} from 'types';
import * as S from './Styles';

export interface PriceMiniProps {
  currencyId: number;
  price: number;
}

const PriceMini: SFC<PriceMiniProps> = ({className, currencyId, price}) => {
  const currencyLogo = useCurrencyLogo(currencyId);

  return (
    <S.Container className={className}>
      <S.CurrencyLogo alt="currency logo" src={currencyLogo} />
      <S.Amount>{price.toLocaleString()}</S.Amount>
    </S.Container>
  );
};

export default PriceMini;
