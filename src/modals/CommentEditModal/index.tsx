import React, {useMemo, useState} from 'react';
import {useDispatch} from 'react-redux';
import {Form, Formik} from 'formik';

import Button from 'components/Button';
import {ButtonColor, ButtonType} from 'components/Button/types';
import EmojiPicker from 'components/EmojiPicker';
import MentionTextarea from 'components/MentionTextarea';
import {ModalBody, ModalFooter} from 'components/Modal';
import {updateComment} from 'dispatchers/comments';
import {ToastType} from 'enums';
import {AppDispatch, Comment, SFC, UserReadSerializer} from 'types';
import {handleFormikAPIError} from 'utils/forms';
import {displayToast} from 'utils/toasts';
import yup from 'utils/yup';

import * as S from './Styles';

export interface CommentEditModalProps {
  close(): void;
  comment: Comment;
}

const CommentEditModal: SFC<CommentEditModalProps> = ({className, close, comment}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [mentionedUsers, setMentionedUsers] = useState<UserReadSerializer[]>(comment.mentioned_users || []);

  const initialValues = useMemo(
    () => ({
      content: comment.content,
    }),
    [comment.content],
  );

  type FormValues = typeof initialValues;

  const handleSubmit = async (values: FormValues, helpers: any): Promise<void> => {
    try {
      await dispatch(
        updateComment(comment.id, {
          content: values.content,
          mentioned_user_ids: mentionedUsers.map((user) => user.id),
        }),
      );
      displayToast('Comment updated!', ToastType.SUCCESS);
      close();
    } catch (error) {
      handleFormikAPIError(error, helpers, 'Error updating comment');
    }
  };

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      content: yup.string(),
    });
  }, []);

  return (
    <S.Modal className={className} close={close} header="Edit Comment">
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
        {({dirty, errors, isSubmitting, isValid, setFieldValue, touched, values}) => (
          <Form>
            <ModalBody>
              <S.TextareaWrapper>
                <MentionTextarea
                  errors={errors}
                  initialMentionedUsers={comment.mentioned_users || []}
                  label="Content"
                  name="content"
                  onChange={(e) => setFieldValue('content', e.target.value)}
                  onMentionedUsersChange={setMentionedUsers}
                  touched={touched}
                  value={values.content}
                />
                <EmojiPicker
                  displayMode="textarea"
                  field="content"
                  setFieldValue={setFieldValue}
                  value={values.content}
                />
              </S.TextareaWrapper>
            </ModalBody>

            <ModalFooter>
              <Button color={ButtonColor.secondary} onClick={close} text="Cancel" type={ButtonType.button} />
              <Button
                dirty={dirty}
                disabled={isSubmitting}
                isSubmitting={isSubmitting}
                isValid={isValid}
                text="Submit"
                type={ButtonType.submit}
              />
            </ModalFooter>
          </Form>
        )}
      </Formik>
    </S.Modal>
  );
};

export default CommentEditModal;
