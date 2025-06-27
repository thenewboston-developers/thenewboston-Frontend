import styled, {css, keyframes} from 'styled-components';

import {colors, fonts} from 'styles';

export const IMG_HEIGHT = 36;

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

const smoothBounceOut = keyframes`
  0% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(0);
  }
`;

const radioCardStyle = css<{$isActive: boolean}>`
  align-items: center;
  border: 2px solid ${({$isActive}) => ($isActive ? colors.palette.blue[300] : colors.border)};
  border-radius: 4px;
  display: flex;
  flex: auto;
  justify-content: center;
  margin: 6px;
  padding: 16px;
  white-space: nowrap;

  &:hover {
    cursor: pointer;
  }
`;

export const CheckIcon = styled.div<{$isAnimating?: boolean; $isDeselecting?: boolean}>`
  align-items: center;
  background-color: ${colors.palette.green[600]};
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(76, 175, 80, 0.3);
  display: flex;
  height: 22px;
  justify-content: center;
  margin: 0 0 0 auto;
  opacity: ${(props) => {
    if (props.$isAnimating) return 0;
    if (props.$isDeselecting) return 1;
    return 1;
  }};
  width: 22px;

  ${(props) =>
    props.$isAnimating &&
    css`
      animation: ${smoothBounceIn} 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    `}

  ${(props) =>
    props.$isDeselecting &&
    css`
      animation: ${smoothBounceOut} 0.2s cubic-bezier(0.64, 0, 0.78, 0) forwards;
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
  padding: 12px 16px;
  position: relative;
  transition: all 0.3s ease;

  &:hover {
    background: ${colors.whiteHover};
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12);
  }
`;

export const CurrencyLogo = styled.img`
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: ${`${IMG_HEIGHT}px`};
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  width: ${`${IMG_HEIGHT}px`};
`;

export const Domain = styled.div`
  color: ${colors.palette.gray[600]};
  font-size: 11px;
  margin-top: 2px;
`;

export const DomainInfo = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
`;

export const ImageContainer = styled.div`
  align-items: center;
  display: flex;
  gap: 12px;
  justify-content: center;
`;

export const InternalBadge = styled.span`
  background: ${colors.palette.blue[100]};
  border-radius: 4px;
  color: ${colors.palette.blue[700]};
  font-size: 10px;
  font-weight: ${fonts.weight.semiBold};
  margin-top: 2px;
  padding: 2px 6px;
`;

export const Ticker = styled.div`
  color: #2c3e50;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -0.01em;
`;
