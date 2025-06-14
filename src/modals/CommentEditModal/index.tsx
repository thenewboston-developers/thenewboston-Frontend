import React, {useMemo} from 'react';
import {useDispatch} from 'react-redux';
import {Form, Formik} from 'formik';

import Button from 'components/Button';
import {ButtonColor, ButtonType} from 'components/Button/types';
import EmojiPicker from 'components/EmojiPicker';
import {ModalContent, ModalFooter, ModalFooterButton} from 'components/Modal';
import {updateComment} from 'dispatchers/comments';
import {ToastType} from 'enums';
import {AppDispatch, Comment, SFC} from 'types';
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

  const initialValues = useMemo(
    () => ({
      content: comment.content,
    }),
    [comment.content],
  );

  type FormValues = typeof initialValues;

  const handleSubmit = async (values: FormValues, helpers: any): Promise<void> => {
    try {
      await dispatch(updateComment(comment.id, values));
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
            <ModalContent>
              <S.TextareaWrapper>
                <S.Textarea errors={errors} label="Content" name="content" touched={touched} />
                <EmojiPicker
                  displayMode="textarea"
                  field="content"
                  setFieldValue={setFieldValue}
                  value={values.content}
                />
              </S.TextareaWrapper>
            </ModalContent>

            <ModalFooter>
              <ModalFooterButton color={ButtonColor.secondary} onClick={close} text="Cancel" type={ButtonType.button} />
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
