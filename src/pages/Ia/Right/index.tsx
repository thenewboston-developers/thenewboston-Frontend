import {useMemo} from 'react';
import {useSelector} from 'react-redux';
import {Formik, FormikHelpers} from 'formik';
import {isArray} from 'lodash-es';
import {mdiFaceWoman} from '@mdi/js';

import Avatar from 'components/Avatar';
import {ButtonType} from 'components/Button';
import Icon from 'components/Icon';
import {getSelf} from 'selectors/state';
import {SFC} from 'types';
import {displayErrorToast} from 'utils/toast';
import yup from 'utils/yup';
import * as S from './Styles';

const Right: SFC = ({className}) => {
  const self = useSelector(getSelf);

  const initialValues = {
    text: '',
  };

  type FormValues = typeof initialValues;

  const handleSubmit = async (values: FormValues, {resetForm}: FormikHelpers<FormValues>): Promise<void> => {
    try {
      console.log(values);
      resetForm();
    } catch (error) {
      console.error(error);
      displayErrorToast('Error submitting the message');
    }
  };

  const renderBottom = () => {
    return (
      <S.Bottom>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validateOnMount={false}
          validationSchema={validationSchema}
        >
          {({dirty, errors, isSubmitting, isValid, touched}) => (
            <S.Form>
              <Avatar src={self.avatar} />
              <S.TextInput errors={errors} name="text" placeholder="Send a message..." touched={touched} />
              <S.Button
                dirty={dirty}
                disabled={isSubmitting}
                isSubmitting={isSubmitting}
                isValid={isValid}
                text=""
                type={ButtonType.submit}
              />
            </S.Form>
          )}
        </Formik>
      </S.Bottom>
    );
  };

  const renderGreetingContainer = () => {
    return (
      <S.GreetingContainer>
        <S.GreetingElements>
          <Icon className={className} icon={mdiFaceWoman} size={64} />
          <S.GreetingText>Yo yo</S.GreetingText>
        </S.GreetingElements>
      </S.GreetingContainer>
    );
  };

  const renderMessagesContainer = () => {
    return (
      <S.MessagesContainer>
        <h1>message 1</h1>
        <h1>message 2</h1>
      </S.MessagesContainer>
    );
  };

  const renderTop = () => {
    return <S.Top>{isArray(1) ? renderGreetingContainer() : renderMessagesContainer()}</S.Top>;
  };

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      text: yup.string().required(),
    });
  }, []);

  return (
    <S.Container className={className}>
      {renderTop()}
      {renderBottom()}
    </S.Container>
  );
};

export default Right;
