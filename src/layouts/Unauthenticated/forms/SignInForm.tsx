import {useMemo} from 'react';
import {useDispatch} from 'react-redux';
import {useLocation} from 'react-router-dom';
import {Form, Formik} from 'formik';

import {ButtonColor, ButtonType} from 'components/Button';
import {FormField} from 'components/FormElements';
import {PATH_AUTHENTICATION} from 'constants/paths';
import {login} from 'dispatchers/authentication';
import {AppDispatch, SFC} from 'types';
import {handleFormikAPIError} from 'utils/forms';
import yup from 'utils/yup';

import * as S from './Styles';

const SignInForm: SFC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();

  const initialValues = {
    password: '',
    username: '',
  };

  type FormValues = typeof initialValues;

  const handleSubmit = async (values: FormValues, helpers: any): Promise<void> => {
    try {
      // The layout sends the visitor on to their destination as soon as they are authenticated
      await dispatch(login(values));
    } catch (error) {
      handleFormikAPIError(error, helpers, 'Error logging in');
    }
  };

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      password: yup.string().required('Password is required'),
      username: yup.string().required('Username is required'),
    });
  }, []);

  return (
    <>
      <S.Heading>Sign In</S.Heading>
      <S.Panel>
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
          {({dirty, errors, isSubmitting, touched, isValid}) => (
            <Form>
              <FormField>
                <S.Input errors={errors} label="Username" name="username" touched={touched} />
              </FormField>
              <FormField>
                <S.Input errors={errors} label="Password" name="password" touched={touched} type="password" />
              </FormField>
              <FormField>
                <S.Button
                  color={ButtonColor.danger}
                  dirty={dirty}
                  disabled={isSubmitting}
                  isSubmitting={isSubmitting}
                  isValid={isValid}
                  text="Sign In"
                  type={ButtonType.submit}
                />
              </FormField>
            </Form>
          )}
        </Formik>
      </S.Panel>
      <S.QuestionText>
        New user?{' '}
        <S.Link to={{pathname: PATH_AUTHENTICATION.CREATE_ACCOUNT, search: location.search}}>Create an Account</S.Link>
      </S.QuestionText>
    </>
  );
};

export default SignInForm;
