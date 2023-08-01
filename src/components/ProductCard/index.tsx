import {useNavigate} from 'react-router-dom';

import Price from 'components/Price';
import {Product, SFC} from 'types';
import * as S from './Styles';

export interface ProductCardProps {
  product: Product;
}

const ProductCard: SFC<ProductCardProps> = ({className, product}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/shop/buy/products/${product.id}`);
  };

  return (
    <S.Container className={className} onClick={handleClick}>
      <S.Thumbnail thumbnailUrl={product.image} />
      <S.Bottom>
        <S.Name>{product.name}</S.Name>
        <S.Description>{product.description}</S.Description>
        <S.UserLabel avatar={product.seller.avatar} description="Seller" username={product.seller.username} />
        <S.Line />
        <Price product={product} />
      </S.Bottom>
    </S.Container>
  );
};

export default ProductCard;
