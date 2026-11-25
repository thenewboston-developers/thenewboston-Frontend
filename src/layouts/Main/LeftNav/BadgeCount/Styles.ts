import styled from 'styled-components';

import {breakpoints, colors, fonts, radii} from 'styles';

export const BadgeCount = styled.span`
  align-items: center;
  background: ${colors.accent};
  border-radius: ${radii.pill};
  color: ${colors.white};
  display: inline-flex;
  flex-shrink: 0;
  font-size: 11px;
  font-variant-numeric: tabular-nums;
  font-weight: ${fonts.weight.semiBold};
  height: 18px;
  justify-content: center;
  letter-spacing: 0;
  line-height: 1;
  margin-left: auto;
  min-width: 18px;
  padding: 0 6px;
  white-space: nowrap;

  @media (max-width: ${breakpoints.tablet}) {
    box-shadow: 0 0 0 2px ${colors.nav.background};
    font-size: 10px;
    height: 16px;
    left: 22px;
    margin-left: 0;
    min-width: 16px;
    padding: 0 4px;
    position: absolute;
    top: 3px;
  }
`;
