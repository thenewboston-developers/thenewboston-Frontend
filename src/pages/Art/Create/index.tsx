import React, {useMemo, useState} from 'react';
import {Form, Formik} from 'formik';

import {createOpenAIImage} from 'api/openaiImages';
import Button, {ButtonType} from 'components/Button';
import {Select, Textarea} from 'components/FormElements';
import {CreateOpenAIImageResponse, SFC} from 'types';
import {displayErrorToast} from 'utils/toasts';
import yup from 'utils/yup';
import ImageCarousel from './ImageCarousel';
import * as S from './Styles';

const Create: SFC = ({className}) => {
  const [createOpenAIImageResponse, setCreateOpenAIImageResponse] = useState<CreateOpenAIImageResponse | null>(null);
  const [description, setDescription] = useState('');

  const initialValues = {
    description: '',
    quantity: 1,
  };

  type FormValues = typeof initialValues;

  const handleSubmit = async (values: FormValues): Promise<void> => {
    try {
      const results = await createOpenAIImage(values);
      setCreateOpenAIImageResponse(results);
    } catch (error) {
      console.error(error);
      displayErrorToast('Error generating art');
    }
  };

  const renderImageCarousel = () => {
    if (!createOpenAIImageResponse) return null;
    const imageUrls = createOpenAIImageResponse.data.map(({url}) => url);
    return <ImageCarousel description={description} imageUrls={imageUrls} />;
  };

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      description: yup.string().required(),
      quantity: yup.number().min(1).max(10).required().integer(),
    });
  }, []);

  return (
    <S.Container className={className}>
      <S.FormContainer>
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
          {({dirty, errors, handleChange, isSubmitting, isValid, touched}) => (
            <Form>
              <Textarea
                errors={errors}
                label="Description"
                onChange={(e) => {
                  handleChange(e);
                  setDescription(e.target.value);
                }}
                name="description"
                touched={touched}
              />
              <Select
                errors={errors}
                label="Quantity"
                name="quantity"
                options={[
                  {displayName: '1 Image', value: 1},
                  {displayName: '2 Images', value: 2},
                  {displayName: '3 Images', value: 3},
                  {displayName: '4 Images', value: 4},
                  {displayName: '5 Images', value: 5},
                  {displayName: '6 Images', value: 6},
                  {displayName: '7 Images', value: 7},
                  {displayName: '8 Images', value: 8},
                  {displayName: '9 Images', value: 9},
                  {displayName: '10 Images', value: 10},
                ]}
                touched={touched}
              />
              <Button
                dirty={dirty}
                disabled={isSubmitting}
                isSubmitting={isSubmitting}
                isValid={isValid}
                text="Generate Art"
                type={ButtonType.submit}
              />
            </Form>
          )}
        </Formik>
      </S.FormContainer>
      <S.ImageCarouselContainer>{renderImageCarousel()}</S.ImageCarouselContainer>
    </S.Container>
  );
};

export default Create;
