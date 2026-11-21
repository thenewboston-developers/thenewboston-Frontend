import styled from 'styled-components';

import {colors, fonts, radii} from 'styles';

export const BadgeCount = styled.span`
  align-items: center;
  background: ${colors.accent};
  border-radius: ${radii.pill};
  box-shadow: 0 0 0 2px ${colors.nav.background};
  color: ${colors.white};
  display: inline-flex;
  font-size: 10px;
  font-variant-numeric: tabular-nums;
  font-weight: ${fonts.weight.bold};
  height: 16px;
  justify-content: center;
  left: 13px;
  line-height: 1;
  min-width: 16px;
  padding: 0 4px;
  position: absolute;
  /* The icon sits 8px below the top of the tab, so the 2px ring starts at 4px and clears the 3px active bar */
  top: -2px;
  white-space: nowrap;
`;
