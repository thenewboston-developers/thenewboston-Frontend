import {useMemo} from 'react';
import {useDispatch} from 'react-redux';
import {Form, Formik, FormikHelpers} from 'formik';

import Button, {ButtonType} from 'components/Button';
import {LogoInput} from 'components/FormElements';
import {createOrder} from 'dispatchers/orders';
import {OrderType, ToastType} from 'enums';
import {useActiveAssetPair} from 'hooks';
import {AppDispatch, SFC} from 'types';
import {displayErrorToast, displayToast} from 'utils/toast';
import yup from 'utils/yup';
import * as S from './Styles';

const Sell: SFC = ({className}) => {
  const activeAssetPair = useActiveAssetPair();
  const dispatch = useDispatch<AppDispatch>();

  const initialValues = {
    price: '',
    quantity: '',
  };

  type FormValues = typeof initialValues;

  const handleSubmit = async (values: FormValues, {resetForm}: FormikHelpers<FormValues>): Promise<void> => {
    try {
      const requestData = {
        order_type: OrderType.SELL,
        price: parseInt(values.price, 10),
        primary_currency: activeAssetPair!.primary_currency.id,
        quantity: parseInt(values.quantity, 10),
        secondary_currency: activeAssetPair!.secondary_currency.id,
      };
      await dispatch(createOrder(requestData));
      displayToast('Sell order created!', ToastType.success);
      resetForm();
    } catch (error) {
      console.error(error);
      displayErrorToast('Error creating order');
    }
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
        {({dirty, errors, isSubmitting, touched, isValid}) => (
          <Form>
            <LogoInput
              errors={errors}
              label="Quantity"
              logo={activeAssetPair!.primary_currency.logo}
              name="quantity"
              touched={touched}
            />
            <LogoInput
              errors={errors}
              label="Price"
              logo={activeAssetPair!.secondary_currency.logo}
              name="price"
              touched={touched}
            />
            <Button
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
