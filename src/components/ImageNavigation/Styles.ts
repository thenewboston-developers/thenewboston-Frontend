import styled, {css} from 'styled-components';

import {breakpoints, colors, fonts, radii} from 'styles';

const buttonStyle = css`
  align-items: center;
  background: rgba(0, 0, 0, 0.65);
  border: none;
  border-radius: ${radii.pill};
  color: ${colors.white};
  cursor: pointer;
  display: flex;
  height: 44px;
  justify-content: center;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 44px;
  z-index: 2;

  &:focus-visible {
    outline: 2px solid ${colors.white};
    outline-offset: 2px;
  }

  &:hover {
    background: rgba(0, 0, 0, 0.8);
  }
`;

export const Counter = styled.div`
  background: rgba(0, 0, 0, 0.65);
  border-radius: ${radii.pill};
  bottom: 24px;
  color: ${colors.white};
  font-size: 13px;
  font-variant-numeric: tabular-nums;
  font-weight: ${fonts.weight.medium};
  left: 50%;
  padding: 6px 12px;
  pointer-events: none;
  position: absolute;
  transform: translateX(-50%);
  z-index: 2;

  @media (max-width: ${breakpoints.mobile}) {
    bottom: 16px;
  }
`;

export const NextButton = styled.button`
  ${buttonStyle};
  right: 24px;

  @media (max-width: ${breakpoints.mobile}) {
    right: 12px;
  }
`;

export const PreviousButton = styled.button`
  ${buttonStyle};
  left: 24px;

  @media (max-width: ${breakpoints.mobile}) {
    left: 12px;
  }
`;
