import {Link as ULink} from 'react-router-dom';
import styled, {css} from 'styled-components';
import UIcon from '@mdi/react';

import {breakpoints, fonts} from 'styles';

const HEIGHT = 48;

const menuItemStyle = css<{$isActive: boolean}>`
  align-items: center;
  background: ${({$isActive}) => ($isActive ? 'rgba(144, 157, 171, 0.08)' : 'transparent')};
  border-radius: ${`${HEIGHT / 2}px`};
  color: #adbac7;
  display: flex;
  font-weight: ${({$isActive}) => ($isActive ? fonts.weight.semiBold : fonts.weight.regular)};
  height: ${`${HEIGHT}px`};
  padding: 0 12px;
  transition: background 0.3s ease;

  &:hover {
    background: rgba(144, 157, 171, 0.12);
    cursor: pointer;
    text-decoration: none;
  }
`;

export const Icon = styled(UIcon)``;

export const MenuButton = styled.div<{$isActive: boolean}>`
  ${menuItemStyle}
`;

export const MenuLink = styled(ULink)<{$isActive: boolean}>`
  ${menuItemStyle}
`;

export const Text = styled.div`
  font-size: 20px;
  margin-left: 20px;

  @media (max-width: ${breakpoints.tablet}) {
    display: none;
  }
`;
