import {useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';
import {Formik, FormikHelpers} from 'formik';
import orderBy from 'lodash/orderBy';
import {mdiFaceWoman} from '@mdi/js';

import Avatar from 'components/Avatar';
import {ButtonType} from 'components/Button';
import Icon from 'components/Icon';
import {createConversation} from 'dispatchers/conversations';
import {createMessage, getMessages as _getMessages} from 'dispatchers/messages';
import {getMessages, getSelf} from 'selectors/state';
import {AppDispatch, SFC} from 'types';
import {displayErrorToast} from 'utils/toast';
import yup from 'utils/yup';
import Message from './Message';
import * as S from './Styles';

const Right: SFC = ({className}) => {
  const dispatch = useDispatch<AppDispatch>();
  const messages = useSelector(getMessages);
  const navigate = useNavigate();
  const params = useParams();
  const self = useSelector(getSelf);

  const conversationId = params.id ? parseInt(params.id, 10) : null;

  const initialValues = {
    text: '',
  };

  type FormValues = typeof initialValues;

  useEffect(() => {
    (async () => {
      if (!conversationId) return;
      await dispatch(_getMessages());
    })();
  }, [conversationId, dispatch]);

  const messageList = useMemo(() => {
    const _messages = Object.values(messages).filter(({conversation}) => conversation === conversationId);
    return orderBy(_messages, ['created_date']);
  }, [conversationId, messages]);

  const handleSubmit = async (values: FormValues, {resetForm}: FormikHelpers<FormValues>): Promise<void> => {
    try {
      let newConversationId: number | null = null;

      if (!conversationId) {
        const conversation = await dispatch(createConversation({name: 'beans 4'}));
        newConversationId = conversation.id;
      }

      const activeConversationId = conversationId || newConversationId;

      await dispatch(createMessage({...values, conversation: activeConversationId!}));
      resetForm();

      if (newConversationId) navigate(`/ia/${newConversationId}`);
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
    const _messages = messageList.map((message) => <Message key={message.id} message={message} />);
    return <S.MessagesContainer>{_messages}</S.MessagesContainer>;
  };

  const renderTop = () => {
    return (
      <S.Top>{conversationId && !!messageList.length ? renderMessagesContainer() : renderGreetingContainer()}</S.Top>
    );
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
