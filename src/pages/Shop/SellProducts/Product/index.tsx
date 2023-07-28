import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';

import ActionLink from 'components/ActionLink';
import ProductActivationBadge from 'components/ProductActivationBadge';
import ShopProductListDetails from 'components/ShopProductListDetails';
import {deleteProduct, updateProduct} from 'dispatchers/products';
import {ActivationStatus, ToastType} from 'enums';
import {updateManager} from 'store/manager';
import {AppDispatch, Product as TProduct, SFC} from 'types';
import {displayErrorToast, displayToast} from 'utils/toast';
import * as S from './Styles';

export interface ProductProps {
  product: TProduct;
}

const Product: SFC<ProductProps> = ({product}) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

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
    navigate('/shop/sell/createEditProduct');
  };

  const renderActivationActionLink = () => {
    const actionText = product.activation_status === ActivationStatus.DRAFT ? 'Activate' : 'Deactivate';
    return <ActionLink onClick={handleActivationActionLinkClick}>{actionText}</ActionLink>;
  };

  return (
    <>
      <S.Thumbnail onClick={handleEditClick} thumbnailUrl={product.image} />
      <ShopProductListDetails
        coreId={product.price_core}
        description={product.description}
        name={product.name}
        onClick={handleEditClick}
        price={product.price_amount}
      />
      <S.ActivationStatus>
        <ProductActivationBadge activationStatus={product.activation_status} />
      </S.ActivationStatus>
      <S.Actions>
        <ActionLink onClick={handleEditClick}>Edit</ActionLink>
        <ActionLink onClick={handleDeleteClick}>Delete</ActionLink>
        {renderActivationActionLink()}
      </S.Actions>
    </>
  );
};

export default Product;
