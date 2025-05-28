import styled, {css} from 'styled-components';

import {ExchangeOrderType} from 'enums';
import {breakpoints, colors} from 'styles';

export const Container = styled.div`
  height: 100%;
  overflow-y: auto;
`;

export const OrdersList = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px;

  @media (max-width: ${breakpoints.mobile}) {
    padding: 16px;
  }
`;

export const OrderCard = styled.div`
  background: ${colors.white};
  border: 1px solid ${colors.border};
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  padding: 20px;
  transition: all 0.2s ease;
  margin-bottom: 8px;

  &:last-child {
    margin-bottom: 0;
  }

  &:hover {
    background: ${colors.whiteHover};
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12);
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 16px;
  }
`;

export const OrderHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 16px;
  align-items: start;
  margin-bottom: 12px;
`;

export const OrderMainInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const OrderTopLine = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`;

const buyMixin = css`
  color: ${colors.palette.green['600']};
`;

const sellMixin = css`
  color: ${colors.palette.red['700']};
`;

export const OrderTypeBadge = styled.div<{$orderType: ExchangeOrderType}>`
  ${({$orderType}) => {
    if ($orderType === ExchangeOrderType.BUY) return buyMixin;
    if ($orderType === ExchangeOrderType.SELL) return sellMixin;
    return;
  }}
  background-color: ${({$orderType}) =>
    $orderType === ExchangeOrderType.BUY ? colors.palette.green['600'] + '15' : colors.palette.red['700'] + '15'};
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  display: inline-flex;
  align-items: center;
`;

export const DateTime = styled.div`
  font-size: 13px;
  color: ${colors.secondary};
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const OrderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const OrderMetrics = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 12px;

  @media (min-width: ${breakpoints.mobile}) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const MetricItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const MetricLabel = styled.span`
  font-size: 11px;
  color: ${colors.secondary};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 600;
`;

export const MetricValue = styled.span`
  font-size: 15px;
  font-weight: 600;
  color: ${colors.primary};

  &.price {
    font-size: 16px;
    font-weight: 700;
  }
`;

export const CurrencyTicker = styled.span`
  font-size: 12px;
  color: ${colors.secondary};
  font-weight: 500;
  margin-left: 2px;
`;

export const FillProgress = styled.div`
  margin-top: 12px;
`;

export const ProgressHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
`;

export const ProgressLabel = styled.span`
  font-size: 12px;
  color: ${colors.secondary};
  font-weight: 600;
`;

export const ProgressValue = styled.span`
  font-size: 12px;
  color: ${colors.primary};
  font-weight: 600;
`;

export const ProgressBar = styled.div`
  height: 4px;
  background-color: ${colors.palette.gray['200']};
  border-radius: 2px;
  overflow: hidden;
  position: relative;
`;

export const ProgressFill = styled.div<{$percentage: number; $orderType: ExchangeOrderType}>`
  height: 100%;
  width: ${({$percentage}) => $percentage}%;
  background-color: ${({$orderType}) =>
    $orderType === ExchangeOrderType.BUY ? colors.palette.green['500'] : colors.palette.red['500']};
  transition: width 0.3s ease;
`;

export const FillStatusBadgeWrapper = styled.div`
  display: inline-flex;
  align-items: center;
`;

export const DropdownMenuWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  button {
    padding: 6px;
    border-radius: 6px;
    transition: all 0.15s ease;

    &:hover {
      background-color: ${colors.palette.gray['100']};
    }
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: ${colors.secondary};

  p {
    font-size: 14px;
    margin: 0;
  }
`;
