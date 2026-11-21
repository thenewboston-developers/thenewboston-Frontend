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
  font-weight: ${fonts.weight.bold};
  height: 20px;
  justify-content: center;
  line-height: 1;
  margin-left: auto;
  min-width: 20px;
  padding: 0 6px;
  white-space: nowrap;

  @media (max-width: ${breakpoints.tablet}) {
    box-shadow: 0 0 0 2px ${colors.nav.background};
    font-size: 10px;
    height: 18px;
    left: 24px;
    margin-left: 0;
    min-width: 18px;
    padding: 0 5px;
    position: absolute;
    top: 2px;
  }
`;
