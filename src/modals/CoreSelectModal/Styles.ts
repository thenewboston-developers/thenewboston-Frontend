import styled from 'styled-components';

import UModal from 'components/Modal';

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
