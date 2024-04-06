import React, {useMemo} from 'react';
import {useDispatch} from 'react-redux';
import {Form, Formik} from 'formik';

import Button, {ButtonType} from 'components/Button';
import {Input} from 'components/FormElements';
import {updateMessage} from 'dispatchers/messages';
import {ToastType} from 'enums';
import {AppDispatch, Message, SFC} from 'types';
import {displayErrorToast, displayToast} from 'utils/toasts';
import yup from 'utils/yup';
import * as S from './Styles';

export interface MessageEditModalProps {
  close(): void;
  message: Message;
}

const MessageEditModal: SFC<MessageEditModalProps> = ({className, close, message}) => {
  const dispatch = useDispatch<AppDispatch>();

  const initialValues = useMemo(
    () => ({
      text: message.text,
    }),
    [message.text],
  );

  type FormValues = typeof initialValues;

  const handleSubmit = async (values: FormValues): Promise<void> => {
    try {
      await dispatch(updateMessage(message.id, values));
      displayToast('Message updated!', ToastType.SUCCESS);
      close();
    } catch (error) {
      console.error(error);
      displayErrorToast('Error updating message');
    }
  };

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      text: yup.string(),
    });
  }, []);

  return (
    <S.Modal className={className} close={close} header="Update Message">
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
        {({dirty, errors, isSubmitting, isValid, touched}) => (
          <Form>
            <Input errors={errors} label="Text" name="text" touched={touched} />
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

export default MessageEditModal;
