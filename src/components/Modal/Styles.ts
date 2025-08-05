import styled, {keyframes} from 'styled-components';

import {fonts, modalBodyPadding} from 'styles';

const addOverlay = keyframes`
  from {
    background: rgba(0, 0, 0, 0);
  }
  to {
    background: rgba(44, 57, 103, 0.3);
  }
`;

export const Content = styled.div`
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
`;

export const Header = styled.div`
  align-items: center;
  border-bottom: 1px solid #f1f1f1;
  display: flex;
  font-weight: ${fonts.weight.bold};
  justify-content: space-between;
  padding: 12px 16px 10px;
  position: relative;
`;

export const Heading = styled.div`
  font-size: 20px;
  font-weight: 600;
`;

export const Modal = styled.div`
  background: #fff;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  left: 50%;
  position: fixed;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
`;

export const ModalBody = styled.div`
  ${modalBodyPadding};
`;

export const ModalFooter = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  padding: 8px 16px 12px;
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
