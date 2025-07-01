import styled from 'styled-components';

import UModal, {ModalContent as UModalContent, ModalFooter as UModalFooter} from 'components/Modal';
import {Content} from 'components/Modal/Styles';
import {colors} from 'styles';

export const Modal = styled(UModal)`
  max-height: 90vh;
  width: 680px;

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

export const SocialMediaGrid = styled.div`
  display: grid;
  gap: 0 24px;
  grid-template-columns: 1fr 1fr;
`;

export const ErrorMessage = styled.div`
  color: ${colors.palette.red[400]};
  font-size: 12px;
  margin-top: 6px;
`;
