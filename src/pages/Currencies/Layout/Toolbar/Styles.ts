import styled from 'styled-components';

import UButton from 'components/Button';
import {breakpoints, toolbarStyle} from 'styles';

// The links and the button need about 357px at their regular spacing. The tighter spacing on small screens (together
// with the narrower padding of ToolbarMenuLink) keeps the label of the button from being clipped down to 320px
export const Button = styled(UButton)`
  flex-shrink: 0;
  white-space: nowrap;

  @media (max-width: ${breakpoints.mini}) {
    padding: 0 12px;
  }
`;

export const Container = styled.div`
  ${toolbarStyle};
  flex-shrink: 0;
  gap: 8px;

  @media (max-width: ${breakpoints.mini}) {
    gap: 4px;
    padding: 0 12px;
  }
`;

export const MenuItems = styled.div`
  align-items: center;
  display: flex;
  gap: 8px;
  min-width: 0;

  @media (max-width: ${breakpoints.mini}) {
    gap: 0;
  }
`;
