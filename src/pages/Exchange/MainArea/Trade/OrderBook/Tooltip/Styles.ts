import styled, {keyframes} from 'styled-components';

import {colors, fonts, radii, shadows} from 'styles';

import {fillStatusBadgeWrapperStyle, NEGATIVE_TEXT_COLOR, POSITIVE_TEXT_COLOR} from '../../../mixins';

const ARROW_SIZE = 10;

const tooltipEnter = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, calc(-100% + 4px));
  }
  to {
    opacity: 1;
    transform: translate(-50%, -100%);
  }
`;

// The arrow is a rotated square that continues the border of the popover along its two lower edges
export const Container = styled.div`
  background: ${colors.white};
  border: 1px solid ${colors.borderSubtle};
  border-radius: ${radii.medium};
  box-shadow: ${shadows.popover};
  left: 50%;
  padding: 12px 16px;
  pointer-events: none;
  position: absolute;
  text-align: left;
  top: -10px;
  transform: translate(-50%, -100%);
  white-space: nowrap;
  z-index: 1000;

  &::after {
    background: ${colors.white};
    border-bottom: 1px solid ${colors.borderSubtle};
    border-right: 1px solid ${colors.borderSubtle};
    bottom: ${`-${ARROW_SIZE / 2 + 1}px`};
    content: '';
    height: ${`${ARROW_SIZE}px`};
    left: ${`calc(50% - ${ARROW_SIZE / 2}px)`};
    position: absolute;
    transform: rotate(45deg);
    width: ${`${ARROW_SIZE}px`};
  }

  @media (prefers-reduced-motion: no-preference) {
    animation: ${tooltipEnter} 0.2s ease-out;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 250px;
`;

export const FillStatusBadgeWrapper = styled.span<{$status: number}>`
  ${fillStatusBadgeWrapperStyle};
`;

export const Label = styled.span`
  color: ${colors.secondary};
  font-size: 12px;
  font-weight: ${fonts.weight.medium};
  min-width: 100px;
`;

export const Row = styled.div`
  align-items: center;
  display: flex;
  gap: 12px;
  justify-content: space-between;
`;

export const Value = styled.span<{$type?: 'buy' | 'sell'}>`
  color: ${({$type}) => {
    if ($type === 'buy') return POSITIVE_TEXT_COLOR;
    if ($type === 'sell') return NEGATIVE_TEXT_COLOR;
    return colors.primary;
  }};
  font-size: 13px;
  font-variant-numeric: tabular-nums;
  font-weight: ${fonts.weight.semiBold};
  text-align: right;
`;
