import styled, {css} from 'styled-components';

import {colors, fonts, radii, shadows} from 'styles';

const BUTTON_SIZE = 36;

const buttonMixin = css`
  align-items: center;
  background: ${colors.white};
  border: 1px solid ${colors.borderSubtle};
  border-radius: ${radii.small};
  color: ${colors.primary};
  cursor: pointer;
  display: flex;
  flex-shrink: 0;
  font-family: ${fonts.family.default};
  font-size: 13px;
  font-variant-numeric: tabular-nums;
  font-weight: ${fonts.weight.medium};
  height: ${`${BUTTON_SIZE}px`};
  justify-content: center;
  min-width: ${`${BUTTON_SIZE}px`};
  outline: none;
  padding: 0;
  transition:
    background 0.15s ease,
    border-color 0.15s ease,
    box-shadow 0.15s ease,
    color 0.15s ease;

  /* The border shares the color of shadows.focusRing, so the border and the ring read as a single outline */
  &:focus-visible {
    border-color: ${colors.palette.blue[500]};
    box-shadow: ${shadows.focusRing};
  }
`;

export const Container = styled.nav`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  justify-content: center;
`;

export const Ellipsis = styled.span`
  align-items: center;
  color: ${colors.secondary};
  display: flex;
  flex-shrink: 0;
  font-size: 13px;
  height: ${`${BUTTON_SIZE}px`};
  justify-content: center;
  user-select: none;
  width: 20px;
`;

export const NavigationButton = styled.button`
  ${buttonMixin};

  &:hover:not(:disabled) {
    background: ${colors.whiteHover};
    border-color: ${colors.borderDarker};
  }

  &:disabled {
    background: transparent;
    color: ${colors.palette.gray[400]};
    cursor: not-allowed;
  }
`;

export const PageButton = styled.button<{$isActive: boolean}>`
  ${buttonMixin};
  background: ${({$isActive}) => ($isActive ? colors.primary : colors.white)};
  border-color: ${({$isActive}) => ($isActive ? colors.primary : colors.borderSubtle)};
  color: ${({$isActive}) => ($isActive ? colors.white : colors.primary)};
  cursor: ${({$isActive}) => ($isActive ? 'default' : 'pointer')};
  font-weight: ${({$isActive}) => ($isActive ? fonts.weight.semiBold : fonts.weight.medium)};
  padding: 0 6px;

  &:hover {
    background: ${({$isActive}) => ($isActive ? colors.primary : colors.whiteHover)};
    border-color: ${({$isActive}) => ($isActive ? colors.primary : colors.borderDarker)};
  }
`;
