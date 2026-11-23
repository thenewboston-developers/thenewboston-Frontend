import {useEffect, useMemo, useState} from 'react';
import {useDispatch} from 'react-redux';
import {Form, Formik} from 'formik';

import Button from 'components/Button';
import {ButtonColor, ButtonType} from 'components/Button/types';
import EmojiPicker from 'components/EmojiPicker';
import {FormField} from 'components/FormElements';
import MentionTextarea from 'components/MentionTextarea';
import {ModalBody, ModalFooter} from 'components/Modal';
import PostImagesInput from 'components/PostImagesInput';
import {createPost, updatePost} from 'dispatchers/posts';
import {ToastType} from 'enums';
import {usePostImages} from 'hooks';
import {AppDispatch, Post, SFC, UserReadSerializer} from 'types';
import {handleFormikAPIError} from 'utils/forms';
import {getPostImagesErrorMessage} from 'utils/postImages';
import {displayErrorToast, displayToast} from 'utils/toasts';
import yup from 'utils/yup';

import * as S from './Styles';

export interface PostModalProps {
  close(): void;
  post?: Post;
}

const PostModal: SFC<PostModalProps> = ({className, close, post}) => {
  const [mentionedUsers, setMentionedUsers] = useState<UserReadSerializer[]>(post?.mentioned_users || []);
  const {addImages, hasImageChanges, images, removeImage, uploadImages, uploadProgress} = usePostImages(post?.images);
  const dispatch = useDispatch<AppDispatch>();

  const initialValues = useMemo(
    () => ({
      content: post?.content || '',
    }),
    [post?.content],
  );

  type FormValues = typeof initialValues;

  useEffect(() => {
    setMentionedUsers(post?.mentioned_users || []);
  }, [post]);

  const handleSubmit = async (values: FormValues, helpers: any): Promise<void> => {
    const verb = post ? 'updating' : 'creating';

    try {
      const imageIds = await uploadImages();
      if (!imageIds) return;

      const requestData = {
        content: values.content,
        image_ids: imageIds,
        // Without the list the API derives the mentions from the content
        ...(mentionedUsers.length ? {mentioned_user_ids: mentionedUsers.map((user) => user.id)} : {}),
      };

      if (post) {
        await dispatch(updatePost(post.id, requestData));
        displayToast('Post updated!', ToastType.SUCCESS);
      } else {
        await dispatch(createPost(requestData));
        displayToast('Post created!', ToastType.SUCCESS);
      }

      close();
    } catch (error) {
      const imagesErrorMessage = getPostImagesErrorMessage(error);

      if (imagesErrorMessage) {
        displayErrorToast(imagesErrorMessage);
        return;
      }

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

              <PostImagesInput
                disabled={isSubmitting}
                images={images}
                onAdd={addImages}
                onRemove={removeImage}
                uploadProgress={uploadProgress}
              />
            </ModalBody>

            <ModalFooter>
              <Button color={ButtonColor.secondary} onClick={close} text="Cancel" type={ButtonType.button} />
              <Button
                dirty={dirty || hasImageChanges}
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
