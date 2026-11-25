import {Link as ULink} from 'react-router-dom';
import styled from 'styled-components';

import UToolbarMenuLink from 'components/ToolbarMenuLink';
import {breakpoints, fonts, toolbarStyle} from 'styles';

import {classic} from '../theme';

export const BackLink = styled(ULink)`
  align-items: center;
  border-radius: 8px;
  color: #6b5847;
  display: inline-flex;
  font-size: 14px;
  font-weight: ${fonts.weight.semiBold};
  justify-self: start;
  min-height: 44px;
  padding: 0 12px;
  text-decoration: none;
  white-space: nowrap;

  &:focus-visible {
    box-shadow: 0 0 0 2px ${classic.boardRim};
    outline: none;
  }

  &:hover {
    background: #eee4d6;
    color: ${classic.accentInk};
  }
`;

export const Container = styled.nav`
  ${toolbarStyle};
  background: #fffaf2;
  border-bottom-color: #e4d7c6;
  display: grid;
  flex-shrink: 0;
  gap: 8px;
  grid-template-columns: 1fr auto 1fr;

  @media (max-width: ${breakpoints.mobile}) {
    grid-template-columns: auto 1fr;
    padding: 0 12px;
  }
`;

export const MenuItems = styled.div`
  align-items: center;
  display: flex;
  gap: 8px;

  @media (max-width: ${breakpoints.mobile}) {
    gap: 0;
    justify-content: flex-end;
  }
`;

export const MenuLink = styled(UToolbarMenuLink)`
  color: #6b5847;

  &[aria-current='page'],
  &:hover {
    color: ${classic.accentInk};
  }

  &::after {
    background: ${classic.boardRim};
  }

  &:focus-visible::before {
    box-shadow: inset 0 0 0 2px ${classic.boardRim};
  }
`;

export const Right = styled.div`
  @media (max-width: ${breakpoints.mobile}) {
    display: none;
  }
`;
