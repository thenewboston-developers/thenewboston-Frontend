import {useCoreLogo} from 'hooks';
import {Product, SFC} from 'types';
import * as S from './Styles';

export interface PriceMiniProps {
  product: Product;
}

const PriceMini: SFC<PriceMiniProps> = ({className, product}) => {
  const coreLogo = useCoreLogo(product.price_core);

  return (
    <S.Container className={className}>
      <S.CoreLogo alt="core logo" src={coreLogo} />
      <S.Amount>{product.price_amount.toLocaleString()}</S.Amount>
    </S.Container>
  );
};

export default PriceMini;