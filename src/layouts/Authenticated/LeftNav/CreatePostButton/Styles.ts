import UIcon from '@mdi/react';
import styled from 'styled-components';

import {navFocusVisible, visuallyHidden} from 'layouts/Authenticated/mixins';
import {breakpoints, colors, fonts, radii} from 'styles';

const HEIGHT = 44;

export const Button = styled.button`
  align-items: center;
  background: ${colors.accent};
  border: none;
  border-radius: ${radii.medium};
  color: ${colors.white};
  cursor: pointer;
  display: flex;
  flex-shrink: 0;
  font-family: ${fonts.family.default};
  font-size: 15px;
  font-weight: ${fonts.weight.semiBold};
  gap: 8px;
  height: ${HEIGHT}px;
  justify-content: center;
  margin-top: 16px;
  padding: 0 16px;
  position: relative;
  transition: background 0.15s ease;
  width: 100%;

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
    width: ${HEIGHT}px;
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

export const Icon = styled(UIcon)`
  flex-shrink: 0;
`;

export const Text = styled.span`
  @media (max-width: ${breakpoints.tablet}) {
    ${visuallyHidden};
  }
`;
