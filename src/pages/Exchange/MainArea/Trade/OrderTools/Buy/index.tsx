import {useEffect, useMemo, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Form, Formik, FormikHelpers} from 'formik';

import AvailableTotal from 'components/AvailableTotal';
import {ButtonType} from 'components/Button';
import {CalloutType} from 'components/Callout';
import {FormField, LogoInput} from 'components/FormElements';
import {createExchangeOrder} from 'dispatchers/exchangeOrders';
import {ExchangeOrderSide, ToastType} from 'enums';
import {getWallets} from 'selectors/state';
import {AppDispatch, AssetPair, SFC} from 'types';
import {displayErrorToast, displayToast} from 'utils/toasts';
import yup from 'utils/yup';

import * as S from './Styles';

interface BuyProps {
  activeAssetPair: AssetPair | null;
}

const Buy: SFC<BuyProps> = ({activeAssetPair, className}) => {
  const [total, setTotal] = useState<number>(0);
  const dispatch = useDispatch<AppDispatch>();
  const formikRef = useRef<any>(null);
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
        asset_pair: activeAssetPair!.id,
        price: parseInt(values.price, 10),
        quantity: parseInt(values.quantity, 10),
        side: ExchangeOrderSide.BUY,
      };
      await dispatch(createExchangeOrder(requestData));
      displayToast('Buy order created!', ToastType.SUCCESS);
      resetForm();
      setTotal(0);
    } catch (error) {
      displayErrorToast('Error creating order');
    }
  };

  const secondaryCurrencyBalance = useMemo(() => {
    const wallet = Object.values(wallets).find(
      (_wallet) => _wallet.currency.id === activeAssetPair!.secondary_currency.id,
    );
    return wallet?.balance || 0;
  }, [activeAssetPair, wallets]);

  const isTotalValid = useMemo(() => total <= secondaryCurrencyBalance, [secondaryCurrencyBalance, total]);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      price: yup.number().integer('Bid price must be an integer').moreThan(0).required('Bid price is required'),
      quantity: yup.number().integer('Quantity must be an integer').moreThan(0).required('Quantity is required'),
    });
  }, []);

  useEffect(() => {
    if (formikRef.current) {
      formikRef.current.resetForm();
      setTotal(0);
    }
  }, [activeAssetPair]);

  return (
    <S.Container className={className}>
      <Formik
        initialValues={initialValues}
        innerRef={formikRef}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({dirty, errors, handleChange, isSubmitting, isValid, touched, values}) => (
          <Form>
            {(errors as any)['is-more-than-100'] && <div>{(errors as any)['is-more-than-100']}</div>}
            <FormField>
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
            </FormField>
            <FormField>
              <LogoInput
                errors={errors}
                label="Bid Price"
                logo={activeAssetPair!.secondary_currency.logo}
                name="price"
                onChange={(e) => {
                  handleChange(e);
                  calculateTotal(values.quantity, e.target.value);
                }}
                touched={touched}
              />
            </FormField>
            <AvailableTotal
              available={secondaryCurrencyBalance}
              availableTicker={activeAssetPair!.secondary_currency.ticker}
              isTotalValid={isTotalValid}
              total={total}
              totalTicker={activeAssetPair!.secondary_currency.ticker}
            />
            {!isTotalValid && total > 0 && (
              <S.InsufficientFundsCallout type={CalloutType.ERROR}>
                Insufficient {activeAssetPair!.secondary_currency.ticker} balance to complete this order
              </S.InsufficientFundsCallout>
            )}
            <S.Button
              dirty={dirty}
              disabled={isSubmitting || !isTotalValid}
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
