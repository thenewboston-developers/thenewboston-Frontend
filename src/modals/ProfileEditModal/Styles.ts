import styled from 'styled-components';

import UModal from 'components/Modal';
import {InlineInput as UInlineInput} from 'components/FormElements';

export const Bumper = styled.div`
  margin-bottom: 24px;
`;

export const FormField = styled.div`
  margin: 20px 0;
`;

export const FormLabel = styled.div`
  font-size: 12px;
  margin-bottom: 5px;
`;

export const FormTextInput = styled(UInlineInput)`
  width: 100%;
`;

export const Modal = styled(UModal)`
  width: 360px;
`;
