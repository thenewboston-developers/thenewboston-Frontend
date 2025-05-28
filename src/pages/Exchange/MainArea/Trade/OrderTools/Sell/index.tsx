import {useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Form, Formik, FormikHelpers} from 'formik';

import AvailableTotal from 'components/AvailableTotal';
import {ButtonType} from 'components/Button';
import {LogoInput} from 'components/FormElements';
import {createExchangeOrder} from 'dispatchers/exchangeOrders';
import {ExchangeOrderType, ToastType} from 'enums';
import {useActiveAssetPair} from 'hooks';
import {getWallets} from 'selectors/state';
import {AppDispatch, SFC} from 'types';
import {displayErrorToast, displayToast} from 'utils/toasts';
import yup from 'utils/yup';

import * as S from './Styles';

const Sell: SFC = ({className}) => {
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
    const quantity = parseFloat(quantityStr || '0');
    const price = parseFloat(priceStr || '0');
    setTotal(quantity * price);
  };

  const handleSubmit = async (values: FormValues, {resetForm}: FormikHelpers<FormValues>): Promise<void> => {
    try {
      const requestData = {
        order_type: ExchangeOrderType.SELL,
        price: parseInt(values.price, 10),
        primary_currency: activeAssetPair!.primary_currency.id,
        quantity: parseInt(values.quantity, 10),
        secondary_currency: activeAssetPair!.secondary_currency.id,
      };
      await dispatch(createExchangeOrder(requestData));
      displayToast('Sell order created!', ToastType.SUCCESS);
      resetForm();
    } catch (error) {
      displayErrorToast('Error creating order');
    }
  };

  const primaryCurrencyBalance = useMemo(() => {
    const wallet = Object.values(wallets).find(
      (_wallet) => _wallet.currency.id === activeAssetPair!.primary_currency.id,
    );
    return wallet?.balance || 0;
  }, [activeAssetPair, wallets]);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      price: yup.number().integer('Price must be an integer').moreThan(0).required(),
      quantity: yup
        .number()
        .integer('Quantity must be an integer')
        .max(
          primaryCurrencyBalance,
          `Quantity cannot exceed your available balance of ${primaryCurrencyBalance.toLocaleString()}`,
        )
        .moreThan(0)
        .required(),
    });
  }, [primaryCurrencyBalance]);

  return (
    <S.Container className={className}>
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
        {({dirty, errors, handleChange, isSubmitting, isValid, touched, values}) => (
          <Form>
            <LogoInput
              errors={errors}
              label="Quantity"
              logo={activeAssetPair!.primary_currency.logo}
              name="quantity"
              onChange={(e) => {
                handleChange(e);
                calculateTotal(e.target.value, values.price);
              }}
              touched={touched}
            />
            <LogoInput
              errors={errors}
              label="Price"
              logo={activeAssetPair!.secondary_currency.logo}
              name="price"
              onChange={(e) => {
                handleChange(e);
                calculateTotal(values.quantity, e.target.value);
              }}
              touched={touched}
            />
            <AvailableTotal
              available={primaryCurrencyBalance}
              availableTicker={activeAssetPair!.primary_currency.ticker}
              isTotalValid={true}
              total={total}
              totalTicker={activeAssetPair!.secondary_currency.ticker}
            />
            <S.Button
              dirty={dirty}
              disabled={isSubmitting}
              isSubmitting={isSubmitting}
              isValid={isValid}
              text={`Sell ${activeAssetPair!.primary_currency.ticker}`}
              type={ButtonType.submit}
            />
          </Form>
        )}
      </Formik>
    </S.Container>
  );
};

export default Sell;
