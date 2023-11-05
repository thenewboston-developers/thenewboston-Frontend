import {useMemo, useState} from 'react';
import {Form, Formik} from 'formik';

import {createOpenAIImage} from 'api/openaiImages';
import Button, {ButtonType} from 'components/Button';
import {Textarea} from 'components/FormElements';
import {CreateOpenAIImageResponse, SFC} from 'types';
import {displayErrorToast} from 'utils/toast';
import yup from 'utils/yup';
import ImagePreview from './ImagePreview';
import * as S from './Styles';

const Create: SFC = ({className}) => {
  const [createOpenAIImageResponse, setCreateOpenAIImageResponse] = useState<CreateOpenAIImageResponse | null>(null);
  const [description, setDescription] = useState('');

  const initialValues = {
    description: '',
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

  const renderImages = () => {
    if (!createOpenAIImageResponse) return null;
    return createOpenAIImageResponse.data
      .map((imageData) => imageData.url)
      .map((imageUrl) => <ImagePreview description={description} imageUrl={imageUrl} key={imageUrl} />);
  };

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      description: yup.string().required(),
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
      <S.ImagesContainer>{renderImages()}</S.ImagesContainer>
    </S.Container>
  );
};

export default Create;
