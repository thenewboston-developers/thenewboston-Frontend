import styled from 'styled-components';
import UIcon from '@mdi/react';

import {breakpoints, colors, fonts} from 'styles';

const HEIGHT = 48;

export const Container = styled.div`
  align-items: center;
  background: ${colors.palette.darkGray['300']};
  border-radius: ${`${HEIGHT / 2}px`};
  color: ${colors.white};
  display: flex;
  font-weight: ${fonts.weight.bold};
  height: ${`${HEIGHT}px`};
  justify-content: center;
  margin-top: 24px;
  padding: 0 12px;
  transition: background 0.3s ease;

  &:hover {
    background: ${colors.palette.darkGray['400']};
    cursor: pointer;
    text-decoration: none;
  }
`;

export const Icon = styled(UIcon)`
  @media (min-width: ${breakpoints.tablet}) {
    display: none;
  }
`;

export const Text = styled.div`
  font-size: 17px;

  @media (max-width: ${breakpoints.tablet}) {
    display: none;
  }
`;
