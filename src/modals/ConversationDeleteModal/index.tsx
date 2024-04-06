import {useDispatch} from 'react-redux';

import {deleteConversation} from 'dispatchers/conversations';
import {ToastType} from 'enums';
import {AppDispatch, SFC} from 'types';
import {displayErrorToast, displayToast} from 'utils/toasts';
import * as S from './Styles';

export interface ConversationDeleteModalProps {
  close(): void;
  conversationId: number;
}

const ConversationDeleteModal: SFC<ConversationDeleteModalProps> = ({className, close, conversationId}) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleButtonClick = async () => {
    try {
      await dispatch(deleteConversation(conversationId));
      displayToast('Conversation deleted!', ToastType.SUCCESS);
      close();
    } catch (error) {
      console.error(error);
      displayErrorToast('Error deleting conversation');
    }
  };

  return (
    <S.Modal className={className} close={close} header="Warning">
      <div>Are you sure you want to delete this conversation?</div>
      <S.ButtonContainer>
        <S.Button onClick={handleButtonClick} text="Yes" />
      </S.ButtonContainer>
    </S.Modal>
  );
};

export default ConversationDeleteModal;
