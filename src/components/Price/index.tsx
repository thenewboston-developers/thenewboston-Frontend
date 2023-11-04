import {useCoreLogo} from 'hooks';
import {SFC} from 'types';
import * as S from './Styles';

export interface PriceProps {
  price_amount: number;
  price_core: number;
}

const Price: SFC<PriceProps> = ({className, price_amount, price_core}) => {
  const coreLogo = useCoreLogo(price_core);

  return (
    <S.Container className={className}>
      <S.CoreLogo alt="core logo" src={coreLogo} />
      <S.Amount>{price_amount.toLocaleString()}</S.Amount>
    </S.Container>
  );
};

export default Price;
