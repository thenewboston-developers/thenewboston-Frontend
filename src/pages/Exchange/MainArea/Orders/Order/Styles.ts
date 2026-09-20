import styled from 'styled-components';

import {breakpoints, cardStyle, colors, eyebrowStyle, fonts, radii} from 'styles';

import {badgeStyle, fillStatusBadgeWrapperStyle, negativeBadgeStyle, positiveBadgeStyle} from '../../mixins';

export const Actions = styled.div`
  align-items: center;
  display: flex;
  flex-shrink: 0;
  gap: 4px;
`;

export const Container = styled.div`
  ${cardStyle};
  min-width: 0;
  padding: 20px;

  @media (max-width: ${breakpoints.mobile}) {
    padding: 16px;
  }
`;

// The atomic inline lets a long value wrap in front of the ticker instead of somewhere inside of it
export const CurrencyTicker = styled.span`
  color: ${colors.secondary};
  display: inline-block;
  font-size: 12px;
  font-weight: ${fonts.weight.medium};
  margin-left: 4px;
  white-space: nowrap;
`;

export const DateTime = styled.div`
  align-items: center;
  color: ${colors.secondary};
  display: flex;
  font-size: 13px;
  font-variant-numeric: tabular-nums;
  gap: 6px;
  line-height: 1.5;
`;

// The negative margin lines the round trigger up with the edge of the card content
export const DropdownMenuWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  margin-right: -8px;
`;

export const FillProgress = styled.div`
  margin-top: 16px;
`;

export const FillStatusBadgeWrapper = styled.div<{$status: number}>`
  ${fillStatusBadgeWrapperStyle};
`;

export const Header = styled.div`
  align-items: center;
  display: grid;
  gap: 12px;
  grid-template-columns: minmax(0, 1fr) auto;
  margin-bottom: 16px;
`;

export const MainInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
`;

export const MetricItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
`;

export const MetricLabel = styled.span`
  ${eyebrowStyle};
`;

export const MetricValue = styled.span`
  color: ${colors.primary};
  font-size: 15px;
  font-variant-numeric: tabular-nums;
  font-weight: ${fonts.weight.semiBold};
  line-height: 1.4;
  overflow-wrap: anywhere;
`;

export const Metrics = styled.div`
  display: grid;
  gap: 16px 20px;
  grid-template-columns: repeat(2, minmax(0, 1fr));

  @media (min-width: ${breakpoints.mobile}) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`;

export const ProgressBar = styled.div`
  background: ${colors.palette.gray[100]};
  border-radius: ${radii.pill};
  height: 6px;
  overflow: hidden;
`;

export const ProgressFill = styled.div<{$percentage: number; $orderType: string}>`
  background: ${({$orderType}) => ($orderType === 'BUY' ? colors.palette.green[500] : colors.palette.blue[500])};
  border-radius: ${radii.pill};
  height: 100%;
  transition: width 0.3s ease;
  width: ${({$percentage}) => $percentage}%;
`;

export const ProgressHeader = styled.div`
  align-items: baseline;
  display: flex;
  gap: 12px;
  justify-content: space-between;
  margin-bottom: 8px;
`;

export const ProgressLabel = styled.span`
  color: ${colors.secondary};
  font-size: 13px;
  font-weight: ${fonts.weight.medium};
`;

export const ProgressValue = styled.span`
  color: ${colors.primary};
  font-size: 13px;
  font-variant-numeric: tabular-nums;
  font-weight: ${fonts.weight.semiBold};
`;

export const TopLine = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 6px 12px;
`;

export const TypeBadge = styled.div<{$orderType: string}>`
  ${badgeStyle};
  ${({$orderType}) => ($orderType === 'BUY' ? positiveBadgeStyle : negativeBadgeStyle)};
`;
