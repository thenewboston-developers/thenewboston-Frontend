import {ChangeEvent, useEffect, useMemo, useState} from 'react';
import {useDispatch} from 'react-redux';

import {AppDispatch, Course, SFC} from 'types';
import {ToastType} from 'enums';
import {displayErrorToast, displayToast} from 'utils/toasts';
import {Field, Form, Formik} from 'formik';
import {FileInput} from 'components/FormElements';
import {PublicationStatus} from 'enums/publicationStatus';
import Button, {ButtonType} from 'components/Button';
import {createCourse, updateCourse} from 'dispatchers/courses';
import ImagePreview from 'components/ImagePreview';
import yup from 'utils/yup';
import * as S from './Styles';

export interface CourseModalProps {
  close(): void;
  course?: Course;
}

const CourseModal: SFC<CourseModalProps> = ({className, close, course}) => {
  const [previewThumbnail, setPreviewThumbnail] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();

  const initialValues = useMemo(
    () => ({
      description: course?.description || '',
      isPublished: course?.publication_status == PublicationStatus.PUBLISHED ? true : false,
      name: course?.name || '',
      thumbnail: course?.thumbnail || '',
    }),
    [course],
  );

  useEffect(() => {
    if (!initialValues.thumbnail) return;
    setPreviewThumbnail(initialValues.thumbnail);
  }, [initialValues]);

  const handleThumbnailChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onloadend = () => setPreviewThumbnail(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  type FormValues = typeof initialValues;

  const handleSubmit = async (values: FormValues): Promise<void> => {
    try {
      const requestData = new FormData();
      requestData.append('name', values.name);
      requestData.append('description', values.description);
      if (initialValues.thumbnail !== values.thumbnail) requestData.append('thumbnail', values.thumbnail);
      requestData.append(
        'publication_status',
        values.isPublished ? PublicationStatus.PUBLISHED : PublicationStatus.DRAFT,
      );

      if (course) {
        await dispatch(updateCourse(course.id, requestData));
        displayToast('Course updated successfully.', ToastType.SUCCESS);
      } else {
        await dispatch(createCourse(requestData));
        displayToast('Course created successfully.', ToastType.SUCCESS);
      }

      close();
    } catch (error) {
      console.error(error);
      displayErrorToast('Error updating/creating course');
    }
  };

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      description: yup.string().required('Description is required'),
      isPublished: yup.boolean(),
      name: yup.string().required('Name is required'),
      thumbnail: yup.mixed().required('Thumbnail is required'),
    });
  }, []);

  return (
    <S.Modal className={className} close={close} header={course ? 'Edit Course' : 'Add Course'}>
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
        {({dirty, errors, isSubmitting, setFieldValue, touched, isValid, values}) => (
          <Form>
            <S.Input errors={errors} label="Name" name="name" touched={touched} />
            <S.Input errors={errors} label="Description" name="description" touched={touched} />
            <S.ImageInput>
              {!values.thumbnail && (
                <Field component={FileInput} name="thumbnail" onChange={handleThumbnailChange} touched={touched} />
              )}
              <ImagePreview
                onClear={async () => {
                  await setFieldValue('thumbnail', '');
                  setPreviewThumbnail(null);
                }}
                src={previewThumbnail}
              />
            </S.ImageInput>
            <S.Checkbox errors={errors} label="Publish Course" name="isPublished" touched={touched} />
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

export default CourseModal;
