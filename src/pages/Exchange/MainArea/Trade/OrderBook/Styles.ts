import styled from 'styled-components';

import {breakpoints, colors} from 'styles';

export const Box = styled.div`
  background-color: ${colors.white};
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  padding: 20px;
  width: 100%;

  @media (max-width: ${breakpoints.mobile}) {
    padding: 16px;
  }

  h2 {
    color: ${colors.primary};
    font-size: 20px;
    font-weight: 700;
    margin: 0 0 20px 0;
  }
`;

export const ColumnHeader = styled.span`
  color: ${colors.secondary};
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;

  &:nth-child(2),
  &:nth-child(3) {
    text-align: right;
  }
`;

export const ColumnHeaders = styled.div`
  background-color: ${colors.palette.gray['100']};
  border-radius: 6px;
  display: grid;
  gap: 12px;
  grid-template-columns: 1fr 1fr 1fr;
  margin-bottom: 8px;
  padding: 8px 12px;

  @media (max-width: ${breakpoints.mobile}) {
    gap: 8px;
    padding: 6px 8px;
  }
`;

export const Container = styled.div`
  margin-bottom: 24px;
  margin-top: 16px;
`;

export const EmptyState = styled.div`
  color: ${colors.secondary};
  font-size: 14px;
  padding: 40px 20px;
  text-align: center;
`;

export const OrderBookContainer = styled.div`
  display: grid;
  gap: 24px;
  grid-template-columns: 1fr 1fr;

  @media (max-width: ${breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

export const OrderCount = styled.span`
  color: ${colors.secondary};
  font-size: 12px;
  font-weight: 500;
`;

export const OrderList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const OrderPrice = styled.span<{$type: 'buy' | 'sell'}>`
  color: ${({$type}) => ($type === 'buy' ? colors.palette.green['600'] : colors.palette.red['700'])};
  font-size: 14px;
  font-weight: 600;
`;

export const OrderQuantity = styled.span`
  color: ${colors.primary};
  font-size: 14px;
  font-weight: 500;
  text-align: right;
`;

export const OrderRow = styled.div<{$type: 'buy' | 'sell'}>`
  border-radius: 6px;
  cursor: pointer;
  display: grid;
  gap: 12px;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 8px 12px;
  position: relative;
  transition: background-color 0.15s ease;

  &:hover {
    background-color: ${({$type}) =>
      $type === 'buy' ? colors.palette.green['600'] + '10' : colors.palette.red['700'] + '10'};
  }

  @media (max-width: ${breakpoints.mobile}) {
    gap: 8px;
    padding: 6px 8px;
  }
`;

export const OrderSection = styled.div``;

export const OrderTotal = styled.span`
  color: ${colors.secondary};
  font-size: 14px;
  font-weight: 500;
  text-align: right;
`;

export const SectionHeader = styled.div`
  align-items: center;
  border-bottom: 1px solid ${colors.border};
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
  padding-bottom: 8px;
`;

export const SectionTitle = styled.h3<{$type: 'buy' | 'sell'}>`
  color: ${({$type}) => ($type === 'buy' ? colors.palette.green['600'] : colors.palette.red['700'])};
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.05em;
  margin: 0;
  text-transform: uppercase;
`;

export const Spread = styled.div`
  align-items: center;
  background-color: ${colors.palette.gray['100']};
  border-radius: 6px;
  display: flex;
  gap: 12px;
  justify-content: center;
  margin: 16px 0;
  padding: 12px;

  @media (max-width: ${breakpoints.tablet}) {
    margin: 12px 0;
  }
`;

export const SpreadLabel = styled.span`
  color: ${colors.secondary};
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
`;

export const SpreadValue = styled.span`
  color: ${colors.primary};
  font-size: 14px;
  font-weight: 700;
`;

export const Tooltip = styled.div`
  animation: fadeIn 0.2s ease-in;
  background-color: ${colors.primary};
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
