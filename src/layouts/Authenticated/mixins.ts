import {css} from 'styled-components';

import {colors, fonts, radii} from 'styles';

const BOTTOM_NAV_INDICATOR_WIDTH = 24;

// shadows.focusRing is tuned for light surfaces, so the dark navigation uses a translucent outline instead
const NAV_FOCUS_OUTLINE_COLOR = `color-mix(in srgb, ${colors.nav.textActive} 55%, transparent)`;

export const navFocusVisible = css`
  &:focus-visible {
    outline: 2px solid ${NAV_FOCUS_OUTLINE_COLOR};
    outline-offset: 2px;
  }
`;

export const bottomNavItemStyle = css<{$isActive: boolean}>`
  -webkit-tap-highlight-color: transparent;
  align-items: center;
  background: none;
  border: none;
  border-radius: ${radii.medium};
  color: ${({$isActive}) => ($isActive ? colors.nav.textActive : colors.nav.text)};
  cursor: pointer;
  display: flex;
  flex: 0 1 auto;
  flex-direction: column;
  font-family: ${fonts.family.default};
  font-weight: ${({$isActive}) => ($isActive ? fonts.weight.semiBold : fonts.weight.medium)};
  gap: 2px;
  min-width: 48px;
  padding: 8px 6px;
  position: relative;
  text-decoration: none;
  transition: color 0.15s ease;

  &::before {
    background: ${colors.accent};
    border-radius: 0 0 ${radii.small} ${radii.small};
    content: '';
    height: 3px;
    left: calc(50% - ${BOTTOM_NAV_INDICATOR_WIDTH / 2}px);
    opacity: ${({$isActive}) => ($isActive ? 1 : 0)};
    position: absolute;
    top: 0;
    transition: opacity 0.15s ease;
    width: ${BOTTOM_NAV_INDICATOR_WIDTH}px;
  }

  &:hover {
    text-decoration: none;
  }

  ${navFocusVisible};

  &:focus-visible {
    outline-offset: -2px;
  }

  /* Touch devices keep :hover applied after a tap, so the hover color is limited to real pointers */
  @media (hover: hover) {
    &:hover {
      color: ${colors.nav.textActive};
    }
  }
`;

export const bottomNavTextStyle = css`
  font-size: 11px;
  line-height: 1.3;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

// Keeps a label available to assistive technology while removing it from the visual layout
export const visuallyHidden = css`
  border: 0;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;
