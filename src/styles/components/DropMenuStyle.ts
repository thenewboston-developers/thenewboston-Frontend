import styled from 'styled-components';

import {colors, fonts, radii, shadows} from 'styles';

export const Menu = styled.div`
  background: ${colors.white};
  border: 1px solid ${colors.borderSubtle};
  border-radius: ${radii.medium};
  box-shadow: ${shadows.popover};
  padding: 4px;
  position: fixed;
`;

export const Option = styled.div`
  align-items: center;
  border-radius: ${radii.small};
  color: ${colors.primary};
  cursor: pointer;
  display: flex;
  font-size: 14px;
  font-weight: ${fonts.weight.medium};
  min-height: 36px;
  padding: 0 12px;
  transition: background 0.15s ease;
  user-select: none;
  white-space: nowrap;

  /* The ring is inset so neighboring options and the menu padding never cover it */
  &:focus-visible {
    background: ${colors.whiteHover};
    box-shadow: inset ${shadows.focusRing};
    outline: none;
  }

  &:hover {
    background: ${colors.whiteHover};
  }
`;
