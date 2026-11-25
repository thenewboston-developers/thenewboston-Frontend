import {SFC} from 'types';

import * as S from './Styles';

interface ResignModalProps {
  isOpen: boolean;
  isResigning: boolean;
  isSpectator: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ResignModal: SFC<ResignModalProps> = ({isOpen, isResigning, isSpectator, onClose, onConfirm}) => {
  if (!isOpen || isSpectator) return null;

  return (
    <S.ConfirmationModal
      close={onClose}
      confirmText={isResigning ? 'Resigning...' : 'Resign'}
      header="Resign match"
      message="Are you sure you want to resign? This will end the match immediately."
      onConfirm={onConfirm}
    />
  );
};

export default ResignModal;
