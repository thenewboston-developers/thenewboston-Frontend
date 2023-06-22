import {useMemo} from 'react';
import {useDispatch} from 'react-redux';
import {Form, Formik, FormikHelpers} from 'formik';

import Button, {ButtonType} from 'components/Button';
import {LogoInput} from 'components/FormElements';
import {createOrder} from 'dispatchers/orders';
import {ToastType} from 'enums';
import {useActiveAssetPair} from 'hooks';
import {AppDispatch, SFC} from 'types';
import {displayErrorToast, displayToast} from 'utils/toast';
import yup from 'utils/yup';
import * as S from './Styles';

const Buy: SFC = ({className}) => {
  const activeAssetPair = useActiveAssetPair();
  const dispatch = useDispatch<AppDispatch>();

  const initialValues = {
    price: '',
    quantity: '',
  };

  type FormValues = typeof initialValues;

  const handleSubmit = async (values: FormValues, {resetForm}: FormikHelpers<FormValues>): Promise<void> => {
    try {
      // TODO: Use constants/enums for order types
      const requestData = {
        order_type: 'BUY',
        price: parseInt(values.price, 10),
        primary_currency: activeAssetPair!.primary_currency.id,
        quantity: parseInt(values.quantity, 10),
        secondary_currency: activeAssetPair!.secondary_currency.id,
      };
      await dispatch(createOrder(requestData));
      displayToast('Order created!', ToastType.success);
      resetForm();
    } catch (error) {
      console.error(error);
      displayErrorToast('Error creating order');
    }
  };

  const validationSchema = useMemo(() => {
    // TODO: Check that user has funds to cover order
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
