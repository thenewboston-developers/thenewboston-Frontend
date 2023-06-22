import {useMemo} from 'react';
import {Form, Formik} from 'formik';

import Button, {ButtonType} from 'components/Button';
import {LogoInput} from 'components/FormElements';
import {useActiveAssetPair} from 'hooks';
import {SFC} from 'types';
import yup from 'utils/yup';
import * as S from './Styles';

const Buy: SFC = ({className}) => {
  const activeAssetPair = useActiveAssetPair();

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
              logo={activeAssetPair!.primary_currency.logo}
              name="quantity"
              touched={touched}
            />
            <LogoInput
              errors={errors}
              label="Price"
              logo={activeAssetPair!.secondary_currency.logo}
              name="price"
              touched={touched}
            />
            <Button
              dirty={dirty}
              disabled={isSubmitting}
              isSubmitting={isSubmitting}
              isValid={isValid}
              text={`Buy ${activeAssetPair!.primary_currency.ticker}`}
              type={ButtonType.submit}
            />
          </Form>
        )}
      </Formik>
    </S.Container>
  );
};

export default Buy;
