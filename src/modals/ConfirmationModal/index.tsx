import Button from 'components/Button';
import {ButtonColor} from 'components/Button/types';
import {ModalBody, ModalFooter} from 'components/Modal';
import {SFC} from 'types';

import * as S from './Styles';

export interface ConfirmationModalProps {
  cancelText?: string;
  close(): void;
  confirmText?: string;
  header: string;
  message: string;
  onConfirm(): void;
}

const ConfirmationModal: SFC<ConfirmationModalProps> = ({
  cancelText = 'Cancel',
  className,
  close,
  confirmText = 'Confirm',
  header,
  message,
  onConfirm,
}) => {
  return (
    <S.Modal className={className} close={close} header={header}>
      <ModalBody>
        <S.Message>{message}</S.Message>
      </ModalBody>
      <ModalFooter>
        <Button color={ButtonColor.secondary} onClick={close} text={cancelText} />
        <Button onClick={onConfirm} text={confirmText} />
      </ModalFooter>
    </S.Modal>
  );
};

export default ConfirmationModal;
