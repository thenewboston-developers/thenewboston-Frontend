import MdiIcon from '@mdi/react';
import styled from 'styled-components';
import {colors} from 'styles';

export const MenuTitle = styled.div<{$open: boolean}>`
  background: ${colors.background};
  border-radius: 8px;
  cursor: pointer;
  padding: 9px;
  position: relative;
  &:hover {
    cursor: pointer;
  }
`;

export const MenuItems = styled.ul<{$open: boolean}>`
  background-color: ${colors.white};
  border-left: 1px solid ${colors.white};
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.16);
  color: ${colors.black};
  list-style: none;
  margin: 0;
  max-height: ${({$open}) => ($open ? '160px' : '0')};
  min-width: 130px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  right: 0;
  top: 46px;
  transition: max-height 250ms;
  z-index: 100;
`;

export const MenuItem = styled.li`
  a {
    align-items: center;
    color: inherit;
    display: flex;
    justify-content: center;
    padding: 4px 16px;
    text-align: center;
    text-decoration: none;
    transition: background-color 500ms;
    &:hover {
      background-color: ${colors.border};
    }
  }
`;

export const Icon = styled(MdiIcon)`
  color: ${colors.spanishGray};
`;
