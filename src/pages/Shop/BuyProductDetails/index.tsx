import {useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';

import Button from 'components/Button';
import Price from 'components/Price';
import {createCartProduct, deleteCartProduct} from 'dispatchers/cartProducts';
import {ToastType} from 'enums';
import {getCartProducts, getProducts} from 'selectors/state';
import {AppDispatch, CartProduct, Product, SFC} from 'types';
import {displayErrorToast, displayToast} from 'utils/toast';
import * as S from './Styles';

const BuyProductDetails: SFC = ({className}) => {
  const {id} = useParams();
  const cartProducts = useSelector(getCartProducts);
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector(getProducts);

  const cartProduct = useMemo((): CartProduct | undefined => {
    if (!id) return undefined;
    return Object.values(cartProducts).find(({product}) => product.id === parseInt(id, 10));
  }, [cartProducts, id]);

  const product = useMemo((): Product | undefined => {
    if (!id) return undefined;
    return products[id];
  }, [id, products]);

  const handleAddToCartClick = async () => {
    if (!id) return;

    // TODO: display a warning modal when the user attempts to add products from multiple sellers to their cart

    try {
      const requestData = {
        product: parseInt(id, 10),
        quantity: 1,
      };
      await dispatch(createCartProduct(requestData));
      displayToast('Product added to cart!', ToastType.SUCCESS);
    } catch (error) {
      console.error(error);
      displayErrorToast('Error adding product to cart');
    }
  };

  const handleRemoveFromCartClick = async () => {
    if (!cartProduct) return;

    try {
      await dispatch(deleteCartProduct(cartProduct.id));
      displayToast('Product removed from cart!', ToastType.SUCCESS);
    } catch (error) {
      console.error(error);
      displayErrorToast('Error removing product from cart');
    }
  };

  const renderCartButton = () => {
    if (!!cartProduct) return <Button onClick={handleRemoveFromCartClick} text="Remove from Cart" />;
    return <Button onClick={handleAddToCartClick} text="Add to Cart" />;
  };

  const renderLeft = () => {
    if (!product) return null;

    return (
      <S.Left>
        <S.Img alt="Product image" src={product.image} />
      </S.Left>
    );
  };

  const renderRight = () => {
    if (!product) return null;

    return (
      <S.Right>
        <S.Name>{product.name}</S.Name>
        <S.Description>{product.description}</S.Description>
        <S.UserLabel description="Seller" name={product.seller.username} />
        <S.PriceContainer>
          <Price product={product} />
          {renderCartButton()}
        </S.PriceContainer>
      </S.Right>
    );
  };

  return (
    <S.Container className={className}>
      {renderLeft()}
      {renderRight()}
    </S.Container>
  );
};

export default BuyProductDetails;
