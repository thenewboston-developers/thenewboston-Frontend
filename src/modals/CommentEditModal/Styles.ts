import styled from 'styled-components';

import {Textarea as UTextarea} from 'components/FormElements';
import UModal from 'components/Modal';

export const TextareaWrapper = styled.div`
  position: relative;
`;

export const Modal = styled(UModal)`
  width: 360px;
`;

export const Textarea = styled(UTextarea)`
  max-height: 350px;
  overflow-y: auto;
  padding-right: 43px;
`;
