import {Link as ULink} from 'react-router-dom';
import UIcon from '@mdi/react';
import styled, {css} from 'styled-components';

import {navFocusVisible, visuallyHidden} from 'layouts/Authenticated/mixins';
import {breakpoints, colors, fonts, radii} from 'styles';

const ACTIVE_INDICATOR_HEIGHT = 20;
const ITEM_SIZE = 44;

const menuItemStyle = css<{$isActive: boolean}>`
  align-items: center;
  background: ${({$isActive}) => ($isActive ? colors.nav.active : 'transparent')};
  border: none;
  border-radius: ${radii.medium};
  color: ${({$isActive}) => ($isActive ? colors.nav.textActive : colors.nav.text)};
  cursor: pointer;
  display: flex;
  flex-shrink: 0;
  font-family: ${fonts.family.default};
  font-size: 15px;
  font-weight: ${({$isActive}) => ($isActive ? fonts.weight.semiBold : fonts.weight.medium)};
  gap: 14px;
  height: ${ITEM_SIZE}px;
  padding: 0 12px;
  position: relative;
  text-align: left;
  transition:
    background 0.15s ease,
    color 0.15s ease;
  width: 100%;

  &::before {
    background: ${colors.accent};
    border-radius: ${radii.pill};
    content: '';
    height: ${ACTIVE_INDICATOR_HEIGHT}px;
    left: 0;
    opacity: ${({$isActive}) => ($isActive ? 1 : 0)};
    position: absolute;
    top: calc(50% - ${ACTIVE_INDICATOR_HEIGHT / 2}px);
    transform: scaleY(${({$isActive}) => ($isActive ? 1 : 0.4)});
    transition: opacity 0.15s ease;
    width: 3px;

    @media (prefers-reduced-motion: no-preference) {
      transition:
        opacity 0.15s ease,
        transform 0.15s ease;
    }
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

export const Icon = styled(UIcon)`
  flex-shrink: 0;
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
