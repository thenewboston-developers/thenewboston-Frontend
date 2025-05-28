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
