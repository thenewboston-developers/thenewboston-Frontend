import {ChangeEvent, useEffect, useMemo, useState} from 'react';
import {useDispatch} from 'react-redux';
import {Form, Formik} from 'formik';

import Button from 'components/Button';
import {ButtonColor, ButtonType} from 'components/Button/types';
import EmojiPicker from 'components/EmojiPicker';
import {FileInput, FormField} from 'components/FormElements';
import ImagePreview from 'components/ImagePreview';
import MentionTextarea from 'components/MentionTextarea';
import {ModalBody, ModalFooter} from 'components/Modal';
import {createPost, updatePost} from 'dispatchers/posts';
import {ToastType} from 'enums';
import {AppDispatch, Post, SFC, UserReadSerializer} from 'types';
import {handleFormikAPIError} from 'utils/forms';
import {displayToast} from 'utils/toasts';
import yup from 'utils/yup';

import * as S from './Styles';

export interface PostModalProps {
  close(): void;
  post?: Post;
}

const PostModal: SFC<PostModalProps> = ({className, close, post}) => {
  const [mentionedUsers, setMentionedUsers] = useState<UserReadSerializer[]>(post?.mentioned_users || []);
  const [preview, setPreview] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();

  const initialValues = useMemo(
    () => ({
      content: post?.content || '',
      image: post?.image || '',
    }),
    [post?.content, post?.image],
  );

  type FormValues = typeof initialValues;

  useEffect(() => {
    if (!initialValues.image) return;
    setPreview(initialValues.image);
  }, [initialValues]);

  useEffect(() => {
    setMentionedUsers(post?.mentioned_users || []);
  }, [post]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (values: FormValues, helpers: any): Promise<void> => {
    try {
      const requestData = new FormData();
      requestData.append('content', values.content);

      mentionedUsers.forEach((user) => {
        requestData.append('mentioned_user_ids', user.id.toString());
      });

      if (post) {
        // For updates, only append image if it's a new file
        if (!values.image && initialValues.image) {
          requestData.append('clear_image', 'true');
        } else if (values.image && values.image !== initialValues.image) {
          requestData.append('image', values.image);
        }

        await dispatch(updatePost(post.id, requestData));
        displayToast('Post updated!', ToastType.SUCCESS);
      } else {
        // For new posts, only append image if it's present
        if (values.image) {
          requestData.append('image', values.image);
        }
        await dispatch(createPost(requestData));
        displayToast('Post created!', ToastType.SUCCESS);
      }

      close();
    } catch (error) {
      const verb = post ? 'updating' : 'creating';
      handleFormikAPIError(error, helpers, `Error ${verb} post`);
    }
  };

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      content: yup.string().required('Content is required'),
    });
  }, []);

  return (
    <S.Modal className={className} close={close} header={post ? 'Edit Post' : 'Add Post'}>
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
        {({dirty, errors, isSubmitting, isValid, setFieldValue, touched, values}) => (
          <Form>
            <ModalBody>
              <FormField>
                <S.TextareaContainer>
                  <MentionTextarea
                    errors={errors}
                    initialMentionedUsers={post?.mentioned_users || []}
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
                </S.TextareaContainer>
              </FormField>

              {!values.image && (
                <FormField>
                  <FileInput errors={errors} name="image" onChange={handleFileChange} touched={touched} />
                </FormField>
              )}
              <ImagePreview
                onClear={async () => {
                  await setFieldValue('image', '');
                  setPreview(null);
                }}
                src={preview}
              />
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

export default PostModal;
