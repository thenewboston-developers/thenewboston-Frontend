import styled, {css, keyframes} from 'styled-components';

import {colors, radioCardStyle} from 'styles';

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

export const CheckIcon = styled.div<{$isAnimating?: boolean}>`
  align-items: center;
  background-color: ${colors.palette.green[600]};
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(76, 175, 80, 0.3);
  display: flex;
  height: 22px;
  justify-content: center;
  margin: 0 0 0 auto;
  opacity: ${(props) => (props.$isAnimating ? 0 : 1)};
  width: 22px;

  ${(props) =>
    props.$isAnimating &&
    css`
      animation: ${smoothBounceIn} 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    `}

  svg {
    color: ${colors.white};
  }
`;

export const Container = styled.div<{$isActive: boolean; $isAnimating?: boolean}>`
  ${radioCardStyle};
  background: ${(props) => {
    if (props.$isAnimating) return colors.whiteHover;
    if (props.$isActive) return colors.whiteHover;
    return colors.white;
  }};
  border: 1px solid ${colors.border};
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  gap: 8px;
  justify-content: flex-start;
  padding: 16px 20px;
  position: relative;
  transition: all 0.2s ease;

  &:hover {
    background: ${colors.whiteHover};
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12);
  }
`;

export const Image = styled.img`
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: ${`${IMG_HEIGHT}px`};
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  width: ${`${IMG_HEIGHT}px`};
`;

export const ImageContainer = styled.div`
  align-items: center;
  display: flex;
  gap: 12px;
  justify-content: center;
`;

export const Title = styled.div`
  color: #2c3e50;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -0.01em;
`;
