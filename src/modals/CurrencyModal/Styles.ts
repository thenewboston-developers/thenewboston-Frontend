import styled from 'styled-components';

import {Input as UInput, Textarea as UTextarea} from 'components/FormElements';
import UModal from 'components/Modal';

export const FormField = styled.div`
  margin-bottom: 24px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const Input = styled(UInput)`
  width: 360px;
`;

export const Modal = styled(UModal)``;

export const Textarea = styled(UTextarea)`
  width: 360px;
`;
