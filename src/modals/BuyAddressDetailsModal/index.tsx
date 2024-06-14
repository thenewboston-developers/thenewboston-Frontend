import {useMemo} from 'react';
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {Formik} from 'formik';

import Button, {ButtonType} from 'components/Button';
import {DEFAULT_SELECT_OPTION} from 'constants/forms';
import {createAddress, updateAddress} from 'dispatchers/addresses';
import {ToastType} from 'enums';
import {getManager} from 'selectors/state';
import {AppDispatch, SFC} from 'types';
import yup from 'utils/yup';
import {displayErrorToast, displayToast} from 'utils/toasts';
import * as S from './Styles';

export interface BuyAddressDetailsModalProps {
  close(): void;
  isCheckout?: boolean;
}
const BuyAddressDetailsModal: SFC<BuyAddressDetailsModalProps> = ({className, close, isCheckout}) => {
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

      if (isCheckout) {
        navigate('/shop/buy/checkout');
      } else {
        navigate('/shop/buy/addresses');
      }

      close();
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
    <>
      <S.Modal className={className} close={close} header={activeAddress ? 'Update Address' : 'Add Address'}>
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
          {({dirty, errors, isSubmitting, isValid, touched}) => (
            <S.Form>
              <S.Input errors={errors} label="Address 1" name="address_1" touched={touched} />
              <S.Input errors={errors} label="Address 2" name="address_2" touched={touched} />
              <S.Input errors={errors} label="City" name="city" touched={touched} />
              <S.Input errors={errors} label="State" name="state" touched={touched} />
              <S.Input errors={errors} label="ZIP Code" name="zip_code" touched={touched} />
              <S.Label>Country</S.Label>
              <S.Select
                errors={errors}
                label=""
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
            </S.Form>
          )}
        </Formik>
      </S.Modal>
    </>
  );
};

export default BuyAddressDetailsModal;
