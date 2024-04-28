import {useState} from 'react';
import {useDispatch} from 'react-redux';

import {deleteLecture} from 'dispatchers/lectures';
import {ToastType} from 'enums';
import {AppDispatch, SFC} from 'types';
import {displayErrorToast, displayToast} from 'utils/toasts';
import * as S from './Styles';

export interface LectureDeleteModalProps {
  lectureId: number;
  close(): void;
}

const LectureDeleteModal: SFC<LectureDeleteModalProps> = ({className, close, lectureId}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleButtonClick = async () => {
    setIsDeleting(true);
    try {
      await dispatch(deleteLecture(lectureId));
      displayToast('Lecture deleted!', ToastType.SUCCESS);
      close();
    } catch (error) {
      console.error(error);
      displayErrorToast('Error deleting lecture');
      setIsDeleting(false);
    }
  };

  return (
    <S.Modal className={className} close={close} header="Warning">
      <div>Are you sure you want to delete this lecture?</div>
      <S.ButtonContainer>
        <S.Button onClick={handleButtonClick} text={isDeleting ? 'Deleting...' : 'Yes'} disabled={isDeleting} />
      </S.ButtonContainer>
    </S.Modal>
  );
};

export default LectureDeleteModal;
