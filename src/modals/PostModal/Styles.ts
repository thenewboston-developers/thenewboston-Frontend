import styled from 'styled-components';

import {Textarea as UTextarea} from 'components/FormElements';
import UModal from 'components/Modal';

export const FileInputWrapper = styled.div`
  margin-bottom: 12px;
  margin-top: 16px;
`;

export const Modal = styled(UModal)`
  width: 360px;
`;

export const Textarea = styled(UTextarea)`
  max-height: 350px;
  overflow-y: auto;
  padding-right: 43px;
`;

export const TextareaContainer = styled.div`
  position: relative;
`;
