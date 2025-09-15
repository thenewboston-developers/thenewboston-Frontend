import {useMemo} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {Form, Formik} from 'formik';

import {ButtonColor, ButtonType} from 'components/Button';
import {FormField} from 'components/FormElements';
import {INVITE_SYSTEM_ENABLED} from 'constants/featureFlags';
import {PATH_AUTHENTICATION} from 'constants/paths';
import {createUser} from 'dispatchers/users';
import {useToggle} from 'hooks';
import PrivacyPolicyModal from 'modals/PrivacyPolicyModal';
import TermsModal from 'modals/TermsModal';
import {AppDispatch, SFC} from 'types';
import {handleFormikAPIError} from 'utils/forms';
import yup from 'utils/yup';

import * as S from './Styles';

const CreateAccountForm: SFC = () => {
  const [privacyPolicyModalIsOpen, togglePrivacyPolicyModal] = useToggle(false);
  const [termsModalIsOpen, toggleTermsModal] = useToggle(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const initialValues = {
    agreeToTerms: false,
    confirmPassword: '',
    invitationCode: '',
    password: '',
    username: '',
  };

  type FormValues = typeof initialValues;

  const handleSubmit = async (values: FormValues, helpers: any): Promise<void> => {
    try {
      const requestData: any = {
        agree_to_terms: values.agreeToTerms,
        password: values.password,
        username: values.username,
      };
      if (INVITE_SYSTEM_ENABLED) {
        requestData.invitation_code = values.invitationCode;
      }
      const user = await dispatch(createUser(requestData));
      navigate(`/profile/${user.id}`);
    } catch (error: any) {
      handleFormikAPIError(error, helpers, 'Error creating account');
    }
  };

  const validationSchema = useMemo(() => {
    const reservedUsernames = ['admin', 'support', 'moderator', 'thenewboston', 'ia'];

    const schema: any = {
      agreeToTerms: yup
        .boolean()
        .oneOf([true], 'You must agree to the terms and conditions and privacy policy')
        .required('You must agree to the terms and conditions and privacy policy'),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), undefined], 'Passwords must match')
        .required('Confirm Password is required'),
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
    };

    if (INVITE_SYSTEM_ENABLED) {
      schema.invitationCode = yup.string().required('Invitation code is required');
    }

    return yup.object().shape(schema);
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
              {INVITE_SYSTEM_ENABLED && (
                <FormField>
                  <S.Input errors={errors} label="Invitation Code" name="invitationCode" touched={touched} />
                </FormField>
              )}
              <FormField>
                <S.Checkbox
                  errors={errors}
                  label={
                    <span>
                      I agree to the{' '}
                      <S.TermsLink
                        onClick={(e) => {
                          e.preventDefault();
                          toggleTermsModal();
                        }}
                      >
                        Terms and Conditions
                      </S.TermsLink>{' '}
                      and{' '}
                      <S.TermsLink
                        onClick={(e) => {
                          e.preventDefault();
                          togglePrivacyPolicyModal();
                        }}
                      >
                        Privacy Policy
                      </S.TermsLink>
                    </span>
                  }
                  name="agreeToTerms"
                  touched={touched}
                />
              </FormField>
              <FormField>
                <S.Button
                  color={ButtonColor.danger}
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
      {termsModalIsOpen && <TermsModal close={toggleTermsModal} />}
      {privacyPolicyModalIsOpen && <PrivacyPolicyModal close={togglePrivacyPolicyModal} />}
    </>
  );
};

export default CreateAccountForm;
