import styled, {keyframes} from 'styled-components';
import PostImagePreview from 'components/PostImagePreview';

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
  background: rgba(0, 0, 0, 0);
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

export const ImagePreviewCustom = styled(PostImagePreview)`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(64, 64, 64, 0.9);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
`;
