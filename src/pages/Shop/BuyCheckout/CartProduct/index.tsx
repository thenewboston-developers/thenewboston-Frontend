import {useDispatch} from 'react-redux';
import {mdiDeleteOutline, mdiDotsVertical} from '@mdi/js';

import Line from 'components/Line';
import ProductActivationBadge from 'components/ProductActivationBadge';
import DropdownMenu from 'components/DropdownMenu';
import ShopProductListDetails from 'components/ShopProductListDetails';
import {useCoreLogo} from 'hooks';
import {deleteCartProduct} from 'dispatchers/cartProducts';
import {ToastType} from 'enums';
import {AppDispatch, CartProduct as TCartProduct, SFC} from 'types';
import {displayErrorToast, displayToast} from 'utils/toasts';
import * as S from './Styles';

export interface CartProductProps {
  cartProduct: TCartProduct;
}

const CartProduct: SFC<CartProductProps> = ({cartProduct}) => {
  const coreLogo = useCoreLogo(cartProduct.product.price_core);
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

  const renderDropdownMenu = () => {
    const menuOptions = [{label: 'Delete', menuIcon: mdiDeleteOutline, onClick: handleRemoveClick}];

    return <DropdownMenu icon={mdiDotsVertical} options={menuOptions} />;
  };

  return (
    <>
      <S.Container>
        <S.Left>
          <S.Thumbnail thumbnailUrl={cartProduct.product.image} />
          <S.Box>
            <S.ProductDetails>
              <ShopProductListDetails
                coreId={cartProduct.product.price_core}
                description={cartProduct.product.description}
                name={cartProduct.product.name}
                price={cartProduct.product.price_amount}
                createDate={cartProduct.product.created_date}
              />
            </S.ProductDetails>
            <Line />
            <S.Price>
              <S.Div>
                <S.CoreLogo alt="core logo" src={coreLogo} />
                <S.Amount>{cartProduct.product.price_amount.toLocaleString()}</S.Amount>
              </S.Div>
              <S.Status>
                <ProductActivationBadge activationStatus={cartProduct.product.activation_status} />
              </S.Status>
            </S.Price>
          </S.Box>
        </S.Left>
        <S.Right>{renderDropdownMenu()}</S.Right>
      </S.Container>
    </>
  );
};

export default CartProduct;
