import UIcon from '@mdi/react';
import styled from 'styled-components';

import {colors, radii, shadows} from 'styles';

const SIZE = 56;

export const Button = styled.button`
  -webkit-tap-highlight-color: transparent;
  align-items: center;
  background: ${colors.accent};
  border: none;
  border-radius: ${radii.pill};
  /* The unit on the env() fallback is required inside calc() */
  bottom: calc(72px + env(safe-area-inset-bottom, 0px));
  box-shadow: ${shadows.popover};
  color: ${colors.white};
  cursor: pointer;
  display: flex;
  height: ${SIZE}px;
  justify-content: center;
  padding: 0;
  position: fixed;
  right: 16px;
  transition: background 0.2s ease;
  width: ${SIZE}px;
  z-index: 999;

  &:focus-visible {
    outline: 2px solid ${colors.accent};
    outline-offset: 3px;
  }

  /* Touch devices keep :hover applied after a tap, so the hover visuals are limited to real pointers */
  @media (hover: hover) {
    &:hover {
      background: ${colors.accentHover};
    }
  }

  /* Declared before the :active rule below so that the pressed state wins while the pointer is still hovering */
  @media (hover: hover) and (prefers-reduced-motion: no-preference) {
    &:hover {
      transform: translateY(-2px);
    }
  }

  @media (prefers-reduced-motion: no-preference) {
    transition:
      background 0.2s ease,
      transform 0.2s ease;

    &:active {
      transform: scale(0.96);
    }
  }
`;

export const Icon = styled(UIcon)`
  flex-shrink: 0;
`;
