import React, {ChangeEvent, useMemo, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {Field, Form, Formik} from 'formik';
import MdiIcon from '@mdi/react';
import {mdiClose} from '@mdi/js';

import Button, {ButtonType} from 'components/Button';
import {Checkbox, FileInput, Input, Select} from 'components/FormElements';
import {createProduct} from 'dispatchers/products';
import {ActivationStatus, ToastType} from 'enums';
import {AppDispatch, SFC} from 'types';
import {displayErrorToast, displayToast} from 'utils/toast';
import yup from 'utils/yup';
import * as S from './Styles';

const SellCreateEditProduct: SFC = ({className}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const initialValues = {
    activation_status: '',
    description: '',
    image: '',
    name: '',
    price_amount: '',
    price_core: '',
    quantity: '',
  };

  type FormValues = typeof initialValues;

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];

      // Create a data URL for the file
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (values: FormValues): Promise<void> => {
    try {
      console.log(values);

      const requestData = new FormData();
      const activationStatus = values.activation_status ? ActivationStatus.ACTIVE : ActivationStatus.DRAFT;
      requestData.append('activation_status', activationStatus);
      requestData.append('description', values.description);
      requestData.append('name', values.name);
      requestData.append('price_amount', values.price_amount);
      requestData.append('price_core', values.price_core);
      requestData.append('quantity', values.quantity);

      if (initialValues.image !== values.image) requestData.append('image', values.image);

      await dispatch(createProduct(requestData));

      displayToast('Product created!', ToastType.SUCCESS);
      navigate('/shop/sell/products');
    } catch (error) {
      console.error(error);
      displayErrorToast('Error creating product');
    }
  };

  const renderPreview = (setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void) => {
    let imgSrc;
    if (preview) imgSrc = preview;
    if (!imgSrc) return null;

    return (
      <S.ImgContainer
        onClick={() => {
          setFieldValue('image', '');
          setPreview(null);
        }}
      >
        <S.CloseButtonContainer>
          <MdiIcon path={mdiClose} size="16px" />
        </S.CloseButtonContainer>
        <S.Img alt="Preview" src={imgSrc} />
      </S.ImgContainer>
    );
  };

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      description: yup.string().required(),
      name: yup.string().required(),
    });
  }, []);

  return (
    <S.Container className={className}>
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
        {({dirty, errors, isSubmitting, isValid, setFieldValue, touched, values}) => (
          <Form>
            <Input errors={errors} label="Name" name="name" touched={touched} />
            <Input errors={errors} label="Description" name="description" touched={touched} />
            {!values.image && (
              <Field component={FileInput} name="image" onChange={handleFileChange} touched={touched} />
            )}
            {renderPreview(setFieldValue)}
            <S.Bumper />
            <Select
              errors={errors}
              label="Price Core"
              name="price_core"
              options={[
                {displayName: '-', value: 0},
                {displayName: 'TNB', value: 1},
                {displayName: 'VTX', value: 2},
              ]}
              touched={touched}
            />
            <Input errors={errors} label="Price Amount" name="price_amount" touched={touched} type="number" />
            <Input errors={errors} label="Quantity" name="quantity" touched={touched} type="number" />
            <Checkbox errors={errors} label="Activate Product" name="activation_status" touched={touched} />
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

export default SellCreateEditProduct;
