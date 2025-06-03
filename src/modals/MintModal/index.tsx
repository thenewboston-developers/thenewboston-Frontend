import {useMemo, useState} from 'react';
import {useDispatch} from 'react-redux';
import {Form, Formik} from 'formik';
import * as yup from 'yup';

import Button from 'components/Button';
import {ButtonColor, ButtonType} from 'components/Button/types';
import {Input} from 'components/FormElements';
import {ModalContent, ModalFooter, ModalFooterButton} from 'components/Modal';
import {createMint} from 'dispatchers/mints';
import {ToastType} from 'enums';
import {AppDispatch, CurrencyReadDetailSerializer, SFC} from 'types';
import {displayErrorToast, displayToast} from 'utils/toasts';

import * as S from './Styles';

interface ComponentProps {
  close(): void;
  currency: CurrencyReadDetailSerializer;
  onSuccess?: () => void;
}

const MintModal: SFC<ComponentProps> = ({className, close, currency, onSuccess}) => {
  const dispatch = useDispatch<AppDispatch>();

  const [submitting, setSubmitting] = useState(false);

  const initialValues = useMemo(
    () => ({
      amount: '',
    }),
    [],
  );

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      amount: yup
        .number()
        .typeError('Amount must be a number')
        .required('Amount is required')
        .positive('Amount must be positive')
        .integer('Amount must be a whole number'),
    });
  }, []);

  const handleSubmit = async (values: typeof initialValues) => {
    setSubmitting(true);
    try {
      await dispatch(createMint({currency: currency.id, amount: parseInt(values.amount)}));
      displayToast(
        `Successfully minted ${parseInt(values.amount).toLocaleString()} ${currency.ticker}`,
        ToastType.SUCCESS,
      );
      if (onSuccess) onSuccess();
      close();
    } catch (error: any) {
      displayErrorToast(error.response?.data?.error || 'Error minting currency');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <S.Modal className={className} close={close} header={`Mint ${currency.ticker}`}>
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
        {({dirty, errors, isValid, touched}) => (
          <Form>
            <ModalContent>
              <Input errors={errors} label="Amount" name="amount" touched={touched} type="number" />
            </ModalContent>

            <ModalFooter>
              <ModalFooterButton color={ButtonColor.secondary} onClick={close} text="Cancel" type={ButtonType.button} />
              <Button
                dirty={dirty}
                disabled={submitting}
                isSubmitting={submitting}
                isValid={isValid}
                text="Mint"
                type={ButtonType.submit}
              />
            </ModalFooter>
          </Form>
        )}
      </Formik>
    </S.Modal>
  );
};

export default MintModal;
