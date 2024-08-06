import {useMemo} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {Form, Formik} from 'formik';

import {AppDispatch, SFC} from 'types';
import {ButtonType} from 'components/Button';
import {PATH_AUTHENTICATION} from 'constants/paths';
import {createUser} from 'dispatchers/users';
import {displayErrorToast} from 'utils/toasts';
import yup from 'utils/yup';

import * as S from './Styles';

const CreateAccountForm: SFC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const initialValues = {
    confirmPassword: '',
    password: '',
    username: '',
  };

  type FormValues = typeof initialValues;

  const handleSubmit = async (values: FormValues): Promise<void> => {
    try {
      const requestData = {
        password: values.password,
        username: values.username,
      };
      const user = await dispatch(createUser(requestData));
      navigate(`/profile/${user.id}`);
    } catch (error: any) {
      console.error(error);
      displayErrorToast(error);
    }
  };

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), undefined], 'Passwords must match')
        .required('Confirm Password is required'),
      password: yup.string().required(),
      username: yup
        .string()
        .matches(/^[A-Za-z0-9]+$/, 'Username must be alphanumeric')
        .required(),
    });
  }, []);

  return (
    <>
      <S.Heading>Create Account</S.Heading>
      <S.Panel>
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
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
        Already have an account? <S.Link to={PATH_AUTHENTICATION.LOGIN}>Sign In</S.Link>
      </S.QuestionText>
    </>
  );
};

export default CreateAccountForm;
