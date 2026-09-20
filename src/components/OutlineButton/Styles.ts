import styled from 'styled-components';

import {colors, fonts, radii, shadows} from 'styles';

export const Button = styled.button`
  align-items: center;
  background: transparent;
  border: 1px solid ${colors.borderSubtle};
  border-radius: ${radii.pill};
  color: ${colors.secondary};
  cursor: pointer;
  display: flex;
  font-family: ${fonts.family.default};
  font-size: 13px;
  font-weight: ${fonts.weight.medium};
  gap: 6px;
  height: 34px;
  padding: 0 16px;
  transition:
    background 0.15s ease,
    border-color 0.15s ease,
    color 0.15s ease;
  white-space: nowrap;

  &:focus-visible {
    box-shadow: ${shadows.focusRing};
    outline: none;
  }

  @media (hover: hover) {
    &:hover {
      background: ${colors.whiteHover};
      border-color: ${colors.borderDarker};
      color: ${colors.primary};
    }
  }

  /* Stays below the hover block so the pressed background wins over the hover background */
  &:active {
    background: ${colors.palette.gray[200]};
  }

  svg {
    flex-shrink: 0;
  }
`;

export const ButtonText = styled.span`
  font-size: 13px;
  font-weight: ${fonts.weight.medium};
`;
