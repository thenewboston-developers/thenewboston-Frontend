import {useMemo} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {Form, Formik} from 'formik';

import {ButtonType} from 'components/Button';
import {FormField} from 'components/FormElements';
import {PATH_AUTHENTICATION} from 'constants/paths';
import {createUser} from 'dispatchers/users';
import {AppDispatch, SFC} from 'types';
import {displayErrorToast} from 'utils/toasts';
import yup from 'utils/yup';

import * as S from './Styles';

const CreateAccountForm: SFC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const initialValues = {
    confirmPassword: '',
    invitationCode: '',
    password: '',
    username: '',
  };

  type FormValues = typeof initialValues;

  const handleSubmit = async (values: FormValues): Promise<void> => {
    try {
      const requestData = {
        invitation_code: values.invitationCode,
        password: values.password,
        username: values.username,
      };
      const user = await dispatch(createUser(requestData));
      navigate(`/profile/${user.id}`);
    } catch (error: any) {
      displayErrorToast(error);
    }
  };

  const validationSchema = useMemo(() => {
    const reservedUsernames = ['admin', 'support', 'moderator', 'thenewboston', 'ia'];

    return yup.object().shape({
      confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), undefined], 'Passwords must match')
        .required('Confirm Password is required'),
      invitationCode: yup.string().required('Invitation code is required'),
      password: yup.string().required('Password is required'),
      username: yup
        .string()
        .min(2, 'Username must be at least 2 characters')
        .max(150, 'Username must not exceed 150 characters')
        .matches(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores')
        .test('no-leading-underscore', 'Username cannot start with underscore', (value) => {
          return !value || !value.startsWith('_');
        })
        .test('no-trailing-underscore', 'Username cannot end with underscore', (value) => {
          return !value || !value.endsWith('_');
        })
        .test('no-consecutive-underscores', 'Username cannot contain consecutive underscores', (value) => {
          return !value || !value.includes('__');
        })
        .test('not-reserved', 'This username is reserved', (value) => {
          return !value || !reservedUsernames.includes(value.toLowerCase());
        })
        .required('Username is required'),
    });
  }, []);

  return (
    <>
      <S.Heading>Create Account</S.Heading>
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
                <S.Input
                  errors={errors}
                  label="Confirm Password"
                  name="confirmPassword"
                  touched={touched}
                  type="password"
                />
              </FormField>
              <FormField>
                <S.Input errors={errors} label="Invitation Code" name="invitationCode" touched={touched} />
              </FormField>
              <FormField>
                <S.Button
                  dirty={dirty}
                  disabled={isSubmitting}
                  isSubmitting={isSubmitting}
                  isValid={isValid}
                  text="Create Account"
                  type={ButtonType.submit}
                />
              </FormField>
            </Form>
          )}
        </Formik>
      </S.Panel>
      <S.QuestionText>
        Already have an account? <S.Link to={PATH_AUTHENTICATION.SIGN_IN}>Sign In</S.Link>
      </S.QuestionText>
    </>
  );
};

export default CreateAccountForm;
