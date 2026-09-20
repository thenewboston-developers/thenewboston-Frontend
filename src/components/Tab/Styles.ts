import styled from 'styled-components';

import {colors, fonts, radii, shadows} from 'styles';

const HEIGHT = 32;

export const Container = styled.div<{$isActive?: boolean}>`
  align-items: center;
  background: ${({$isActive}) => ($isActive ? colors.white : 'transparent')};
  border-radius: ${radii.small};
  box-shadow: ${({$isActive}) => ($isActive ? shadows.card : 'none')};
  color: ${({$isActive}) => ($isActive ? colors.primary : colors.secondary)};
  cursor: pointer;
  display: flex;
  flex-shrink: 0;
  font-size: 13px;
  font-weight: ${({$isActive}) => ($isActive ? fonts.weight.semiBold : fonts.weight.medium)};
  gap: 8px;
  height: ${`${HEIGHT}px`};
  justify-content: center;
  outline: none;
  padding: 0 14px;
  transition:
    background 0.15s ease,
    box-shadow 0.15s ease,
    color 0.15s ease;
  user-select: none;
  white-space: nowrap;

  &:focus-visible {
    box-shadow: ${({$isActive}) => ($isActive ? `${shadows.card}, ${shadows.focusRing}` : shadows.focusRing)};
  }

  &:hover {
    color: ${colors.primary};
  }
`;
