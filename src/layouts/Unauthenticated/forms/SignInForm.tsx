import {useMemo} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {Form, Formik} from 'formik';

import {ButtonType} from 'components/Button';
import {login} from 'dispatchers/authentication';
import {AppDispatch, SFC} from 'types';
import {displayErrorToast} from 'utils/toast';
import yup from 'utils/yup';
import * as S from './Styles';

const SignInForm: SFC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const initialValues = {
    password: '',
    username: '',
  };

  type FormValues = typeof initialValues;

  const handleSubmit = async (values: FormValues): Promise<void> => {
    try {
      await dispatch(login(values));
      navigate('/');
    } catch (error) {
      console.error(error);
      displayErrorToast('Error logging in');
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
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
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
