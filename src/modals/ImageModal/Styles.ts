import ImagePreview from 'components/ImagePreview';
import styled, {keyframes} from 'styled-components';
import {colors} from 'styles';

const addOverlay = keyframes`
  from {
    background: rgba(0, 0, 0, 0);
  }
  to {
    background: rgba(44, 57, 103, 0.3);
  }
`;

export const Bumper = styled.div`
  margin-bottom: 24px;
`;

export const Modal = styled.div`
  border-radius: 20px;
  left: 50%;
  position: fixed;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export const Overlay = styled.div`
  animation: ${addOverlay} 0.3s forwards;
  height: 100vh;
  left: 0;
  position: fixed;
  top: 0;
  width: 100vw;
`;

export const ImagePreviewWrapper = styled.div`
  align-items: center;
  display: flex;
  height: 100vh;
  justify-content: center;
  width: 100vw;
  img {
    max-height: 600px;
    max-width: 700px;
  }
`;

export const ImagePreviewCustom = styled(ImagePreview)`
  align-items: center;
  backdrop-filter: blur(80px);
  display: flex;
  height: 100vh;
  justify-content: center;
  width: 100vw;
  &::before {
    background: ${colors.backgroundDark}
    opacity: 0.99;
    z-index: -1;
  }
`;
