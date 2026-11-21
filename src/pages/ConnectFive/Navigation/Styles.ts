import {Link as ULink} from 'react-router-dom';
import styled from 'styled-components';

import {breakpoints, colors, fonts, shadows, toolbarStyle} from 'styles';

export const BackLink = styled(ULink)`
  align-items: center;
  border-radius: 8px;
  color: ${colors.secondary};
  display: inline-flex;
  font-size: 14px;
  font-weight: ${fonts.weight.semiBold};
  justify-self: start;
  min-height: 44px;
  padding: 0 12px;
  text-decoration: none;
  white-space: nowrap;

  &:focus-visible {
    box-shadow: ${shadows.focusRing};
    outline: none;
  }

  &:hover {
    background: ${colors.whiteHover};
    color: ${colors.primary};
  }
`;

export const Container = styled.nav`
  ${toolbarStyle};
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

export const Right = styled.div`
  @media (max-width: ${breakpoints.mobile}) {
    display: none;
  }
`;
