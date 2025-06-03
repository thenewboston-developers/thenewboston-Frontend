import styled from 'styled-components';

import {Input as UInput} from 'components/FormElements';
import UModal from 'components/Modal';

export const Input = styled(UInput)`
  width: 100%;
`;

export const Label = styled.div`
  color: #666;
  font-size: 14px;
  margin-bottom: 8px;
`;

export const Modal = styled(UModal)`
  width: 360px;
`;
