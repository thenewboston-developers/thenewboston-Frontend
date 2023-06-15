import {useMemo} from 'react';
import {Form, Formik} from 'formik';

import {ButtonType} from 'components/Button';
import {SFC} from 'types';
import yup from 'utils/yup';
import * as S from './Styles';

const SignInForm: SFC = () => {
  const initialValues = {
    password: '',
    username: '',
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
      password: yup.string().required(),
      username: yup.string().required(),
    });
  }, []);

  return (
    <>
      <S.Heading>Sign in</S.Heading>
      <S.Panel>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validateOnMount={false}
          validationSchema={validationSchema}
        >
          {({dirty, errors, isSubmitting, touched, isValid}) => (
            <Form>
              <S.Input errors={errors} label="Username" name="username" touched={touched} />
              <S.Input errors={errors} label="Password" name="password" touched={touched} type="password" />
              <S.Button
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
      </S.Panel>
    </>
  );
};

export default SignInForm;
