import {Link as ULink} from 'react-router-dom';
import styled from 'styled-components';

import {breakpoints, cardStyle, colors, fonts, radii, shadows} from 'styles';

import {badgeStyle, fillStatusBadgeWrapperStyle, negativeBadgeStyle, positiveBadgeStyle} from '../../mixins';

export const Actions = styled.div`
  align-items: center;
  display: flex;
  flex-shrink: 0;
  gap: 8px;
`;

export const AssetLogo = styled.img`
  background: ${colors.palette.gray[100]};
  border: 1px solid ${colors.borderSubtle};
  border-radius: 50%;
  flex-shrink: 0;
  height: 40px;
  object-fit: cover;
  width: 40px;
`;

export const AssetPairLink = styled(ULink)`
  align-items: center;
  border-radius: ${radii.small};
  color: ${colors.palette.blue[900]};
  display: inline-flex;
  font-size: 17px;
  font-weight: ${fonts.weight.semiBold};
  gap: 12px;
  line-height: 1.4;
  max-width: 100%;
  overflow-wrap: anywhere;

  &:focus-visible {
    box-shadow: ${shadows.focusRing};
    outline: none;
  }

  &:hover {
    color: ${colors.palette.blue[600]};
    text-decoration: none;
  }
`;

export const Container = styled.article`
  ${cardStyle};
  min-width: 0;
  padding: 24px;

  @media (max-width: ${breakpoints.mobile}) {
    padding: 16px;
  }
`;

export const CurrencyTicker = styled.span`
  color: ${colors.secondary};
  display: inline-block;
  font-size: 13px;
  font-weight: ${fonts.weight.medium};
  margin-left: 5px;
  white-space: nowrap;
`;

export const DateTime = styled.time`
  color: ${colors.secondary};
  font-size: 13px;
  font-variant-numeric: tabular-nums;
  line-height: 1.5;
`;

export const DropdownMenuWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  margin-right: -8px;
`;

export const FillProgress = styled.div`
  margin-top: 20px;
`;

export const FillStatusBadgeWrapper = styled.div<{$status: number}>`
  ${fillStatusBadgeWrapperStyle};
`;

export const Header = styled.div`
  align-items: start;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const MainInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 0;
`;

export const MetricItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
`;

export const MetricLabel = styled.span`
  color: ${colors.secondary};
  font-size: 14px;
  font-weight: ${fonts.weight.medium};
`;

export const MetricValue = styled.span`
  color: ${colors.primary};
  font-size: 16px;
  font-variant-numeric: tabular-nums;
  font-weight: ${fonts.weight.semiBold};
  line-height: 1.5;
  overflow-wrap: anywhere;
`;

export const Metrics = styled.div`
  background: ${colors.palette.gray[50]};
  border: 1px solid ${colors.borderSubtle};
  border-radius: ${radii.medium};
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  padding: 20px;

  @media (min-width: ${breakpoints.mobile}) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  @media (max-width: ${breakpoints.mini}) {
    padding: 16px;
  }
`;

export const ProgressBar = styled.div`
  background: ${colors.palette.gray[100]};
  border-radius: ${radii.pill};
  height: 6px;
  overflow: hidden;
`;

export const ProgressFill = styled.div<{$percentage: number; $orderType: string}>`
  background: ${({$orderType}) => ($orderType === 'BUY' ? colors.palette.green[700] : colors.palette.red[600])};
  border-radius: ${radii.pill};
  height: 100%;
  width: ${({$percentage}) => $percentage}%;

  @media (prefers-reduced-motion: no-preference) {
    transition: width 0.3s ease;
  }
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
  font-size: 14px;
  font-weight: ${fonts.weight.medium};
`;

export const ProgressValue = styled.span`
  color: ${colors.primary};
  font-size: 14px;
  font-variant-numeric: tabular-nums;
  font-weight: ${fonts.weight.semiBold};
`;

export const TopLine = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 8px 12px;
`;

export const TypeBadge = styled.div<{$orderType: string}>`
  ${badgeStyle};
  ${({$orderType}) => ($orderType === 'BUY' ? positiveBadgeStyle : negativeBadgeStyle)};
  font-size: 12px;
`;
