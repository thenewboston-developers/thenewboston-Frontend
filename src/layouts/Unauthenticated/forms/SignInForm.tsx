import {useMemo} from 'react';
import {Form, Formik} from 'formik';

import {login} from 'api/authentication';
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
      const data = await login(values);
      console.log(data);
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
      <S.Heading>Sign In</S.Heading>
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
                text="Sign In"
                type={ButtonType.submit}
              />
            </Form>
          )}
        </Formik>
      </S.Panel>
      <S.QuestionText>
        New user? <S.Link to="/createAccount">Create an Account</S.Link>
      </S.QuestionText>
    </>
  );
};

export default SignInForm;
