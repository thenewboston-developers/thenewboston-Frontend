import styled from 'styled-components';

import UModal from 'components/Modal';
import {breakpoints} from 'styles';

export const Modal = styled(UModal)`
  display: flex;
  flex-direction: column;
  max-width: 500px;
  min-width: 480px;

  @media (max-width: ${breakpoints.mini}) {
    min-width: 90%;
    max-width: 100%;
  }
`;

export const RadioCardContainer = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;
