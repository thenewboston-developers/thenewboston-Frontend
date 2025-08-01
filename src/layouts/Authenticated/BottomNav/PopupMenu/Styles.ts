import Icon from '@mdi/react';
import styled, {css} from 'styled-components';

import {colors, fonts} from 'styles';

export const Menu = styled.div<{$isOpen: boolean}>`
  background: ${colors.backgroundDark};
  border-radius: 8px;
  border: 1px solid ${colors.border};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  gap: 4px;
  opacity: 0;
  padding: 8px;
  position: fixed;
  transform: translateY(10px);
  transition: all 0.2s ease-in-out;
  visibility: hidden;
  z-index: 9999;

  ${({$isOpen}) =>
    $isOpen &&
    css`
      opacity: 1;
      transform: translateY(0);
      visibility: visible;
    `}
`;

export const MenuIcon = styled(Icon)`
  color: ${colors.palette.gray[400]};
  flex-shrink: 0;
`;

export const MenuItem = styled.div<{$isActive: boolean}>`
  align-items: center;
  color: ${colors.palette.gray[300]};
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 4px 8px;
  position: relative;
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: ${colors.palette.blue[300]};

    svg {
      color: ${colors.palette.blue[300]};
    }
  }
`;

export const MenuOption = styled.div`
  align-items: center;
  background: transparent;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  gap: 12px;
  padding: 12px 16px;
  transition: background 0.2s;

  &:hover {
    background: ${colors.palette.gray[800]};
  }
`;

export const OptionLabel = styled.div`
  color: ${colors.palette.gray[300]};
  font-size: 14px;
  font-weight: ${fonts.weight.regular};
  white-space: nowrap;
`;
