import styled, {css, keyframes} from 'styled-components';

import {breakpoints, cardStyle, colors, eyebrowStyle, fonts, radii} from 'styles';

import {negativeBadgeStyle, positiveBadgeStyle, segmentedTrackStyle, segmentStyle} from '../../mixins';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeInMixin = css`
  @media (prefers-reduced-motion: no-preference) {
    animation: ${fadeIn} 0.5s ease-out;
  }
`;

export const ChangeArrow = styled.span`
  ${fadeInMixin};
  font-size: 9px;
`;

export const ChartControls = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: space-between;
  width: 100%;

  @media (max-width: ${breakpoints.mobile}) {
    gap: 12px;
  }
`;

export const ChartHeader = styled.div`
  ${fadeInMixin};
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 20px;
`;

export const ChartTitle = styled.h2`
  color: ${colors.primary};
  font-size: 16px;
  font-weight: ${fonts.weight.semiBold};
  margin: 0;
`;

// The axis and grid elements are drawn by d3 (see index.tsx), which sets their stroke and font through presentation
// attributes that these rules take precedence over
export const ChartWrapper = styled.div`
  display: flex;
  min-height: 420px;
  overflow: hidden;
  position: relative;
  width: 100%;

  svg {
    display: block;
    max-width: 100%;
    overflow: visible;

    .domain {
      stroke: ${colors.borderSubtle};
    }

    .grid .domain {
      stroke: none;
    }

    .tick line {
      stroke: ${colors.borderSubtle};
    }

    .grid .tick line {
      stroke: ${colors.palette.gray[300]};
    }

    .tick text {
      fill: ${colors.secondary};
      font-family: ${fonts.family.default};
      font-variant-numeric: tabular-nums;
    }
  }
`;

export const Container = styled.div`
  ${cardStyle};
  border-top: 3px solid ${colors.palette.blue[500]};
  min-width: 0;
  padding: 24px;
  position: relative;
  width: 100%;

  @media (max-width: ${breakpoints.mobile}) {
    padding: 16px;
  }
`;

export const CurrentPrice = styled.div`
  align-items: center;
  color: ${colors.primary};
  display: flex;
  gap: 12px;
  min-height: 32px;
`;

export const EmptyContainer = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: center;
`;

export const LoadingContainer = styled.div`
  align-items: center;
  color: ${colors.secondary};
  display: flex;
  flex: 1;
  font-size: 16px;
  justify-content: center;
`;

export const PriceAmount = styled.span`
  font-size: 32px;
  font-variant-numeric: tabular-nums;
  font-weight: ${fonts.weight.bold};
  letter-spacing: -0.01em;
  line-height: 1;
  overflow-wrap: anywhere;

  @media (max-width: ${breakpoints.mini}) {
    font-size: 28px;
  }
`;

export const PriceChange = styled.div<{$isPositive: boolean}>`
  ${({$isPositive}) => ($isPositive ? positiveBadgeStyle : negativeBadgeStyle)};
  align-items: center;
  align-self: flex-start;
  border-radius: ${radii.pill};
  display: inline-flex;
  font-size: 13px;
  font-variant-numeric: tabular-nums;
  font-weight: ${fonts.weight.semiBold};
  gap: 4px;
  line-height: 1.5;
  padding: 3px 10px;
`;

export const PriceLabel = styled.span`
  color: ${colors.secondary};
  font-size: 13px;
  font-weight: ${fonts.weight.medium};
  line-height: 1.5;
`;

export const PriceLogo = styled.div`
  align-items: center;
  display: flex;
`;

export const PriceSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;

  @media (min-width: ${breakpoints.tablet}) {
    align-items: flex-start;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
  }
`;

export const PriceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 0;
`;

export const StatItem = styled.div`
  background: ${colors.palette.gray[50]};
  border: 1px solid ${colors.borderSubtle};
  border-radius: ${radii.medium};
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
  padding: 12px;
`;

export const StatLabel = styled.span`
  ${eyebrowStyle};
  font-size: 12px;
`;

export const StatValue = styled.span`
  color: ${colors.primary};
  font-size: 15px;
  font-variant-numeric: tabular-nums;
  font-weight: ${fonts.weight.semiBold};
  line-height: 1.4;
  overflow-wrap: anywhere;
`;

export const StatsBar = styled.div`
  align-self: flex-start;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  width: 100%;
`;

export const TimeframeButton = styled.button<{$active: boolean}>`
  ${segmentStyle};
  color: ${({$active}) => ($active ? colors.palette.blue[900] : colors.secondary)};
  font-size: 14px;
`;

export const TimeframeButtons = styled.div`
  ${segmentedTrackStyle};
`;
