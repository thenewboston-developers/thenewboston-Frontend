import {Link as ULink} from 'react-router-dom';
import styled, {css} from 'styled-components';

import {navFocusVisible, visuallyHidden} from 'layouts/Main/mixins';
import {breakpoints, colors, fonts} from 'styles';

export const ICON_SIZE = 20;
const ITEM_SIZE = 40;

const menuItemStyle = css<{$isActive: boolean}>`
  align-items: center;
  background: ${({$isActive}) => ($isActive ? colors.nav.active : 'transparent')};
  border: none;
  border-radius: 10px;
  color: ${({$isActive}) => ($isActive ? colors.nav.textActive : colors.nav.text)};
  cursor: pointer;
  display: flex;
  flex-shrink: 0;
  font-family: ${fonts.family.navigation};
  font-size: 14px;
  font-weight: ${({$isActive}) => ($isActive ? fonts.weight.semiBold : fonts.weight.medium)};
  gap: 12px;
  height: ${ITEM_SIZE}px;
  letter-spacing: -0.006em;
  padding: 0 10px;
  position: relative;
  text-align: left;
  transition:
    background 0.15s ease,
    color 0.15s ease;
  width: 100%;

  svg {
    color: ${({$isActive}) => ($isActive ? colors.nav.iconActive : 'currentColor')};
    flex-shrink: 0;
  }

  &:hover {
    text-decoration: none;
  }

  /* Touch devices keep :hover applied after a tap, so the hover visuals are limited to real pointers */
  @media (hover: hover) {
    &:hover {
      background: ${({$isActive}) => ($isActive ? colors.nav.active : colors.nav.hover)};
      color: ${colors.nav.textActive};
    }
  }

  ${navFocusVisible};

  @media (max-width: ${breakpoints.tablet}) {
    gap: 0;
    justify-content: center;
    padding: 0;
    width: ${ITEM_SIZE}px;
  }
`;

export const MenuButton = styled.button<{$isActive: boolean}>`
  ${menuItemStyle};
`;

export const MenuLink = styled(ULink)<{$isActive: boolean}>`
  ${menuItemStyle};
`;

export const Text = styled.span`
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: ${breakpoints.tablet}) {
    ${visuallyHidden};
  }
`;
