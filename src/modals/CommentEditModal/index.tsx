import React, {useMemo} from 'react';
import {useDispatch} from 'react-redux';
import {Form, Formik} from 'formik';

import Button, {ButtonType} from 'components/Button';
import EmojiBox from 'components/EmojiPicker';
import {updateComment} from 'dispatchers/comments';
import {ToastType} from 'enums';
import {AppDispatch, Comment, SFC} from 'types';
import {displayErrorToast, displayToast} from 'utils/toasts';
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

  const handleSubmit = async (values: FormValues): Promise<void> => {
    try {
      await dispatch(updateComment(comment.id, values));
      displayToast('Comment updated!', ToastType.SUCCESS);
      close();
    } catch (error) {
      displayErrorToast('Error updating comment');
    }
  };

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      content: yup.string(),
    });
  }, []);

  return (
    <S.Modal className={className} close={close} header="Update Comment">
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
        {({dirty, errors, isSubmitting, isValid, setFieldValue, touched, values}) => (
          <Form>
            <S.Div>
              <S.Textarea errors={errors} label="Content" name="content" touched={touched} />
              <EmojiBox setFieldValue={setFieldValue} value={values.content} field="content" />
            </S.Div>
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

export default CommentEditModal;
