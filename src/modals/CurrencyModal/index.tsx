import {ChangeEvent, useEffect, useMemo, useState} from 'react';
import {useDispatch} from 'react-redux';
import {Field, Form, Formik} from 'formik';

import Button, {ButtonType} from 'components/Button';
import {FileInput} from 'components/FormElements';
import ImagePreview from 'components/ImagePreview';
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
  const [isLogoCleared, setIsLogoCleared] = useState<boolean | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();

  const initialValues = useMemo(
    () => ({
      domain: currency?.domain || '',
      logo: currency?.logo || '',
      ticker: currency?.ticker || '',
    }),
    [currency?.domain, currency?.logo, currency?.ticker],
  );

  type FormValues = typeof initialValues;

  useEffect(() => {
    if (!initialValues.logo) return;
    setPreview(initialValues.logo);
  }, [initialValues]);

  const handleFileChange = (
    event: ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: any) => void,
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.onload = () => {
          if (img.width !== 512 || img.height !== 512) {
            displayErrorToast('Logo must be 512x512 pixels');
            event.target.value = '';
            setFieldValue('logo', '');
            return;
          }
          setPreview(reader.result as string);
          setIsLogoCleared(false);
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (values: FormValues): Promise<void> => {
    try {
      const requestData = new FormData();
      requestData.append('domain', values.domain);
      requestData.append('ticker', values.ticker);
      requestData.append('is_logo_cleared', isLogoCleared ? 'True' : 'False');

      if (initialValues.logo !== values.logo) requestData.append('logo', values.logo);

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
      logo: yup.string().required('Logo is required (512x512 px)'),
      ticker: yup.string().required(),
    });
  }, []);

  return (
    <S.Modal className={className} close={close} header={currency ? 'Edit Currency' : 'Add Currency'}>
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
        {({dirty, errors, isSubmitting, touched, isValid, setFieldValue, values}) => (
          <Form>
            <S.Input errors={errors} label="Domain" name="domain" touched={touched} />
            <S.Input errors={errors} label="Ticker" name="ticker" touched={touched} />
            {!values.logo && (
              <>
                <S.Label>Logo (required, 512x512 px)</S.Label>
                <Field
                  component={FileInput}
                  name="logo"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => handleFileChange(e, setFieldValue)}
                  touched={touched}
                />
              </>
            )}
            <ImagePreview
              onClear={async () => {
                await setFieldValue('logo', '');
                setPreview(null);
                setIsLogoCleared(true);
              }}
              src={preview}
            />
            <S.Bumper />
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
