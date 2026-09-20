import {Link as ULink} from 'react-router-dom';
import styled from 'styled-components';

import {breakpoints, colors, fonts, radii, shadows, TOOLBAR_HEIGHT} from 'styles';

// The desktop link is as tall as the toolbar. Its focus ring is inset vertically, so it frames the label like the ring of
// a button would instead of touching the top of the toolbar and colliding with the underline of the active link
const DESKTOP_FOCUS_RING_INSET = 8;
// The toolbar draws its 1px bottom border inside of its own height, the link fills the space that is left
const DESKTOP_HEIGHT = TOOLBAR_HEIGHT - 1;
const HORIZONTAL_PADDING = 12;
// Narrow screens trade some padding for room, so toolbars with an action button still fit at a width of 320px
const MINI_HORIZONTAL_PADDING = 8;
const MOBILE_HEIGHT = 40;

export const Container = styled(ULink)<{$isActive: boolean; $isMobileDevice: boolean}>`
  align-items: center;
  background: ${({$isActive, $isMobileDevice}) => ($isActive && $isMobileDevice ? colors.whiteHover : 'transparent')};
  border-radius: ${({$isMobileDevice}) => ($isMobileDevice ? radii.small : '0')};
  color: ${({$isActive}) => ($isActive ? colors.primary : colors.secondary)};
  display: flex;
  flex-shrink: 0;
  font-size: 14px;
  font-weight: ${({$isActive}) => ($isActive ? fonts.weight.semiBold : fonts.weight.medium)};
  height: ${({$isMobileDevice}) => ($isMobileDevice ? `${MOBILE_HEIGHT}px` : `${DESKTOP_HEIGHT}px`)};
  outline: none;
  padding: ${`0 ${HORIZONTAL_PADDING}px`};
  position: relative;
  transition:
    background 0.15s ease,
    color 0.15s ease;
  white-space: nowrap;

  &::after {
    background: ${colors.accent};
    border-radius: 2px 2px 0 0;
    bottom: -1px;
    content: '';
    display: ${({$isActive, $isMobileDevice}) => ($isActive && !$isMobileDevice ? 'block' : 'none')};
    height: 2px;
    left: ${`${HORIZONTAL_PADDING}px`};
    position: absolute;
    right: ${`${HORIZONTAL_PADDING}px`};
  }

  &:focus-visible::before {
    border-radius: ${radii.small};
    bottom: ${({$isMobileDevice}) => ($isMobileDevice ? '0' : `${DESKTOP_FOCUS_RING_INSET}px`)};
    box-shadow: inset ${shadows.focusRing};
    content: '';
    left: 0;
    pointer-events: none;
    position: absolute;
    right: 0;
    top: ${({$isMobileDevice}) => ($isMobileDevice ? '0' : `${DESKTOP_FOCUS_RING_INSET}px`)};
  }

  &:hover {
    background: ${({$isMobileDevice}) => ($isMobileDevice ? colors.whiteHover : 'transparent')};
    color: ${colors.primary};
    cursor: pointer;
    text-decoration: none;
  }

  @media (max-width: ${breakpoints.mini}) {
    padding: ${`0 ${MINI_HORIZONTAL_PADDING}px`};

    &::after {
      left: ${`${MINI_HORIZONTAL_PADDING}px`};
      right: ${`${MINI_HORIZONTAL_PADDING}px`};
    }
  }
`;
