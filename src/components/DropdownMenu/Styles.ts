import styled from 'styled-components';
import {colors} from 'styles';
import {Menu, Option} from 'styles/components/DropMenuStyle';

import Icon from 'components/Icon';

export const MenuIcon = styled(Icon)<{$isOpen: boolean}>`
  background: ${({$isOpen = false}) => ($isOpen ? colors.whiteHover : 'none')};
  color: ${({$isOpen = false}) => ($isOpen ? colors.lightBlue : 'none')};
  &:hover {
    color: ${colors.lightBlue};
    cursor: pointer;
  }
`;

export const DropMenu = styled(Menu)`
  border-radius: 14px;
  padding: 10px 14px;
`;

export const MenuOption = styled(Option)<{$MenuIndex: number}>`
  border-top: ${({$MenuIndex = 0}) => ($MenuIndex === 0 ? 'none' : `1px solid ${colors.border}`)};
  padding: 2px 0px;
`;

export const Div = styled.div<{$label: string}>`
  align-items: center;
  color: ${({$label = ''}) => ($label === 'Delete' ? colors.palette.red['500'] : colors.black)};
  display: flex;
  font-weight: 600;
  gap: 5px;
  justify-content: center;
  &:hover {
    color: ${({$label = ''}) => ($label === 'Delete' ? colors.palette.red['600'] : colors.lightBlue)};
  }
`;
