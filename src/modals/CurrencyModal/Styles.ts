import styled from 'styled-components';

import {Input as UInput, Textarea as UTextarea} from 'components/FormElements';
import UModal, {ModalBody as UModalBody} from 'components/Modal';
import {breakpoints, colors} from 'styles';

export const Input = styled(UInput)`
  width: 100%;
`;

export const Modal = styled(UModal)`
  max-height: 80vh;
  width: 680px;

  @media (max-width: ${breakpoints.mobile}) {
    width: 95%;
  }
`;

export const ModalBody = styled(UModalBody)`
  max-height: calc(80vh - 200px);
  overflow-y: auto;
`;

export const Section = styled.div`
  & + & {
    border-top: 1px solid ${colors.palette.gray[200]};
    margin-top: 24px;
    padding-top: 24px;

    @media (max-width: ${breakpoints.mobile}) {
      margin-top: 20px;
      padding-top: 20px;
    }
  }
`;

export const SectionHeading = styled.h3`
  color: ${colors.palette.gray[900]};
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 16px;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 14px;
    margin: 0 0 12px;
  }
`;

export const SocialMediaGrid = styled.div`
  display: grid;
  gap: 0 24px;
  grid-template-columns: 1fr 1fr;

  @media (max-width: ${breakpoints.mobile}) {
    gap: 0 16px;
  }

  @media (max-width: ${breakpoints.mini}) {
    grid-template-columns: 1fr;
  }
`;

export const Textarea = styled(UTextarea)`
  width: 100%;
`;
