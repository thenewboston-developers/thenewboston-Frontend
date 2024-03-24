import React, {useMemo} from 'react';
import {useDispatch} from 'react-redux';
import {Form, Formik} from 'formik';

import Button, {ButtonType} from 'components/Button';
import {Input} from 'components/FormElements';
import {updateConversation} from 'dispatchers/conversations';
import {ToastType} from 'enums';
import {AppDispatch, Conversation, SFC} from 'types';
import {displayErrorToast, displayToast} from 'utils/toast';
import yup from 'utils/yup';
import * as S from './Styles';

export interface ConversationEditModalProps {
  close(): void;
  conversation: Conversation;
}

const ConversationEditModal: SFC<ConversationEditModalProps> = ({className, close, conversation}) => {
  const dispatch = useDispatch<AppDispatch>();

  const initialValues = useMemo(
    () => ({
      name: conversation.name,
    }),
    [conversation.name],
  );

  type FormValues = typeof initialValues;

  const handleSubmit = async (values: FormValues): Promise<void> => {
    try {
      await dispatch(updateConversation(conversation.id, values));
      displayToast('Conversation updated!', ToastType.SUCCESS);
      close();
    } catch (error) {
      console.error(error);
      displayErrorToast('Error updating conversation');
    }
  };

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      name: yup.string(),
    });
  }, []);

  return (
    <S.Modal className={className} close={close} header="Update Conversation">
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
        {({dirty, errors, isSubmitting, isValid, touched}) => (
          <Form>
            <Input errors={errors} label="Name" name="name" touched={touched} />
            <Button
              dirty={dirty}
              disabled={isSubmitting}
              isSubmitting={isSubmitting}
              isValid={isValid}
              text="Submit"
              type={ButtonType.submit}
            />
          </Form>
        )}
      </Formik>
    </S.Modal>
  );
};

export default ConversationEditModal;
