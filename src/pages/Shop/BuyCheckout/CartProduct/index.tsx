import {useDispatch} from 'react-redux';

import ActionLink from 'components/ActionLink';
import ShopProductListDetails from 'components/ShopProductListDetails';
import Thumbnail from 'components/Thumbnail';
import {deleteCartProduct} from 'dispatchers/cartProducts';
import {ToastType} from 'enums';
import {AppDispatch, CartProduct as TCartProduct, SFC} from 'types';
import {displayErrorToast, displayToast} from 'utils/toast';
import * as S from './Styles';

export interface CartProductProps {
  cartProduct: TCartProduct;
}

const CartProduct: SFC<CartProductProps> = ({cartProduct}) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleRemoveClick = async () => {
    try {
      await dispatch(deleteCartProduct(cartProduct.id));
      displayToast('Product removed from cart!', ToastType.SUCCESS);
    } catch (error) {
      console.error(error);
      displayErrorToast('Error removing product from cart');
    }
  };

  return (
    <>
      <Thumbnail thumbnailUrl={cartProduct.product.image} />
      <ShopProductListDetails
        coreId={cartProduct.product.price_core}
        description={cartProduct.product.description}
        name={cartProduct.product.name}
        price={cartProduct.product.price_amount}
      />
      <S.Actions>
        <ActionLink onClick={handleRemoveClick}>Remove</ActionLink>
      </S.Actions>
    </>
  );
};

export default CartProduct;
