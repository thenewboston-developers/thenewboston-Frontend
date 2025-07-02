import styled, {keyframes} from 'styled-components';

import UFullScreenImage from 'components/FullScreenImage';
import {colors} from 'styles';

const addOverlay = keyframes`
  from {
    background: rgba(0, 0, 0, 0);
  }
  to {
    background: rgba(0, 0, 0, 0.8);
  }
`;

export const FullScreenImage = styled(UFullScreenImage)`
  align-items: center;
  backdrop-filter: blur(80px);
  -webkit-backdrop-filter: blur(80px); /* webkit prefix for Safari */
  display: flex;
  height: 100vh;
  justify-content: center;
  width: 100vw;
  z-index: 1001;

  &::before {
    background: ${colors.backgroundDark};
    content: '';
    height: 100%;
    left: 0;
    opacity: 0.99;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: -1;
  }
`;

export const Modal = styled.div`
  left: 50%;
  position: fixed;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
`;

export const Overlay = styled.div`
  animation: ${addOverlay} 0.3s forwards;
  height: 100vh;
  left: 0;
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 999;
`;
