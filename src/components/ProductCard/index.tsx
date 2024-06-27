import {Link} from 'react-router-dom';

import Line from 'components/Line';
import {Product, SFC} from 'types';
import * as S from './Styles';

export interface ProductCardProps {
  product: Product;
}

const ProductCard: SFC<ProductCardProps> = ({className, product}) => {
  return (
    <S.Container className={className}>
      <S.Div>
        <Link to={`/shop/buy/products/${product.id}`}>
          <S.Thumbnail thumbnailUrl={product.image} />
        </Link>

        <Link to={`/shop/buy/products/${product.id}`}>
          <S.Name>{product.name}</S.Name>
        </Link>
        <S.Description>{product.description}</S.Description>
      </S.Div>
      <S.Div>
        <Line />
        <S.UserLabel
          avatar={product.seller.avatar}
          description="SELLER"
          id={product.seller.id}
          username={product.seller.username}
        />
        <Line />
        <S.Price price_amount={product.price_amount} price_core={product.price_core} />
      </S.Div>
    </S.Container>
  );
};

export default ProductCard;
