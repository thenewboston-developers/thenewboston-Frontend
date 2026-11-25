import styled, {keyframes} from 'styled-components';

import {bottomNavItemStyle, navFocusVisible} from 'layouts/Main/mixins';
import {colors, fonts, radii, shadows} from 'styles';

const menuEnter = keyframes`
  from {
    opacity: 0;
    transform: translateY(8px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Menu = styled.div`
  background: ${colors.nav.background};
  border: 1px solid ${colors.nav.border};
  border-radius: 14px;
  box-shadow: ${shadows.popover};
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 200px;
  padding: 6px;
  position: fixed;
  z-index: 9999;

  @media (prefers-reduced-motion: no-preference) {
    animation: ${menuEnter} 0.15s ease;
  }
`;

export const MenuItem = styled.button<{$isActive: boolean}>`
  ${bottomNavItemStyle};
`;

export const MenuOption = styled.button<{$isActive: boolean}>`
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
  height: 40px;
  letter-spacing: -0.006em;
  padding: 0 10px;
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
    background: ${({$isActive}) => ($isActive ? colors.nav.active : colors.nav.hover)};
    color: ${colors.nav.textActive};
  }

  ${navFocusVisible};

  &:focus-visible {
    outline-offset: -2px;
  }
`;

export const OptionLabel = styled.span`
  white-space: nowrap;
`;
