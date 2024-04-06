import React, {useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {Form, Formik} from 'formik';

import Button, {ButtonType} from 'components/Button';
import {Input, Select} from 'components/FormElements';
import {DEFAULT_SELECT_OPTION} from 'constants/forms';
import {createAddress, updateAddress} from 'dispatchers/addresses';
import {ToastType} from 'enums';
import {getManager} from 'selectors/state';
import {AppDispatch, SFC} from 'types';
import {displayErrorToast, displayToast} from 'utils/toasts';
import yup from 'utils/yup';
import * as S from './Styles';

const BuyAddressDetails: SFC = ({className}) => {
  const {activeAddress} = useSelector(getManager);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const initialValues = useMemo(
    () => ({
      address_1: activeAddress?.address_1 || '',
      address_2: activeAddress?.address_2 || '',
      city: activeAddress?.city || '',
      country: activeAddress?.country || '',
      state: activeAddress?.state || '',
      zip_code: activeAddress?.zip_code || '',
    }),
    [
      activeAddress?.address_1,
      activeAddress?.address_2,
      activeAddress?.city,
      activeAddress?.country,
      activeAddress?.state,
      activeAddress?.zip_code,
    ],
  );

  type FormValues = typeof initialValues;

  const handleSubmit = async (values: FormValues): Promise<void> => {
    try {
      if (activeAddress) {
        await dispatch(updateAddress(activeAddress.id, values));
        displayToast('Address updated!', ToastType.SUCCESS);
      } else {
        await dispatch(createAddress(values));
        displayToast('Address created!', ToastType.SUCCESS);
      }

      navigate('/shop/buy/addresses');
    } catch (error) {
      console.error(error);
      const verb = activeAddress ? 'updating' : 'creating';
      displayErrorToast(`Error ${verb} address`);
    }
  };

  const validationSchema = useMemo(() => {
    return yup.object({
      address_1: yup.string().required(),
      address_2: yup.string(),
      city: yup.string().required(),
      country: yup
        .string()
        .required()
        .test('valid-country', 'Country is a required field', (value) => value !== DEFAULT_SELECT_OPTION),
      state: yup.string().required(),
      zip_code: yup.string().required(),
    });
  }, []);

  return (
    <S.Container className={className}>
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
        {({dirty, errors, isSubmitting, isValid, touched}) => (
          <Form>
            <Input errors={errors} label="Address 1" name="address_1" touched={touched} />
            <Input errors={errors} label="Address 2" name="address_2" touched={touched} />
            <Input errors={errors} label="City" name="city" touched={touched} />
            <Input errors={errors} label="State" name="state" touched={touched} />
            <Input errors={errors} label="ZIP Code" name="zip_code" touched={touched} />
            <Select
              errors={errors}
              label="Country"
              name="country"
              options={[{value: DEFAULT_SELECT_OPTION}, {value: 'India'}, {value: 'Nigeria'}, {value: 'USA'}]}
              touched={touched}
            />
            <Button
              dirty={dirty}
              disabled={isSubmitting}
              isSubmitting={isSubmitting}
              isValid={isValid}
              text="Submit"
              type={ButtonType.submit}
            />
          </Form>
        )}
      </Formik>
    </S.Container>
  );
};

export default BuyAddressDetails;
