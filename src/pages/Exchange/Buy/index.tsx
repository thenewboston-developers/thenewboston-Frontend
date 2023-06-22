import {useMemo} from 'react';
import {Form, Formik} from 'formik';

import Button, {ButtonType} from 'components/Button';
import {LogoInput} from 'components/FormElements';
import {SFC} from 'types';
import yup from 'utils/yup';
import * as S from './Styles';

const Buy: SFC = ({className}) => {
  const initialValues = {
    price: '',
    quantity: '',
  };

  type FormValues = typeof initialValues;

  const handleSubmit = async (values: FormValues): Promise<void> => {
    try {
      console.log(values);
    } catch (error) {
      console.error(error);
    }
  };

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      price: yup.number().moreThan(0).required(),
      quantity: yup.number().moreThan(0).required(),
    });
  }, []);

  return (
    <S.Container className={className}>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validateOnMount={false}
        validationSchema={validationSchema}
      >
        {({dirty, errors, isSubmitting, touched, isValid}) => (
          <Form>
            <LogoInput
              errors={errors}
              label="Quantity"
              logo="http://127.0.0.1:8000/media/images/letter-v_13Q0QBt.png"
              name="quantity"
              touched={touched}
            />
            <LogoInput
              errors={errors}
              label="Price"
              logo="https://avatars.githubusercontent.com/u/12706692?s=200&v=4"
              name="price"
              touched={touched}
            />
            <Button
              dirty={dirty}
              disabled={isSubmitting}
              isSubmitting={isSubmitting}
              isValid={isValid}
              text="Buy ABC"
              type={ButtonType.submit}
            />
          </Form>
        )}
      </Formik>
    </S.Container>
  );
};

export default Buy;
