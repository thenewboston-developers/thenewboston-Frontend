import React, {ChangeEvent, useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {Field, Form, Formik} from 'formik';

import Button, {ButtonType} from 'components/Button';
import {Checkbox, FileInput, Input, Select} from 'components/FormElements';
import ImagePreview from 'components/ImagePreview';
import {createProduct, updateProduct} from 'dispatchers/products';
import {ActivationStatus, ToastType} from 'enums';
import {usePriceCoreOptions} from 'hooks';
import {getManager} from 'selectors/state';
import {AppDispatch, SFC} from 'types';
import {displayErrorToast, displayToast} from 'utils/toast';
import yup from 'utils/yup';
import * as S from './Styles';

const SellCreateEditProduct: SFC = ({className}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const {activeProduct} = useSelector(getManager);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const priceCoreOptions = usePriceCoreOptions();

  const initialValues = useMemo(
    () => ({
      activation_status: activeProduct?.activation_status === ActivationStatus.ACTIVE,
      description: activeProduct?.description || '',
      image: activeProduct?.image || '',
      name: activeProduct?.name || '',
      price_amount: activeProduct?.price_amount.toString() || '',
      price_core: activeProduct?.price_core.toString() || '',
      quantity: activeProduct?.quantity.toString() || '',
    }),
    [
      activeProduct?.activation_status,
      activeProduct?.description,
      activeProduct?.image,
      activeProduct?.name,
      activeProduct?.price_amount,
      activeProduct?.price_core,
      activeProduct?.quantity,
    ],
  );

  type FormValues = typeof initialValues;

  useEffect(() => {
    if (!initialValues.image) return;
    setPreview(initialValues.image);
  }, [initialValues]);

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
      const requestData = new FormData();
      const activationStatus = values.activation_status ? ActivationStatus.ACTIVE : ActivationStatus.DRAFT;
      requestData.append('activation_status', activationStatus);
      requestData.append('description', values.description);
      requestData.append('name', values.name);
      requestData.append('price_amount', values.price_amount);
      requestData.append('price_core', values.price_core);
      requestData.append('quantity', values.quantity);

      if (initialValues.image !== values.image) requestData.append('image', values.image);

      if (activeProduct) {
        await dispatch(updateProduct(activeProduct.id, requestData));
        displayToast('Product updated!', ToastType.SUCCESS);
      } else {
        await dispatch(createProduct(requestData));
        displayToast('Product created!', ToastType.SUCCESS);
      }

      navigate('/shop/sell/products');
    } catch (error) {
      console.error(error);
      const verb = activeProduct ? 'updating' : 'creating';
      displayErrorToast(`Error ${verb} product`);
    }
  };

  const validationSchema = useMemo(() => {
    // TODO: Proper validation
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
            <ImagePreview
              onClear={async () => {
                await setFieldValue('image', '');
                setPreview(null);
              }}
              src={preview}
            />
            <S.Bumper />
            <Select errors={errors} label="Price Core" name="price_core" options={priceCoreOptions} touched={touched} />
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
