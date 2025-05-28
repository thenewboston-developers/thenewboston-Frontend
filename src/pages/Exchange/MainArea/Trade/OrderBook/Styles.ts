import styled from 'styled-components';

import {breakpoints, colors} from 'styles';

export const Container = styled.div`
  margin-top: 16px;
  margin-bottom: 24px;
`;

export const Box = styled.div`
  background-color: ${colors.white};
  width: 100%;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  padding: 20px;

  @media (max-width: ${breakpoints.mobile}) {
    padding: 16px;
  }

  h2 {
    font-size: 18px;
    font-weight: 700;
    color: ${colors.primary};
    margin: 0 0 16px 0;
  }
`;

export const OrderBookContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;

  @media (max-width: ${breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

export const OrderSection = styled.div``;

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid ${colors.border};
`;

export const SectionTitle = styled.h3<{$type: 'buy' | 'sell'}>`
  font-size: 14px;
  font-weight: 600;
  margin: 0;
  color: ${({$type}) => ($type === 'buy' ? colors.palette.green['600'] : colors.palette.red['700'])};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const OrderCount = styled.span`
  font-size: 12px;
  color: ${colors.secondary};
  font-weight: 500;
`;

export const ColumnHeaders = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 12px;
  padding: 8px 12px;
  background-color: ${colors.palette.gray['100']};
  border-radius: 6px;
  margin-bottom: 8px;

  @media (max-width: ${breakpoints.mobile}) {
    padding: 6px 8px;
    gap: 8px;
  }
`;

export const ColumnHeader = styled.span`
  font-size: 11px;
  font-weight: 600;
  color: ${colors.secondary};
  text-transform: uppercase;
  letter-spacing: 0.05em;

  &:nth-child(2),
  &:nth-child(3) {
    text-align: right;
  }
`;

export const OrderList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const OrderRow = styled.div<{$type: 'buy' | 'sell'}>`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 12px;
  padding: 8px 12px;
  border-radius: 6px;
  transition: background-color 0.15s ease;
  cursor: pointer;

  &:hover {
    background-color: ${({$type}) =>
      $type === 'buy' ? colors.palette.green['600'] + '10' : colors.palette.red['700'] + '10'};
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 6px 8px;
    gap: 8px;
  }
`;

export const OrderPrice = styled.span<{$type: 'buy' | 'sell'}>`
  font-size: 14px;
  font-weight: 600;
  color: ${({$type}) => ($type === 'buy' ? colors.palette.green['600'] : colors.palette.red['700'])};
`;

export const OrderQuantity = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: ${colors.primary};
  text-align: right;
`;

export const OrderTotal = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: ${colors.secondary};
  text-align: right;
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: ${colors.secondary};
  font-size: 14px;
`;

export const Spread = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  padding: 12px;
  margin: 16px 0;
  background-color: ${colors.palette.gray['100']};
  border-radius: 6px;

  @media (max-width: ${breakpoints.tablet}) {
    margin: 12px 0;
  }
`;

export const SpreadLabel = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: ${colors.secondary};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const SpreadValue = styled.span`
  font-size: 14px;
  font-weight: 700;
  color: ${colors.primary};
`;
