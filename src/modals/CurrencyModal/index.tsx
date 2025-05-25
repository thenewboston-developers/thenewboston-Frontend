import {useMemo} from 'react';
import {useDispatch} from 'react-redux';
import {Form, Formik} from 'formik';

import Button, {ButtonType} from 'components/Button';
import {createCurrency, updateCurrency} from 'dispatchers/currencies';
import {AppDispatch, Currency, SFC} from 'types';
import {displayErrorToast} from 'utils/toasts';
import yup from 'utils/yup';
import * as S from './Styles';

export interface CurrencyModalProps {
  close(): void;
  currency?: Currency;
}

const CurrencyModal: SFC<CurrencyModalProps> = ({className, close, currency}) => {
  const dispatch = useDispatch<AppDispatch>();

  const initialValues = {
    domain: currency?.domain || '',
    ticker: currency?.ticker || '',
  };

  type FormValues = typeof initialValues;

  const handleSubmit = async (values: FormValues): Promise<void> => {
    try {
      const requestData = new FormData();
      requestData.append('domain', values.domain);
      requestData.append('ticker', values.ticker);

      if (currency) {
        await dispatch(updateCurrency(currency.id, requestData));
      } else {
        await dispatch(createCurrency(requestData));
      }

      close();
    } catch (error) {
      displayErrorToast('Error');
    }
  };

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      domain: yup.string().required(),
      ticker: yup.string().required(),
    });
  }, []);

  return (
    <S.Modal className={className} close={close} header={currency ? 'Edit Currency' : 'Add Currency'}>
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
        {({dirty, errors, isSubmitting, touched, isValid}) => (
          <Form>
            <S.Input errors={errors} label="Domain" name="domain" touched={touched} />
            <S.Input errors={errors} label="Ticker" name="ticker" touched={touched} />
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
    </S.Modal>
  );
};

export default CurrencyModal;
