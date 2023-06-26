import {useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Form, Formik, FormikHelpers} from 'formik';

import Button, {ButtonType} from 'components/Button';
import {LogoInput} from 'components/FormElements';
import {createOrder} from 'dispatchers/orders';
import {OrderType, ToastType} from 'enums';
import {useActiveAssetPair} from 'hooks';
import {getWallets} from 'selectors/state';
import {AppDispatch, SFC} from 'types';
import {displayErrorToast, displayToast} from 'utils/toast';
import yup from 'utils/yup';
import * as S from './Styles';

const Buy: SFC = ({className}) => {
  const [total, setTotal] = useState<number>(0);
  const activeAssetPair = useActiveAssetPair();
  const dispatch = useDispatch<AppDispatch>();
  const wallets = useSelector(getWallets);

  const initialValues = {
    price: '',
    quantity: '',
  };

  type FormValues = typeof initialValues;

  const calculateTotal = (quantityStr: string, priceStr: string) => {
    const quantity = parseInt(quantityStr || '0', 10);
    const price = parseInt(priceStr || '0', 10);
    setTotal(quantity * price);
  };

  const handleSubmit = async (values: FormValues, {resetForm}: FormikHelpers<FormValues>): Promise<void> => {
    try {
      const requestData = {
        order_type: OrderType.BUY,
        price: parseInt(values.price, 10),
        primary_currency: activeAssetPair!.primary_currency.id,
        quantity: parseInt(values.quantity, 10),
        secondary_currency: activeAssetPair!.secondary_currency.id,
      };
      await dispatch(createOrder(requestData));
      displayToast('Buy order created!', ToastType.success);
      resetForm();
      setTotal(0);
    } catch (error) {
      console.error(error);
      displayErrorToast('Error creating order');
    }
  };

  const paymentWalletBalance = useMemo(() => {
    const paymentWallet = Object.values(wallets).find(
      (wallet) => wallet.core.id === activeAssetPair!.secondary_currency.id,
    );
    return paymentWallet?.balance || 0;
  }, [activeAssetPair, wallets]);

  const renderAvailableTotal = () => {
    const ticker = activeAssetPair!.secondary_currency.ticker;

    return (
      <S.AvailableTotal>
        <S.AvailableRow>
          <span>Available</span>
          <span>
            {paymentWalletBalance.toLocaleString()} {ticker}
          </span>
        </S.AvailableRow>
        <S.TotalRow>
          <span>Total</span>
          <span>
            {total.toLocaleString()} {ticker}
          </span>
        </S.TotalRow>
      </S.AvailableTotal>
    );
  };

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      price: yup.number().moreThan(0).required(),
      quantity: yup.number().moreThan(0).required(),
    });
  }, []);

  return (
    <S.Container className={className}>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validateOnMount={false}
        validationSchema={validationSchema}
      >
        {({dirty, errors, handleChange, isSubmitting, isValid, touched, values}) => (
          <Form>
            <LogoInput
              errors={errors}
              label="Quantity"
              logo={activeAssetPair!.primary_currency.logo}
              onChange={(e) => {
                handleChange(e);
                calculateTotal(e.target.value, values.price);
              }}
              name="quantity"
              touched={touched}
            />
            <LogoInput
              errors={errors}
              label="Price"
              logo={activeAssetPair!.secondary_currency.logo}
              onChange={(e) => {
                handleChange(e);
                calculateTotal(values.quantity, e.target.value);
              }}
              name="price"
              touched={touched}
            />
            {renderAvailableTotal()}
            <Button
              dirty={dirty}
              disabled={isSubmitting}
              isSubmitting={isSubmitting}
              isValid={isValid}
              text={`Buy ${activeAssetPair!.primary_currency.ticker}`}
              type={ButtonType.submit}
            />
          </Form>
        )}
      </Formik>
    </S.Container>
  );
};

export default Buy;
