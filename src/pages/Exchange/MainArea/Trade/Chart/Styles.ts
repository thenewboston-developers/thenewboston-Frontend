import styled, {css, keyframes} from 'styled-components';

import {breakpoints, colors} from 'styles';

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

export const ChangeArrow = styled.span<{isPositive: boolean}>`
  animation: ${({isPositive}) =>
    isPositive
      ? css`
          ${fadeIn} 0.5s ease-out
        `
      : css`
          ${fadeIn} 0.5s ease-out
        `};
  font-size: 12px;
`;

export const ChartBackground = styled.div`
  background: linear-gradient(135deg, ${colors.white} 0%, #fafbfc 100%);
  border-radius: 20px;
  box-shadow: 0 2px 4px rgb(0 0 0 / 8%);
  padding: 24px;
  position: relative;
  transition: all 0.3s ease;
`;

export const ChartControls = styled.div`
  align-items: center;
  display: flex;
  gap: 24px;
  justify-content: space-between;
`;

export const ChartHeader = styled.div`
  animation: ${fadeIn} 0.5s ease-out;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 20px;
`;

export const ChartTypeButton = styled.button<{active: boolean}>`
  align-items: center;
  background: ${({active}) => (active ? colors.palette.blue['100'] : 'transparent')};
  border: none;
  border-radius: 8px;
  color: ${({active}) => (active ? colors.palette.blue['500'] : colors.palette.gray['500'])};
  cursor: pointer;
  display: flex;
  justify-content: center;
  padding: 8px;
  transition: all 0.2s ease;

  &:hover {
    background: ${({active}) => (active ? colors.palette.blue['100'] : colors.palette.gray['100'])};
    color: ${({active}) => (active ? colors.palette.blue['500'] : colors.palette.gray['700'])};
  }

  svg {
    height: 20px;
    width: 20px;
  }
`;

export const ChartTypeButtons = styled.div`
  display: flex;
  gap: 8px;
`;

export const ChartWrapper = styled.div`
  background: white;
  border-radius: 16px;
  padding: 20px 10px 10px 0;
  position: relative;

  .recharts-cartesian-grid-horizontal line {
    stroke-dasharray: 0;
  }

  .recharts-cartesian-axis-tick text {
    fill: ${colors.palette.gray['600']};
    font-size: 12px;
  }
`;

export const Container = styled.div``;

export const CurrentPrice = styled.div`
  align-items: center;
  color: ${colors.palette.darkGray['500']};
  display: flex;
  font-weight: 700;
  gap: 12px;
  line-height: 1;
`;

export const PriceAmount = styled.span`
  font-size: 42px;
  font-weight: 700;
`;

export const PriceChange = styled.div<{isPositive: boolean}>`
  align-items: center;
  background: ${({isPositive}) => (isPositive ? 'rgba(22, 170, 22, 0.1)' : 'rgba(220, 13, 22, 0.1)')};
  border-radius: 8px;
  color: ${({isPositive}) => (isPositive ? colors.palette.green['500'] : colors.palette.red['500'])};
  display: inline-flex;
  font-size: 14px;
  font-weight: 600;
  gap: 4px;
  padding: 6px 12px;
  transition: all 0.3s ease;
`;

export const PriceLogo = styled.div`
  align-items: center;
  display: flex;
`;

export const PriceSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (min-width: ${breakpoints.tablet}) {
    align-items: flex-start;
    flex-direction: row;
    justify-content: space-between;
  }
`;

export const PriceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const StatItem = styled.div`
  align-items: baseline;
  display: flex;
  gap: 6px;
`;

export const StatLabel = styled.span`
  color: ${colors.palette.gray['600']};
  font-size: 12px;
  font-weight: 500;
  text-transform: capitalize;
`;

export const StatValue = styled.span`
  color: ${colors.palette.darkGray['500']};
  font-size: 13px;
  font-weight: 600;
`;

export const StatsBar = styled.div`
  align-self: flex-start;
  background: ${colors.palette.gray['100']};
  border-radius: 8px;
  display: inline-flex;
  gap: 16px;
  padding: 8px 12px;
`;

export const TimeframeButton = styled.button<{active: boolean}>`
  background: ${({active}) => (active ? colors.white : 'transparent')};
  border: none;
  border-radius: 8px;
  box-shadow: ${({active}) => (active ? '0 2px 8px rgba(0, 0, 0, 0.08)' : 'none')};
  color: ${({active}) => (active ? colors.palette.darkGray['500'] : colors.palette.gray['600'])};
  cursor: pointer;
  font-size: 14px;
  font-weight: ${({active}) => (active ? '600' : '500')};
  padding: 8px 16px;
  transition: all 0.2s ease;

  &:hover {
    background: ${({active}) => (active ? colors.white : 'rgba(255, 255, 255, 0.5)')};
    color: ${colors.palette.darkGray['500']};
  }
`;

export const TimeframeButtons = styled.div`
  background: ${colors.palette.gray['100']};
  border-radius: 12px;
  display: flex;
  gap: 4px;
  padding: 4px;
`;

export const TooltipContainer = styled.div`
  animation: ${fadeIn} 0.2s ease-out;
  background: rgba(15, 20, 25, 0.95);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  padding: 12px 16px;
`;

export const TooltipDate = styled.div`
  color: ${colors.palette.gray['400']};
  font-size: 12px;
  letter-spacing: 0.05em;
  margin-bottom: 8px;
  text-transform: uppercase;
`;

export const TooltipLabel = styled.span`
  color: ${colors.palette.gray['300']};
  font-size: 12px;
`;

export const TooltipPrice = styled.div`
  align-items: baseline;
  display: flex;
  gap: 8px;
`;

export const TooltipValue = styled.span`
  color: ${colors.white};
  font-size: 16px;
  font-weight: 600;
`;
