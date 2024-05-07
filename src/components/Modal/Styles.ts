import styled, {keyframes} from 'styled-components';

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
  display: flex;
  font-weight: ${fonts.weight.bold};
  justify-content: space-between;
  margin-bottom: 20px;
  padding: 16px 24px 12px;
  position: relative;
  border-bottom: 1px solid #f1f1f1;
`;

export const Modal = styled.div`
  background: #fff;
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

export const Heading = styled.div`
  font-size: 20px;
  font-weight: 600;
`;
