import {useState} from 'react';
import {useDispatch} from 'react-redux';

import {deleteCourse} from 'dispatchers/courses';
import {ToastType} from 'enums';
import {AppDispatch, SFC} from 'types';
import {displayErrorToast, displayToast} from 'utils/toasts';
import * as S from './Styles';

export interface CourseDeleteModalProps {
  courseId: number;
  close(): void;
}

const CourseDeleteModal: SFC<CourseDeleteModalProps> = ({className, courseId, close}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleButtonClick = async () => {
    setIsDeleting(true);
    try {
      await dispatch(deleteCourse(courseId));
      displayToast('Course deleted!', ToastType.SUCCESS);
      close();
    } catch (error) {
      console.error(error);
      displayErrorToast('Error deleting course');
      setIsDeleting(false);
    }
  };

  return (
    <S.Modal className={className} close={close} header="Warning">
      <div>Are you sure you want to delete this course?</div>
      <S.ButtonContainer>
        <S.Button onClick={handleButtonClick} text={isDeleting ? 'Deleting...' : 'Yes'} disabled={isDeleting} />
      </S.ButtonContainer>
    </S.Modal>
  );
};

export default CourseDeleteModal;
