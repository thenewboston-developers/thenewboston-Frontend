import styled from 'styled-components';

import {Input as UInput, Textarea as UTextarea} from 'components/FormElements';
import UModal, {ModalContent as UModalContent, ModalFooter as UModalFooter} from 'components/Modal';
import {Content} from 'components/Modal/Styles';
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

  ${Content} {
    padding: 0;
  }
`;

export const ModalContent = styled(UModalContent)`
  max-height: calc(80vh - 200px);
  overflow-y: auto;
  padding: 0 24px 32px;

  @media (max-width: ${breakpoints.mobile}) {
    padding: 0 16px 24px;
  }
`;

export const ModalFooter = styled(UModalFooter)`
  padding: 0 24px 24px;

  @media (max-width: ${breakpoints.mobile}) {
    padding: 0 16px 16px;
  }
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
