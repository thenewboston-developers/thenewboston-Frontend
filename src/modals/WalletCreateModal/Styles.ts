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
  max-width: 500px;
  min-width: 480px;
`;

export const RadioCardContainer = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;
