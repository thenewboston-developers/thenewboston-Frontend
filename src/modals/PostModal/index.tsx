import {ChangeEvent, useEffect, useMemo, useState} from 'react';
import {useDispatch} from 'react-redux';
import {Form, Formik} from 'formik';

import Button from 'components/Button';
import {ButtonColor, ButtonType} from 'components/Button/types';
import EmojiBox from 'components/EmojiPicker';
import {FileInput} from 'components/FormElements';
import ImagePreview from 'components/ImagePreview';
import {ModalContent, ModalFooter, ModalFooterButton} from 'components/Modal';
import {createPost, updatePost} from 'dispatchers/posts';
import {ToastType} from 'enums';
import {AppDispatch, Post, SFC} from 'types';
import {displayErrorToast, displayToast} from 'utils/toasts';
import yup from 'utils/yup';

import * as S from './Styles';

export interface PostModalProps {
  close(): void;
  post?: Post;
}

const PostModal: SFC<PostModalProps> = ({className, close, post}) => {
  const dispatch = useDispatch<AppDispatch>();

  const [preview, setPreview] = useState<string | null>(null);

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

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (values: FormValues): Promise<void> => {
    try {
      const requestData = new FormData();
      requestData.append('content', values.content);

      if (post) {
        // For updates, handle image changes
        if (!values.image && initialValues.image) {
          // Image was cleared - use the new clear_image field
          requestData.append('clear_image', 'true');
        } else if (values.image && values.image !== initialValues.image) {
          // New image was selected
          requestData.append('image', values.image);
        }
        // Otherwise, image remains unchanged (don't send)

        await dispatch(updatePost(post.id, requestData));
        displayToast('Post updated!', ToastType.SUCCESS);
      } else {
        // For new posts, add image if present
        if (values.image) {
          requestData.append('image', values.image);
        }
        await dispatch(createPost(requestData));
        displayToast('Post created!', ToastType.SUCCESS);
      }

      close();
    } catch (error) {
      const verb = post ? 'updating' : 'creating';
      displayErrorToast(`Error ${verb} post`);
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
            <ModalContent>
              <S.TextareaContainer>
                <S.Textarea errors={errors} label="Content" name="content" touched={touched} />
                <EmojiBox field="content" setFieldValue={setFieldValue} value={values.content} />
              </S.TextareaContainer>

              {!values.image && (
                <S.FileInputWrapper>
                  <FileInput errors={errors} name="image" onChange={handleFileChange} touched={touched} />
                </S.FileInputWrapper>
              )}
              <ImagePreview
                onClear={async () => {
                  await setFieldValue('image', '');
                  setPreview(null);
                }}
                src={preview}
              />
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

export default PostModal;
