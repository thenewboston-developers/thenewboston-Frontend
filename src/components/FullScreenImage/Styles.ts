import styled, {keyframes} from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const scaleIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

export const Container = styled.div`
  align-items: center;
  animation: ${fadeIn} 0.2s ease-out;
  cursor: pointer;
  display: flex;
  height: 100%;
  justify-content: center;
  width: 100%;
`;

export const Img = styled.img`
  animation: ${scaleIn} 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  cursor: default;
  max-height: 90vh;
  max-width: 90vw;
  object-fit: contain;
`;
