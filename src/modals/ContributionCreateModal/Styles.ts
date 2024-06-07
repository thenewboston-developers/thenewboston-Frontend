import styled from 'styled-components';

import {Checkbox as UCheckbox, Input as UInput} from 'components/FormElements';
import UModal from 'components/Modal';

export const Input = styled(UInput)`
  width: 100%;
`;

export const ImageInput = styled.div`
  width: 100%;
  margin-bottom: 16px;
`;

export const Checkbox = styled(UCheckbox)``;

export const Modal = styled(UModal)`
  width: 360px;
`;
