import styled from 'styled-components';

import {colors} from 'styles';

export const Tooltip = styled.div`
  animation: fadeIn 0.3s ease-out;
  background: ${colors.primary};
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  left: 50%;
  padding: 12px 16px;
  position: absolute;
  top: -10px;
  transform: translate(-50%, -100%);
  white-space: nowrap;
  z-index: 1000;

  &::after {
    border-color: ${colors.primary} transparent transparent transparent;
    border-style: solid;
    border-width: 6px 6px 0 6px;
    bottom: -6px;
    content: '';
    left: 50%;
    position: absolute;
    transform: translateX(-50%);
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translate(-50%, -95%);
    }
    to {
      opacity: 1;
      transform: translate(-50%, -100%);
    }
  }
`;

export const TooltipContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 250px;
`;

export const TooltipLabel = styled.span`
  color: ${colors.palette.gray['400']};
  font-size: 12px;
  font-weight: 500;
  min-width: 100px;
`;

export const TooltipRow = styled.div`
  align-items: center;
  display: flex;
  gap: 12px;
  justify-content: space-between;
`;

export const TooltipValue = styled.span<{$type?: 'buy' | 'sell'}>`
  color: ${({$type}) => {
    if ($type === 'buy') return colors.palette.green['300'];
    if ($type === 'sell') return colors.palette.red['300'];
    return colors.white;
  }};
  font-size: 13px;
  font-weight: 600;
  text-align: right;
`;
