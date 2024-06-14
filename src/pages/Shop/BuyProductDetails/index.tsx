import {useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {mdiCalendarOutline, mdiChevronLeft} from '@mdi/js';
import Icon from '@mdi/react';

import Button from 'components/Button';
import Line from 'components/Line';
import {createCartProduct, deleteCartProduct} from 'dispatchers/cartProducts';
import {getProduct} from 'dispatchers/products';
import {ToastType} from 'enums';
import {colors} from 'styles';
import {useCartSeller, useToggle} from 'hooks';
import CartWarningModal from 'modals/CartWarningModal';
import {getCartProducts, getProducts} from 'selectors/state';
import {AppDispatch, CartProduct, Product, SFC} from 'types';
import {displayErrorToast, displayToast} from 'utils/toasts';
import {longDate} from 'utils/dates';

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

  const renderRight = () => {
    if (!product) return null;

    return (
      <S.Right>
        <S.Img alt="Product image" src={product.image} />
      </S.Right>
    );
  };

  const renderHeader = () => {
    if (!product) return null;
    return (
      <S.Header>
        <S.Left>
          <S.Button onClick={() => history.go(-1)}>
            <Icon path={mdiChevronLeft} size={1} color={colors.palette.blue[700]} />
          </S.Button>
          <span>Go Back</span>
        </S.Left>
        {renderCartButton()}
      </S.Header>
    );
  };

  const renderCalendarIcon = () => {
    return (
      <S.Icon>
        <Icon path={mdiCalendarOutline} size={1} color={colors.gray} />
      </S.Icon>
    );
  };
  const renderLeft = () => {
    if (!product) return null;

    return (
      <S.ProductDetail>
        <S.Wrapper>
          <S.Name>{product.name}</S.Name>
          <S.Price price_amount={product.price_amount} price_core={product.price_core} />
          <S.Description>
            {renderCalendarIcon()}
            <S.Text>
              <S.Title>DESCRIPTION</S.Title>
              <span>{product.description}</span>
            </S.Text>
          </S.Description>
        </S.Wrapper>
        <Line />
        <S.UserLabel
          avatar={product.seller.avatar}
          description="SELLER"
          id={product.seller.id}
          username={product.seller.username}
        />
        <Line />
        <S.Date>
          {renderCalendarIcon()}
          <S.Text>
            <S.Title>CREATED</S.Title>
            <span>{longDate(product.created_date)}</span>
          </S.Text>
        </S.Date>
      </S.ProductDetail>
    );
  };

  if (!product) return null;

  return (
    <>
      <S.Container className={className}>
        {renderHeader()}
        <S.Div>
          {renderLeft()}
          {renderRight()}
        </S.Div>
      </S.Container>
      {cartWarningModalIsOpen ? <CartWarningModal close={toggleCartWarningModal} productId={product.id} /> : null}
    </>
  );
};

export default BuyProductDetails;
