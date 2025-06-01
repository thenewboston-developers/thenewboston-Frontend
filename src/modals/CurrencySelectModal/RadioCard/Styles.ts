import styled, {css, keyframes} from 'styled-components';

import {radioCardStyle} from 'styles';

export const IMG_HEIGHT = 32;

const smoothBounceIn = keyframes`
  0% {
    opacity: 0;
    transform: scale(0);
  }
  50% {
    opacity: 1;
    transform: scale(1.1);
  }
  70% {
    transform: scale(0.95);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

export const Container = styled.div<{$isActive: boolean; $isAnimating?: boolean}>`
  ${radioCardStyle};
  position: relative;
  background-color: ${(props) => {
    if (props.$isAnimating) return '#f3f5f7';
    if (props.$isActive) return '#f3f5f7';
    return '#ffffff';
  }};
  border-radius: 16px;
  gap: 8px;
  padding: 16px 20px;
  justify-content: flex-start;
  transition: all 0.2s ease;
  box-shadow: ${(props) =>
    props.$isActive
      ? '0 4px 12px rgba(98, 135, 177, 0.15), 0 2px 4px rgba(98, 135, 177, 0.1)'
      : '0 2px 8px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04)'};
  border: 2px solid ${(props) => (props.$isActive ? '#e3ecf3' : 'transparent')};

  &:hover {
    box-shadow: ${(props) =>
      props.$isActive
        ? '0 6px 16px rgba(98, 135, 177, 0.2), 0 3px 6px rgba(98, 135, 177, 0.12)'
        : '0 4px 12px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.06)'};
    background-color: ${(props) => {
      if (props.$isAnimating) return '#f3f5f7';
      if (props.$isActive) return '#eef1f4';
      return '#fafbfc';
    }};
  }
`;

export const Img = styled.img`
  border-radius: 50%;
  height: ${`${IMG_HEIGHT}px`};
  width: ${`${IMG_HEIGHT}px`};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
`;

export const ImageContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  gap: 12px;
`;

export const Title = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #2c3e50;
  letter-spacing: -0.01em;
`;

export const CheckIcon = styled.div<{$isAnimating?: boolean}>`
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background-color: #4caf50;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 0 0 auto;
  color: white;
  font-size: 14px;
  font-weight: bold;
  opacity: ${(props) => (props.$isAnimating ? 0 : 1)};
  box-shadow: 0 2px 4px rgba(76, 175, 80, 0.3);

  ${(props) =>
    props.$isAnimating &&
    css`
      animation: ${smoothBounceIn} 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    `}

  &::after {
    content: '✔';
    font-size: 12px;
    line-height: 1;
  }
`;
