import styled from 'styled-components';

import {Textarea as UTextarea} from 'components/FormElements';
import UModal from 'components/Modal';
import {breakpoints, colors, markdownStyle} from 'styles';

export const Modal = styled(UModal)`
  width: 800px;

  @media (max-width: ${breakpoints.tablet}) {
    width: 90%;
  }

  @media (max-width: ${breakpoints.mobile}) {
    width: 95%;
  }
`;

export const PreviewContainer = styled.div`
  ${markdownStyle};
  background-color: ${colors.palette.gray[100]};
  border: 1px solid ${colors.palette.gray[300]};
  border-radius: 8px;
  height: 480px;
  overflow-y: auto;
  padding: 16px;

  @media (max-width: ${breakpoints.tablet}) {
    height: 400px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    height: 300px;
    padding: 12px;
  }
`;

export const TabsContainer = styled.div`
  margin-bottom: 16px;
`;

export const Textarea = styled(UTextarea)`
  height: 480px;
  min-height: 480px;
  width: 100%;

  @media (max-width: ${breakpoints.tablet}) {
    height: 400px;
    min-height: 400px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    height: 300px;
    min-height: 300px;
  }
`;
