import {useDispatch} from 'react-redux';

import {deleteMessage} from 'dispatchers/messages';
import {ToastType} from 'enums';
import {AppDispatch, SFC} from 'types';
import {displayErrorToast, displayToast} from 'utils/toasts';
import * as S from './Styles';

export interface MessageDeleteModalProps {
  close(): void;
  messageId: number;
}

const MessageDeleteModal: SFC<MessageDeleteModalProps> = ({className, close, messageId}) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleButtonClick = async () => {
    try {
      await dispatch(deleteMessage(messageId));
      displayToast('Message deleted!', ToastType.SUCCESS);
      close();
    } catch (error) {
      console.error(error);
      displayErrorToast('Error deleting message');
    }
  };

  return (
    <S.Modal className={className} close={close} header="Warning">
      <div>Are you sure you want to delete this message?</div>
      <S.ButtonContainer>
        <S.Button onClick={handleButtonClick} text="Yes" />
      </S.ButtonContainer>
    </S.Modal>
  );
};

export default MessageDeleteModal;
