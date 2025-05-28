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

export const Container = styled.div`
  overflow: hidden;
`;

export const ChartBackground = styled.div`
  background: linear-gradient(135deg, ${colors.white} 0%, #fafbfc 100%);
  border-radius: 20px;
  padding: 24px;
  position: relative;
  transition: all 0.3s ease;
`;

export const ChartHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 20px;
  animation: ${fadeIn} 0.5s ease-out;
`;

export const PriceSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (min-width: ${breakpoints.tablet}) {
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
  }
`;

export const PriceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const CurrentPrice = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 700;
  color: ${colors.palette.darkGray['500']};
  line-height: 1;
`;

export const PriceLogo = styled.div`
  display: flex;
  align-items: center;
`;

export const PriceAmount = styled.span`
  font-size: 42px;
  font-weight: 700;
`;

export const PriceChange = styled.div<{isPositive: boolean}>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  font-weight: 600;
  color: ${({isPositive}) => (isPositive ? colors.palette.green['500'] : colors.palette.red['500'])};
  background: ${({isPositive}) => (isPositive ? 'rgba(22, 170, 22, 0.1)' : 'rgba(220, 13, 22, 0.1)')};
  padding: 6px 12px;
  border-radius: 8px;
  transition: all 0.3s ease;
`;

export const ChangeArrow = styled.span<{isPositive: boolean}>`
  font-size: 12px;
  animation: ${({isPositive}) =>
    isPositive
      ? css`
          ${fadeIn} 0.5s ease-out
        `
      : css`
          ${fadeIn} 0.5s ease-out
        `};
`;

export const ChartControls = styled.div`
  display: flex;
  gap: 24px;
  align-items: center;
  justify-content: space-between;
`;

export const TimeframeButtons = styled.div`
  display: flex;
  gap: 4px;
  background: ${colors.palette.gray['100']};
  padding: 4px;
  border-radius: 12px;
`;

export const TimeframeButton = styled.button<{active: boolean}>`
  padding: 8px 16px;
  border: none;
  background: ${({active}) => (active ? colors.white : 'transparent')};
  color: ${({active}) => (active ? colors.palette.darkGray['500'] : colors.palette.gray['600'])};
  font-size: 14px;
  font-weight: ${({active}) => (active ? '600' : '500')};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: ${({active}) => (active ? '0 2px 8px rgba(0, 0, 0, 0.08)' : 'none')};

  &:hover {
    color: ${colors.palette.darkGray['500']};
    background: ${({active}) => (active ? colors.white : 'rgba(255, 255, 255, 0.5)')};
  }
`;

export const ChartTypeButtons = styled.div`
  display: flex;
  gap: 8px;
`;

export const ChartTypeButton = styled.button<{active: boolean}>`
  padding: 8px;
  border: none;
  background: ${({active}) => (active ? colors.palette.blue['100'] : 'transparent')};
  color: ${({active}) => (active ? colors.palette.blue['500'] : colors.palette.gray['500'])};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${({active}) => (active ? colors.palette.blue['100'] : colors.palette.gray['100'])};
    color: ${({active}) => (active ? colors.palette.blue['500'] : colors.palette.gray['700'])};
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

export const StatsBar = styled.div`
  display: inline-flex;
  gap: 16px;
  padding: 8px 12px;
  background: ${colors.palette.gray['100']};
  border-radius: 8px;
  align-self: flex-start;
`;

export const StatItem = styled.div`
  display: flex;
  align-items: baseline;
  gap: 6px;
`;

export const StatLabel = styled.span`
  font-size: 12px;
  color: ${colors.palette.gray['600']};
  font-weight: 500;
  text-transform: capitalize;
`;

export const StatValue = styled.span`
  font-size: 13px;
  color: ${colors.palette.darkGray['500']};
  font-weight: 600;
`;

export const ChartWrapper = styled.div`
  position: relative;
  background: white;
  border-radius: 16px;
  padding: 20px 10px 10px 0;

  .recharts-cartesian-grid-horizontal line {
    stroke-dasharray: 0;
  }

  .recharts-cartesian-axis-tick text {
    font-size: 12px;
    fill: ${colors.palette.gray['600']};
  }
`;

export const TooltipContainer = styled.div`
  background: rgba(15, 20, 25, 0.95);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 12px 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  animation: ${fadeIn} 0.2s ease-out;
`;

export const TooltipDate = styled.div`
  font-size: 12px;
  color: ${colors.palette.gray['400']};
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const TooltipPrice = styled.div`
  display: flex;
  align-items: baseline;
  gap: 8px;
`;

export const TooltipLabel = styled.span`
  font-size: 12px;
  color: ${colors.palette.gray['300']};
`;

export const TooltipValue = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: ${colors.white};
`;
