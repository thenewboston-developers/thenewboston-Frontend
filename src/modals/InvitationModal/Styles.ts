import styled from 'styled-components';

import UButton from 'components/Button';
import UModal from 'components/Modal';

export const FooterButton = styled(UButton)`
  min-width: 80px;
`;

export const Modal = styled(UModal)`
  display: flex;
  flex-direction: column;
  width: 360px;
`;

export const ModalContent = styled.div`
  padding: 0;
`;

export const ModalFooter = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 24px;
`;
