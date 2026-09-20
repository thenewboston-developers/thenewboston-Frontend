import styled, {css, keyframes} from 'styled-components';

import {colors, shadows} from 'styles';
import {Menu as UMenu, Option as UOption} from 'styles/components/DropMenuStyle';

const menuEnter = keyframes`
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Shared with the positioning math in index.tsx: the menu always keeps this distance from the viewport edges
export const MENU_VIEWPORT_MARGIN = 8;

export const Menu = styled(UMenu)`
  max-width: calc(100vw - ${MENU_VIEWPORT_MARGIN * 2}px);
  min-width: 168px;
  z-index: 1101;

  @media (prefers-reduced-motion: no-preference) {
    animation: ${menuEnter} 0.15s ease;
  }
`;

export const MenuButton = styled.button<{$isOpen: boolean}>`
  align-items: center;
  background: ${({$isOpen}) => ($isOpen ? colors.whiteHover : 'transparent')};
  border: none;
  color: ${({$isOpen}) => ($isOpen ? colors.primary : colors.secondary)};
  cursor: pointer;
  display: flex;
  flex-shrink: 0;
  height: 32px;
  justify-content: center;
  width: 32px;

  /* Doubled specificity so legacy "button { ... }" rules in consumer wrappers cannot reshape the trigger */
  && {
    border-radius: 50%;
    padding: 0;
    transition:
      background 0.15s ease,
      color 0.15s ease;
  }

  &:focus-visible {
    box-shadow: ${shadows.focusRing};
    outline: none;
  }

  /* Hover is limited to real pointers so a tap cannot leave the trigger looking active after the menu closes */
  @media (hover: hover) {
    &&:hover {
      background: ${colors.whiteHover};
      color: ${colors.primary};
    }
  }
`;

export const MenuOption = styled(UOption)<{$isDestructive: boolean}>`
  ${({$isDestructive}) =>
    $isDestructive &&
    css`
      color: ${colors.palette.red[500]};

      &:focus-visible,
      &:hover {
        background: ${colors.accentSoft};
      }
    `}
`;
