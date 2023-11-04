import {Link} from 'react-router-dom';

import Price from 'components/Price';
import {Product, SFC} from 'types';
import * as S from './Styles';

export interface ProductCardProps {
  product: Product;
}

const ProductCard: SFC<ProductCardProps> = ({className, product}) => {
  return (
    <S.Container className={className}>
      <Link to={`/shop/buy/products/${product.id}`}>
        <S.Thumbnail thumbnailUrl={product.image} />
      </Link>
      <S.Bottom>
        <Link to={`/shop/buy/products/${product.id}`}>
          <S.Name>{product.name}</S.Name>
        </Link>
        <S.Description>{product.description}</S.Description>
        <S.UserLabel
          avatar={product.seller.avatar}
          description="Seller"
          id={product.seller.id}
          username={product.seller.username}
        />
        <S.Line />
        <Price price_amount={product.price_amount} price_core={product.price_core} />
      </S.Bottom>
    </S.Container>
  );
};

export default ProductCard;
