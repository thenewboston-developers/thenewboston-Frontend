import styled from 'styled-components';

import {Input as UInput, Textarea as UTextarea} from 'components/FormElements';
import UModal from 'components/Modal';
import {ModalContent as UModalContent, ModalFooter as UModalFooter} from 'components/Modal';
import {Content} from 'components/Modal/Styles';
import {colors} from 'styles';

export const Input = styled(UInput)`
  width: 360px;
`;

export const Modal = styled(UModal)`
  max-height: 90vh;
  width: 520px;

  ${Content} {
    padding: 0;
  }
`;

export const ModalContent = styled(UModalContent)`
  max-height: calc(90vh - 200px);
  overflow-y: auto;
  padding: 0 24px 32px;
`;

export const ModalFooter = styled(UModalFooter)`
  padding: 0 24px 24px;
`;

export const SectionHeading = styled.h3`
  border-top: 1px solid ${colors.palette.gray[200]};
  color: ${colors.palette.gray[900]};
  font-size: 16px;
  font-weight: 600;
  margin: 24px 0 16px;
  padding-top: 24px;
`;

export const Textarea = styled(UTextarea)`
  width: 360px;
`;
