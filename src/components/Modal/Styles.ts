import styled, {keyframes} from 'styled-components';

import UButton from 'components/Button';
import {fonts} from 'styles';

const addOverlay = keyframes`
  from {
    background: rgba(0, 0, 0, 0);
  }
  to {
    background: rgba(44, 57, 103, 0.3);
  }
`;

export const Content = styled.div`
  padding: 0 24px 32px;
`;

export const Header = styled.div`
  align-items: center;
  border-bottom: 1px solid #f1f1f1;
  display: flex;
  font-weight: ${fonts.weight.bold};
  justify-content: space-between;
  margin-bottom: 20px;
  padding: 16px 24px 12px;
  position: relative;
`;

export const Heading = styled.div`
  font-size: 20px;
  font-weight: 600;
`;

export const Modal = styled.div`
  background: #fff;
  border-radius: 20px;
  left: 50%;
  position: fixed;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export const ModalContent = styled.div``;

export const ModalFooter = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 24px;
`;

export const ModalFooterButton = styled(UButton)`
  min-width: 80px;
`;

export const Overlay = styled.div`
  animation: ${addOverlay} 0.3s forwards;
  height: 100vh;
  left: 0;
  position: fixed;
  top: 0;
  width: 100vw;
`;
