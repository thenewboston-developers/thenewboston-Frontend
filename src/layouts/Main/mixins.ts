import {css} from 'styled-components';

import {breakpoints, colors, fonts, radii} from 'styles';

export const BOTTOM_NAV_ICON_PADDING_X = 14;
export const BOTTOM_NAV_ICON_SIZE = 22;
const NAV_CALL_TO_ACTION_HEIGHT = 40;

// shadows.focusRing is tuned for light surfaces, so the dark navigation uses a translucent outline instead
const NAV_FOCUS_OUTLINE_COLOR = `color-mix(in srgb, ${colors.nav.textActive} 55%, transparent)`;

export const navFocusVisible = css`
  &:focus-visible {
    outline: 2px solid ${NAV_FOCUS_OUTLINE_COLOR};
    outline-offset: 2px;
  }
`;

// The accent call to action of the left navigation ("New post" for members, "Create account" for visitors)
export const navCallToActionStyle = css`
  align-items: center;
  background: ${colors.accent};
  border: none;
  border-radius: 10px;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.16);
  color: ${colors.white};
  cursor: pointer;
  display: flex;
  flex-shrink: 0;
  font-family: ${fonts.family.navigation};
  font-size: 14px;
  font-weight: ${fonts.weight.semiBold};
  gap: 8px;
  height: ${NAV_CALL_TO_ACTION_HEIGHT}px;
  justify-content: center;
  letter-spacing: -0.006em;
  margin-top: 20px;
  padding: 0 16px;
  position: relative;
  transition: background 0.15s ease;
  width: 100%;

  svg {
    flex-shrink: 0;
  }

  /* Touch devices keep :hover applied after a tap, so the hover background is limited to real pointers */
  @media (hover: hover) {
    &:hover {
      background: ${colors.accentHover};
    }
  }

  ${navFocusVisible};

  @media (max-width: ${breakpoints.tablet}) {
    gap: 0;
    padding: 0;
    width: ${NAV_CALL_TO_ACTION_HEIGHT}px;
  }

  @media (prefers-reduced-motion: no-preference) {
    transition:
      background 0.15s ease,
      transform 0.15s ease;

    &:active {
      transform: scale(0.98);
    }
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
  font-family: ${fonts.family.navigation};
  font-weight: ${({$isActive}) => ($isActive ? fonts.weight.semiBold : fonts.weight.medium)};
  gap: 4px;
  min-width: 48px;
  padding: 6px 4px;
  position: relative;
  text-decoration: none;
  transition: color 0.15s ease;

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

// The soft pill behind a bottom navigation icon, the phone version of the highlighted row in the left navigation
export const bottomNavIconStyle = css<{$isActive: boolean}>`
  background: ${({$isActive}) => ($isActive ? colors.nav.active : 'transparent')};
  border-radius: ${radii.pill};
  display: flex;
  padding: 4px ${BOTTOM_NAV_ICON_PADDING_X}px;
  position: relative;
  transition: background 0.15s ease;

  svg {
    color: ${({$isActive}) => ($isActive ? colors.nav.iconActive : 'currentColor')};
    flex-shrink: 0;
  }
`;

export const bottomNavTextStyle = css`
  font-size: 11px;
  letter-spacing: -0.006em;
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
