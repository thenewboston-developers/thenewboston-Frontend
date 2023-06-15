import {useMemo} from 'react';
import {Form, Formik} from 'formik';

import {ButtonType} from 'components/Button';
import {SFC} from 'types';
import yup from 'utils/yup';
import * as S from './Styles';

const CreateAccountForm: SFC = () => {
  const initialValues = {
    confirmPassword: '',
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
      confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), undefined], 'Passwords must match')
        .required('Confirm Password is required'),
      password: yup.string().required(),
      username: yup.string().required(),
    });
  }, []);

  return (
    <>
      <S.Heading>Create Account</S.Heading>
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
              <S.Input
                errors={errors}
                label="Confirm Password"
                name="confirmPassword"
                touched={touched}
                type="password"
              />
              <S.Button
                dirty={dirty}
                disabled={isSubmitting}
                isSubmitting={isSubmitting}
                isValid={isValid}
                text="Create Account"
                type={ButtonType.submit}
              />
            </Form>
          )}
        </Formik>
      </S.Panel>
      <S.QuestionText>
        Already have an account? <S.Link to="/signIn">Sign In</S.Link>
      </S.QuestionText>
    </>
  );
};

export default CreateAccountForm;
