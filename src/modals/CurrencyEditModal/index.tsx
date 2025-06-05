import {ChangeEvent, useEffect, useMemo, useState} from 'react';
import {useDispatch} from 'react-redux';
import {Form, Formik} from 'formik';

import Button from 'components/Button';
import {ButtonColor, ButtonType} from 'components/Button/types';
import {FileInput} from 'components/FormElements';
import ImagePreview from 'components/ImagePreview';
import {ModalContent, ModalFooter, ModalFooterButton} from 'components/Modal';
import {updateCurrency} from 'dispatchers/currencies';
import {AppDispatch, CurrencyReadDetailSerializer, SFC} from 'types';
import {displayErrorToast} from 'utils/toasts';
import yup from 'utils/yup';

import * as S from './Styles';

export interface CurrencyEditModalProps {
  close(): void;
  currency: CurrencyReadDetailSerializer;
  onSuccess?: () => void;
}

const CurrencyEditModal: SFC<CurrencyEditModalProps> = ({className, close, currency, onSuccess}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();

  const initialValues = useMemo(
    () => ({
      description: currency.description || '',
      logo: currency.logo || '',
    }),
    [currency.description, currency.logo],
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
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (values: FormValues): Promise<void> => {
    try {
      const requestData = new FormData();

      // Always append description to ensure empty values are sent
      requestData.append('description', values.description);

      if (initialValues.logo !== values.logo) requestData.append('logo', values.logo);

      await dispatch(updateCurrency(currency.id, requestData));
      onSuccess?.();
      close();
    } catch (error) {
      displayErrorToast('Error updating currency');
    }
  };

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      description: yup.string().max(500, 'Description must be at most 500 characters'),
      logo: yup.string().required('Logo is required (512x512 px)'),
    });
  }, []);

  return (
    <S.Modal className={className} close={close} header="Edit Currency">
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
        {({dirty, errors, isSubmitting, touched, isValid, setFieldValue, values}) => (
          <Form>
            <ModalContent>
              <S.Textarea
                errors={errors}
                label="Description (optional)"
                name="description"
                placeholder=""
                touched={touched}
              />
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
    </S.Modal>
  );
};

export default CurrencyEditModal;
