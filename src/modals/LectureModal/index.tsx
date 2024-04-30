import {useMemo} from 'react';
import {useDispatch} from 'react-redux';

import {AppDispatch, Lecture, SFC} from 'types';
import {ToastType} from 'enums';
import {displayToast, displayErrorToast} from 'utils/toasts';
import {Form, Formik} from 'formik';
import {PublicationStatus} from 'enums/publicationStatus';
import Button, {ButtonType} from 'components/Button';
import {createLecture, updateLecture} from 'dispatchers/lectures';
import yup from 'utils/yup';
import * as S from './Styles';

export interface LectureModalProps {
  course_id?: string;
  close(): void;
  lecture?: Lecture;
}

const LectureModal: SFC<LectureModalProps> = ({className, course_id, close, lecture}) => {
  const dispatch = useDispatch<AppDispatch>();
  const initialValues = useMemo(
    () => ({
      course_id: course_id,
      description: lecture?.description || '',
      name: lecture?.name || '',
      position: lecture?.position || '',
      publication_status: lecture?.publication_status == PublicationStatus.PUBLISHED ? true : false,
      thumbnail_url: lecture?.thumbnail_url || '',
      youtube_id: lecture?.youtube_id || '',
    }),
    [course_id, lecture],
  );

  type FormValues = typeof initialValues;
  const handleSubmit = async (values: FormValues): Promise<void> => {
    try {
      const requestData = new FormData();
      requestData.append('course_id', values?.course_id || '');
      requestData.append('description', values.description);
      requestData.append('name', values.name);
      requestData.append('position', String(values.position));
      requestData.append('publication_status', String(values.publication_status));
      requestData.append('thumbnail_url', values.thumbnail_url);
      requestData.append('youtube_id', values.youtube_id);

      if (lecture) {
        await dispatch(updateLecture(lecture.id, requestData));
        displayToast('Lecture updated successfully.', ToastType.SUCCESS);
      } else {
        await dispatch(createLecture(requestData));
        displayToast('Lecture created successfully.', ToastType.SUCCESS);
      }

      close();
    } catch (error) {
      console.error(error);
      displayErrorToast('Error updating/creating Lecture');
    }
  };

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      description: yup.string().required('Description is required'),
      name: yup.string().required('Name is required'),
      position: yup.number().positive('Ordering number must be a positive number'),
      publication_status: yup.boolean(),
      thumbnail_url: yup.mixed().required('Thumbnail URL is required'),
      youtube_id: yup.string().required('Youtube ID is required'),
    });
  }, []);

  return (
    <S.Modal className={className} close={close} header={lecture ? 'Edit Lecture' : 'Add Lecture'}>
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
        {({dirty, errors, isSubmitting, touched, isValid}) => (
          <Form>
            <S.Input errors={errors} label="Name" name="name" touched={touched} />
            <S.Input errors={errors} label="Description" name="description" touched={touched} />
            <S.Input errors={errors} label="Youtube ID" name="youtube_id" touched={touched} />
            <S.Input errors={errors} label="Thumbnail URL" name="thumbnail_url" touched={touched} />
            <S.Input errors={errors} label="Ordering Number" name="position" touched={touched} />
            <S.Checkbox errors={errors} label="Publish Lecture" name="publication_status" touched={touched} />
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

export default LectureModal;
