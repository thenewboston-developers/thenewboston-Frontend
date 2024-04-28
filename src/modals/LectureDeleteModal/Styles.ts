import styled from 'styled-components';

import UButton from 'components/Button';
import UModal from 'components/Modal';

export const Button = styled(UButton)`
  width: 100%;
`;

export const ButtonContainer = styled.div`
  margin-top: 16px;
`;

export const Modal = styled(UModal)`
  display: flex;
  flex-direction: column;
  width: 360px;
  z-index: 20;
`;
