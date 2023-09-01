import {useMemo, useState} from 'react';
import {Form, Formik, FormikHelpers} from 'formik';

import {createOpenAIImage} from 'api/openaiImages';
import Button, {ButtonType} from 'components/Button';
import {CreateOpenAIImageResponse, SFC} from 'types';
import {displayErrorToast} from 'utils/toast';
import yup from 'utils/yup';
import * as S from './Styles';

const Canvas: SFC = ({className}) => {
  const [createOpenAIImageResponse, setCreateOpenAIImageResponse] = useState<CreateOpenAIImageResponse | null>(null);

  const initialValues = {
    description: '',
  };

  type FormValues = typeof initialValues;

  const handleSubmit = async (values: FormValues, {resetForm}: FormikHelpers<FormValues>): Promise<void> => {
    try {
      const results = await createOpenAIImage(values);
      setCreateOpenAIImageResponse(results);
      resetForm();
    } catch (error) {
      console.error(error);
      displayErrorToast('Error generating art');
    }
  };

  const renderImages = () => {
    if (!createOpenAIImageResponse) return null;
    return createOpenAIImageResponse.data
      .map((imageData) => imageData.url)
      .map((imageUrl) => <S.Img key={imageUrl} src={imageUrl} />);
  };

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      description: yup.string().required(),
    });
  }, []);

  return (
    <S.Container className={className}>
      <S.Left>
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
          {({dirty, errors, isSubmitting, touched, isValid}) => (
            <Form>
              <S.Input errors={errors} label="Description" name="description" touched={touched} />
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
      </S.Left>
      <S.Right>{renderImages()}</S.Right>
    </S.Container>
  );
};

export default Canvas;
