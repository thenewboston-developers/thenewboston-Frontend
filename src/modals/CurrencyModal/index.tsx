import {ChangeEvent, useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Form, Formik} from 'formik';

import Button from 'components/Button';
import {ButtonColor, ButtonType} from 'components/Button/types';
import {FileInput} from 'components/FormElements';
import ImagePreview from 'components/ImagePreview';
import {ModalContent, ModalFooter, ModalFooterButton} from 'components/Modal';
import {createCurrency, updateCurrency} from 'dispatchers/currencies';
import {getSelf} from 'selectors/state';
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
  const self = useSelector(getSelf);

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

      if (self.is_staff && values.domain) {
        requestData.append('domain', values.domain);
      }

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
    const schema: any = {
      logo: yup.string().required('Logo is required (512x512 px)'),
      ticker: yup.string().required(),
    };

    if (self.is_staff) {
      schema.domain = yup.string();
    }

    return yup.object().shape(schema);
  }, [self.is_staff]);

  return (
    <S.Modal className={className} close={close} header={currency ? 'Edit Currency' : 'Create Currency'}>
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
        {({dirty, errors, isSubmitting, touched, isValid, setFieldValue, values}) => (
          <Form>
            <ModalContent>
              {self.is_staff && <S.Input errors={errors} label="Domain (optional)" name="domain" touched={touched} />}
              <S.Input errors={errors} label="Ticker" name="ticker" touched={touched} />
              {!values.logo && (
                <FileInput
                  errors={errors}
                  label="Logo (required, 512x512 pixels)"
                  name="logo"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => handleFileChange(e, setFieldValue)}
                  touched={touched}
                />
              )}
              <ImagePreview
                onClear={async () => {
                  await setFieldValue('logo', '');
                  setPreview(null);
                  setIsLogoCleared(true);
                }}
                src={preview}
              />
            </ModalContent>

            <ModalFooter>
              <ModalFooterButton onClick={close} text="Cancel" type={ButtonType.button} color={ButtonColor.secondary} />
              <Button
                dirty={dirty}
                disabled={isSubmitting}
                isSubmitting={isSubmitting}
                isValid={isValid}
                text="Submit"
                type={ButtonType.submit}
              />
            </ModalFooter>
          </Form>
        )}
      </Formik>
    </S.Modal>
  );
};

export default CurrencyModal;
