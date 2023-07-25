import {GenericVoidFunction, Product, SFC} from 'types';
import {truncate} from 'utils/strings';
import * as S from './Styles';

export interface ShopProductListDetailsProps {
  onClick?: GenericVoidFunction;
  product: Product;
}

const ShopProductListDetails: SFC<ShopProductListDetailsProps> = ({className, onClick, product}) => {
  return (
    <S.Container className={className}>
      <S.Name onClick={onClick}>{product.name}</S.Name>
      <S.Description>{truncate(product.description, 200)}</S.Description>
      <S.PriceMini product={product} />
    </S.Container>
  );
};

export default ShopProductListDetails;
