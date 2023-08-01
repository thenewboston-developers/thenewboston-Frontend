import {useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';

import Button from 'components/Button';
import Price from 'components/Price';
import {createCartProduct, deleteCartProduct} from 'dispatchers/cartProducts';
import {getProduct} from 'dispatchers/products';
import {ToastType} from 'enums';
import {useCartSeller, useToggle} from 'hooks';
import CartWarningModal from 'modals/CartWarningModal';
import {getCartProducts, getProducts} from 'selectors/state';
import {AppDispatch, CartProduct, Product, SFC} from 'types';
import {displayErrorToast, displayToast} from 'utils/toast';
import * as S from './Styles';

const BuyProductDetails: SFC = ({className}) => {
  const [cartWarningModalIsOpen, toggleCartWarningModal] = useToggle(false);
  const {id} = useParams();
  const cartProducts = useSelector(getCartProducts);
  const cartSeller = useCartSeller();
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector(getProducts);

  useEffect(() => {
    if (!id) return;

    (async () => {
      try {
        await dispatch(getProduct(parseInt(id, 10)));
      } catch (error) {
        console.error(error);
        displayErrorToast('Error fetching product details');
      }
    })();
  }, [dispatch, id]);

  const cartProduct = useMemo((): CartProduct | undefined => {
    if (!id) return undefined;
    return Object.values(cartProducts).find(({product}) => product.id === parseInt(id, 10));
  }, [cartProducts, id]);

  const product = useMemo((): Product | undefined => {
    if (!id) return undefined;
    return products[id];
  }, [id, products]);

  const handleAddToCartClick = async () => {
    if (!product) return;

    if (!!cartSeller && cartSeller.id !== product.seller.id) {
      toggleCartWarningModal();
      return;
    }

    try {
      const requestData = {
        product: product.id,
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
        <S.UserLabel avatar={product.seller.avatar} description="Seller" username={product.seller.username} />
        <S.PriceContainer>
          <Price product={product} />
          {renderCartButton()}
        </S.PriceContainer>
      </S.Right>
    );
  };

  if (!product) return null;

  return (
    <>
      <S.Container className={className}>
        {renderLeft()}
        {renderRight()}
      </S.Container>
      {cartWarningModalIsOpen ? <CartWarningModal close={toggleCartWarningModal} productId={product.id} /> : null}
    </>
  );
};

export default BuyProductDetails;
