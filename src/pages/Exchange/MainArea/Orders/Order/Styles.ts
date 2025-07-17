import styled, {css} from 'styled-components';

import {breakpoints, colors} from 'styles';

const buyMixin = css`
  color: ${colors.palette.green[600]};
`;

const sellMixin = css`
  color: ${colors.palette.red[700]};
`;

export const Actions = styled.div`
  align-items: center;
  display: flex;
  gap: 8px;
`;

export const Container = styled.div`
  background: ${colors.white};
  border: 1px solid ${colors.border};
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  margin-bottom: 12px;
  padding: 20px;
  transition: all 0.2s ease;

  &:hover {
    background: ${colors.whiteHover};
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12);
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 16px;
  }
`;

export const CurrencyTicker = styled.span`
  color: ${colors.secondary};
  font-size: 12px;
  font-weight: 500;
  margin-left: 2px;
`;

export const DateTime = styled.div`
  align-items: center;
  color: ${colors.secondary};
  display: flex;
  font-size: 13px;
  gap: 6px;
`;

export const DropdownMenuWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;

  button {
    border-radius: 6px;
    padding: 6px;
    transition: all 0.15s ease;

    &:hover {
      background-color: ${colors.palette.gray[100]};
    }
  }
`;

export const FillProgress = styled.div`
  margin-top: 12px;
`;

export const FillStatusBadgeWrapper = styled.div`
  align-items: center;
  display: inline-flex;
`;

export const Header = styled.div`
  align-items: start;
  display: grid;
  gap: 16px;
  grid-template-columns: 1fr auto;
  margin-bottom: 12px;
`;

export const MainInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const MetricItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const MetricLabel = styled.span`
  color: ${colors.secondary};
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
`;

export const MetricValue = styled.span`
  color: ${colors.primary};
  font-size: 15px;
  font-weight: 600;

  &.price {
    font-size: 16px;
    font-weight: 700;
  }
`;

export const Metrics = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(2, 1fr);
  margin-bottom: 12px;

  @media (min-width: ${breakpoints.mobile}) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const ProgressBar = styled.div`
  background-color: ${colors.palette.gray[200]};
  border-radius: 2px;
  height: 4px;
  overflow: hidden;
  position: relative;
`;

export const ProgressFill = styled.div<{$percentage: number; $orderType: string}>`
  background-color: ${({$orderType}) => ($orderType === 'BUY' ? colors.palette.green[500] : colors.palette.blue[500])};
  height: 100%;
  transition: width 0.3s ease;
  width: ${({$percentage}) => $percentage}%;
`;

export const ProgressHeader = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 6px;
`;

export const ProgressLabel = styled.span`
  color: ${colors.secondary};
  font-size: 12px;
  font-weight: 600;
`;

export const ProgressValue = styled.span`
  color: ${colors.primary};
  font-size: 12px;
  font-weight: 600;
`;

export const TopLine = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

export const TypeBadge = styled.div<{$orderType: string}>`
  ${({$orderType}) => {
    if ($orderType === 'BUY') return buyMixin;
    if ($orderType === 'SELL') return sellMixin;
    return;
  }}
  align-items: center;
  background-color: ${({$orderType}) =>
    $orderType === 'BUY' ? colors.palette.green[600] + '15' : colors.palette.red[700] + '15'};
  border-radius: 4px;
  display: inline-flex;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.05em;
  padding: 4px 10px;
  text-transform: uppercase;
`;
