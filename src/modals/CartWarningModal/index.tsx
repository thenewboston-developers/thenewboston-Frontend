import {useDispatch} from 'react-redux';

import {createCartProduct, emptyCart} from 'dispatchers/cartProducts';
import {ToastType} from 'enums';
import {AppDispatch, SFC} from 'types';
import {displayErrorToast, displayToast} from 'utils/toast';
import * as S from './Styles';

export interface CartWarningModalProps {
  close(): void;
  productId: number;
}

const CartWarningModal: SFC<CartWarningModalProps> = ({className, close, productId}) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleButtonClick = async () => {
    try {
      await dispatch(emptyCart());
      const requestData = {
        product: productId,
        quantity: 1,
      };
      await dispatch(createCartProduct(requestData));
      displayToast('Product added to cart!', ToastType.SUCCESS);
      close();
    } catch (error) {
      console.error(error);
      displayErrorToast('Error updating cart');
    }
  };

  return (
    <S.Modal className={className} close={close} header="Warning">
      <div>
        This product has a different seller than the existing item(s) in your cart. Would you like to create a new
        order?
      </div>
      <S.ButtonContainer>
        <S.Button onClick={handleButtonClick} text="Yes" />
      </S.ButtonContainer>
    </S.Modal>
  );
};

export default CartWarningModal;
