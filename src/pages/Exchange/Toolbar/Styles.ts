import styled from 'styled-components';

import {breakpoints, colors, fonts, toolbarStyle} from 'styles';

export const Brand = styled.div`
  color: ${colors.palette.blue[900]};
  font-size: 16px;
  font-weight: ${fonts.weight.bold};
  letter-spacing: -0.03em;

  @media (max-width: ${breakpoints.mini}) {
    display: none;
  }
`;

export const Caption = styled.div`
  color: ${colors.secondary};
  font-size: 12px;

  @media (max-width: ${breakpoints.tablet}) {
    display: none;
  }
`;

export const Container = styled.div`
  ${toolbarStyle};
  flex-shrink: 0;
  gap: 16px;

  @media (max-width: ${breakpoints.mini}) {
    justify-content: center;
  }
`;

export const MenuItems = styled.nav`
  align-items: center;
  display: flex;
  gap: 8px;
`;
