import {useEffect, useMemo, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';
import {Formik, FormikHelpers} from 'formik';
import orderBy from 'lodash/orderBy';
import {mdiSend} from '@mdi/js';

import {ButtonType} from 'components/Button';
import {createConversation} from 'dispatchers/conversations';
import {createMessage, getMessages as _getMessages} from 'dispatchers/messages';
import {getConversations, getIa, getManager, getMessages} from 'selectors/state';
import {AppDispatch, SFC} from 'types';
import {displayErrorToast} from 'utils/toasts';
import yup from 'utils/yup';
import Message from './Message';
import * as S from './Styles';

const Right: SFC = ({className}) => {
  const [scrollToBottom, setScrollToBottom] = useState<boolean>(true);
  const bottomMessageRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const manager = useSelector(getManager);
  const ia = useSelector(getIa).ia;
  const messages = useSelector(getMessages);
  const messagesRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const params = useParams();
  const conversations = useSelector(getConversations);
  const conversationsLength = Object.keys(conversations).length;

  const conversationId = params.id ? parseInt(params.id, 10) : manager.activeConversationId || null;

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

  useEffect(() => {
    if (!bottomMessageRef.current || !messagesRef.current) return;

    // As the app becomes visible the refs are initialized before rendering is complete
    // This delays scrolling until painting is complete
    const timeout = setTimeout(() => {
      bottomMessageRef?.current?.scrollIntoView(false);
    }, 100);

    return () => clearTimeout(timeout);
  }, [bottomMessageRef, conversationId, messagesRef]);

  useEffect(() => {
    if (!bottomMessageRef.current || !messagesRef.current) return;
    bottomMessageRef?.current?.scrollIntoView(false);
  }, [bottomMessageRef, conversationId, messagesRef]);

  useEffect(() => {
    if (!bottomMessageRef.current || !messagesRef.current || !scrollToBottom) return;
    bottomMessageRef.current.scrollIntoView({behavior: 'smooth'});
  }, [messages, scrollToBottom]);

  const messageList = useMemo(() => {
    const _messages = Object.values(messages).filter(({conversation}) => conversation === conversationId);
    return orderBy(_messages, ['created_date']);
  }, [conversationId, messages]);

  const handleMessagesScroll = () => {
    if (!bottomMessageRef.current || !messagesRef.current) return;
    const {clientHeight, scrollHeight, scrollTop} = messagesRef.current;
    const isScrolledToBottom = scrollHeight - scrollTop - clientHeight < 1;
    setScrollToBottom(isScrolledToBottom);
  };

  const handleSubmit = async (values: FormValues, {resetForm}: FormikHelpers<FormValues>): Promise<void> => {
    try {
      let newConversationId: number | null = null;

      if (!conversationId) {
        const conversation = await dispatch(createConversation({name: `New Conversation ${conversationsLength + 1}`}));
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
              <S.TextInput errors={errors} name="text" placeholder="Please type" touched={touched} />
              <S.Button
                dirty={dirty}
                disabled={isSubmitting}
                iconRight={mdiSend}
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
          <S.Avatar>
            <S.Image alt="avatar" src={ia?.avatar || ''} height={75} width={75} />
          </S.Avatar>
          <S.GreetingText>How can I help you?</S.GreetingText>
          <S.SubText>Start your conversation</S.SubText>
        </S.GreetingElements>
      </S.GreetingContainer>
    );
  };

  const renderMessagesContainer = () => {
    const _messages = messageList.map((message) => <Message key={message.id} message={message} />);
    return (
      <S.MessagesContainer onScroll={handleMessagesScroll} ref={messagesRef}>
        {_messages}
        <S.BottomMessage ref={bottomMessageRef} />
      </S.MessagesContainer>
    );
  };

  const renderTop = () => {
    return conversationId && !!messageList.length ? renderMessagesContainer() : renderGreetingContainer();
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
