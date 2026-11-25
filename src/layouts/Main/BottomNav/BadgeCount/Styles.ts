import styled from 'styled-components';

import {BOTTOM_NAV_ICON_PADDING_X} from 'layouts/Main/mixins';
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
  font-weight: ${fonts.weight.semiBold};
  height: 16px;
  justify-content: center;
  /* Sits over the top right of the icon, which starts after the pill's side padding */
  left: ${BOTTOM_NAV_ICON_PADDING_X + 12}px;
  line-height: 1;
  min-width: 16px;
  padding: 0 4px;
  position: absolute;
  top: 0;
  white-space: nowrap;
`;
