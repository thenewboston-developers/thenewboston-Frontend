import {ChangeEvent, useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Form, Formik} from 'formik';

import Button from 'components/Button';
import {ButtonColor, ButtonType} from 'components/Button/types';
import {FileInput} from 'components/FormElements';
import ImagePreview from 'components/ImagePreview';
import Modal, {ModalContent, ModalFooter, ModalFooterButton} from 'components/Modal';
import {createCurrency, updateCurrency} from 'dispatchers/currencies';
import {getSelf} from 'selectors/state';
import {AppDispatch, Currency, SFC} from 'types';
import {displayErrorToast} from 'utils/toasts';
import yup from 'utils/yup';

import * as S from './Styles';

export interface CurrencyModalProps {
  close(): void;
  currency?: Currency;
  onSuccess?: () => void;
}

const CurrencyModal: SFC<CurrencyModalProps> = ({className, close, currency, onSuccess}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const self = useSelector(getSelf);

  const isEditMode = !!currency;

  const initialValues = useMemo(
    () => ({
      description: currency?.description || '',
      domain: currency?.domain || '',
      logo: currency?.logo || '',
      ticker: currency?.ticker || '',
    }),
    [currency],
  );

  type FormValues = typeof initialValues;

  useEffect(() => {
    if (initialValues.logo) {
      setPreview(initialValues.logo);
    }
  }, [initialValues.logo]);

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
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (values: FormValues): Promise<void> => {
    try {
      const requestData = new FormData();

      if (isEditMode) {
        // Always append description to ensure empty values are sent
        requestData.append('description', values.description);

        if (initialValues.logo !== values.logo) {
          requestData.append('logo', values.logo);
        }

        await dispatch(updateCurrency(currency.id, requestData));
      } else {
        // Create mode
        if (values.description) {
          requestData.append('description', values.description);
        }

        if (self.is_staff && values.domain) {
          requestData.append('domain', values.domain);
        }

        requestData.append('ticker', values.ticker);
        requestData.append('logo', values.logo);

        await dispatch(createCurrency(requestData));
      }

      onSuccess?.();
      close();
    } catch (error) {
      displayErrorToast(isEditMode ? 'Error updating currency' : 'Error creating currency');
    }
  };

  const validationSchema = useMemo(() => {
    const schema: any = {
      description: yup.string().max(500, 'Description must be at most 500 characters'),
      logo: yup.string().required('Logo is required (512x512 px)'),
    };

    if (!isEditMode) {
      schema.ticker = yup.string().required('Ticker is required');

      if (self.is_staff) {
        schema.domain = yup.string();
      }
    }

    return yup.object().shape(schema);
  }, [isEditMode, self.is_staff]);

  return (
    <Modal className={className} close={close} header={isEditMode ? 'Edit Currency' : 'Create Currency'}>
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
        {({dirty, errors, isSubmitting, touched, isValid, setFieldValue, values}) => (
          <Form>
            <ModalContent>
              {!isEditMode && (
                <S.FormField>
                  <S.Input errors={errors} label="Ticker" name="ticker" touched={touched} />
                </S.FormField>
              )}
              <S.FormField>
                <S.Textarea
                  errors={errors}
                  label="Description (optional)"
                  name="description"
                  placeholder=""
                  touched={touched}
                />
              </S.FormField>
              {!isEditMode && self.is_staff && (
                <S.FormField>
                  <S.Input errors={errors} label="Domain (optional)" name="domain" touched={touched} />
                </S.FormField>
              )}
              {!values.logo && (
                <S.FormField>
                  <FileInput
                    errors={errors}
                    label="Logo (required, 512x512 pixels)"
                    name="logo"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleFileChange(e, setFieldValue)}
                    touched={touched}
                  />
                </S.FormField>
              )}
              <ImagePreview
                onClear={async () => {
                  await setFieldValue('logo', '');
                  setPreview(null);
                }}
                src={preview}
              />
            </ModalContent>

            <ModalFooter>
              <ModalFooterButton color={ButtonColor.secondary} onClick={close} text="Cancel" type={ButtonType.button} />
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
    </Modal>
  );
};

export default CurrencyModal;
