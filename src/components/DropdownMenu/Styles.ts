import Icon from 'components/Icon';
import styled from 'styled-components';
import {colors} from 'styles';
import {Menu, Option} from 'styles/components/DropMenuStyle';

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
  padding: 12px 18px;
`;

export const MenuOption = styled(Option)<{$MenuIndex: number}>`
  padding: 5px 0px;
  border-top: ${({$MenuIndex = 0}) => ($MenuIndex === 0 ? 'none' : `1px solid ${colors.border}`)};
`;

export const Div = styled.div<{$label: string}>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  font-weight: 600;
  color: ${({$label = ''}) => ($label === 'Delete' ? colors.palette.red['500'] : colors.black)};
  &:hover {
    color: ${({$label = ''}) => ($label === 'Delete' ? colors.palette.red['600'] : colors.lightBlue)};
  }
`;
