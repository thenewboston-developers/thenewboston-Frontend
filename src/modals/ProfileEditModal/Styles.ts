import styled from 'styled-components';

import UModal from 'components/Modal';
import {ModalContent as UModalContent} from 'components/Modal';
import {colors} from 'styles';

export const Modal = styled(UModal)`
  max-height: 90vh;
  width: 480px;
`;

export const ModalContent = styled(UModalContent)`
  max-height: calc(90vh - 200px);
  overflow-y: auto;
`;

export const Section = styled.div`
  & + & {
    border-top: 1px solid ${colors.palette.gray[200]};
    margin-top: 24px;
    padding-top: 24px;
  }
`;

export const SectionHeading = styled.h3`
  color: ${colors.palette.gray[900]};
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 16px;
`;
