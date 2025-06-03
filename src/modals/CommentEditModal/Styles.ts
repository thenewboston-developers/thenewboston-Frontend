import styled from 'styled-components';

import UButton from 'components/Button';
import {Textarea as UTextarea} from 'components/FormElements';
import UModal from 'components/Modal';

export const Div = styled.div`
  position: relative;
`;

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

export const Textarea = styled(UTextarea)`
  max-height: 350px;
  overflow-y: auto;
  padding-right: 43px;
`;
