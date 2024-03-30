import React, {ChangeEvent, useEffect, useMemo, useState} from 'react';
import {useDispatch} from 'react-redux';
import {Field, Form, Formik} from 'formik';

import Button, {ButtonType} from 'components/Button';
import {FileInput, Textarea} from 'components/FormElements';
import ImagePreview from 'components/ImagePreview';
import {createPost, updatePost} from 'dispatchers/posts';
import {ToastType} from 'enums';
import {AppDispatch, Post, SFC} from 'types';
import {displayErrorToast, displayToast} from 'utils/toast';
import yup from 'utils/yup';
import * as S from './Styles';

export interface PostModalProps {
  close(): void;
  post?: Post;
}

const PostModal: SFC<PostModalProps> = ({className, close, post}) => {
  const [isImageCleared, setIsImageCleared] = useState<boolean | null>(null);
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

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
      setIsImageCleared(false);
    }
  };

  const handleSubmit = async (values: FormValues): Promise<void> => {
    try {
      const requestData = new FormData();
      requestData.append('content', values.content);
      requestData.append('is_image_cleared', isImageCleared ? 'True' : 'False');

      if (initialValues.image !== values.image) requestData.append('image', values.image);

      if (post) {
        await dispatch(updatePost(post.id, requestData));
        displayToast('Post updated!', ToastType.SUCCESS);
      } else {
        await dispatch(createPost(requestData));
        displayToast('Post created!', ToastType.SUCCESS);
      }

      close();
    } catch (error) {
      console.error(error);
      const verb = post ? 'updating' : 'creating';
      displayErrorToast(`Error ${verb} post`);
    }
  };

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      content: yup.string().required(),
    });
  }, []);

  return (
    <S.Modal className={className} close={close} header={post ? 'Edit Post' : 'Add Post'}>
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
        {({dirty, errors, isSubmitting, isValid, setFieldValue, touched, values}) => (
          <Form>
            <Textarea errors={errors} label="Content" name="content" touched={touched} />
            {!values.image && (
              <Field component={FileInput} name="image" onChange={handleFileChange} touched={touched} />
            )}
            <ImagePreview
              onClear={async () => {
                await setFieldValue('image', '');
                setPreview(null);
                setIsImageCleared(true);
              }}
              src={preview}
            />
            <S.Bumper />
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

export default PostModal;
