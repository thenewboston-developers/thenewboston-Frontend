import {useDispatch} from 'react-redux';
import {mdiDeleteOutline, mdiDotsVertical, mdiSquareEditOutline} from '@mdi/js';

import DropdownMenu from 'components/DropdownMenu';
import ActionLink from 'components/ActionLink';
import {useCoreLogo} from 'hooks';
import ProductActivationBadge from 'components/ProductActivationBadge';
import ShopProductListDetails from 'components/ShopProductListDetails';
import {deleteProduct, updateProduct} from 'dispatchers/products';
import Line from 'components/Line';
import {ActivationStatus, ToastType} from 'enums';
import {updateManager} from 'store/manager';
import {AppDispatch, Product as TProduct, SFC} from 'types';
import {displayErrorToast, displayToast} from 'utils/toasts';

import * as S from './Styles';

export interface ProductProps {
  product: TProduct;
  setSellProductModalIsOpen(isOpen: boolean): void;
}

const Product: SFC<ProductProps> = ({product, setSellProductModalIsOpen}) => {
  const coreLogo = useCoreLogo(product.price_core);

  const dispatch = useDispatch<AppDispatch>();

  const handleActivationActionLinkClick = async () => {
    try {
      const requestData = new FormData();
      requestData.append(
        'activation_status',
        product.activation_status === ActivationStatus.ACTIVE ? ActivationStatus.DRAFT : ActivationStatus.ACTIVE,
      );
      await dispatch(updateProduct(product.id, requestData));
      displayToast('Activation status updated', ToastType.SUCCESS);
    } catch (error) {
      console.error(error);
      displayErrorToast('Error updating activation status');
    }
  };

  const handleDeleteClick = async () => {
    try {
      await dispatch(deleteProduct(product.id));
      displayToast('Product deleted', ToastType.SUCCESS);
    } catch (error) {
      console.error(error);
      displayErrorToast('Error deleting product');
    }
  };

  const handleEditClick = () => {
    dispatch(updateManager({activeProduct: product}));
    setSellProductModalIsOpen(true);
  };

  const renderActivationActionLink = () => {
    const actionText = product.activation_status === ActivationStatus.DRAFT ? 'Activate' : 'Deactivate';
    return <ActionLink onClick={handleActivationActionLinkClick}>{actionText}</ActionLink>;
  };

  const renderDropdownMenu = () => {
    const menuOptions = [
      {label: 'Edit', menuIcon: mdiSquareEditOutline, onClick: handleEditClick},
      {label: 'Delete', menuIcon: mdiDeleteOutline, onClick: handleDeleteClick},
    ];

    return <DropdownMenu icon={mdiDotsVertical} options={menuOptions} />;
  };

  return (
    <S.Container>
      <S.Left>
        <S.Thumbnail onClick={handleEditClick} thumbnailUrl={product.image} />
        <S.ProductDetails>
          <S.Box>
            <ShopProductListDetails
              coreId={product.price_core}
              description={product.description}
              name={product.name}
              createDate={product.created_date}
              onClick={handleEditClick}
              price={product.price_amount}
            />
            <S.Link>{renderActivationActionLink()}</S.Link>
          </S.Box>
          <Line />
          <S.Price>
            <S.Div>
              <S.CoreLogo alt="core logo" src={coreLogo} />
              <S.Amount>{product.price_amount.toLocaleString()}</S.Amount>
            </S.Div>
            <S.ActivationStatus>
              <ProductActivationBadge activationStatus={product.activation_status} />
            </S.ActivationStatus>
          </S.Price>
        </S.ProductDetails>
      </S.Left>
      <S.Right> {renderDropdownMenu()}</S.Right>
    </S.Container>
  );
};

export default Product;
