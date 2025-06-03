import styled from 'styled-components';

import UButton from 'components/Button';
import {Input as UInput} from 'components/FormElements';
import UModal from 'components/Modal';

export const FooterButton = styled(UButton)`
  min-width: 80px;
`;

export const Input = styled(UInput)`
  width: 100%;
`;

export const Label = styled.div`
  color: #666;
  font-size: 14px;
  margin-bottom: 8px;
`;

export const Modal = styled(UModal)`
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
