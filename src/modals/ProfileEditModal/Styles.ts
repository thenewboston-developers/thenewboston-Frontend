import styled from 'styled-components';

import UModal from 'components/Modal';

export const Bumper = styled.div`
  margin-bottom: 24px;
`;

export const Modal = styled(UModal)`
  width: 360px;
  display: flex;
  justify-content: center;
  align-items: center;

  /* Optional: Set max-width to prevent image from overflowing */
  img {
    width: 100%;
    height: auto; /* Maintain aspect ratio */
`;
