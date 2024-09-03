import UIcon from 'components/Icon';
import styled from 'styled-components';
import {colors} from 'styles';
import {Menu, Option} from 'styles/components/DropMenuStyle';

export const Icon = styled(UIcon)`
  margin-right: 0.3rem;
`;

export const FilterButton = styled.div<{$isOpen: boolean}>`
  background: ${({$isOpen = false}) => ($isOpen ? colors.whiteHover : 'none')};
  color: ${({$isOpen = false}) => ($isOpen ? colors.lightBlue : 'none')};
  &:hover {
    color: ${colors.lightBlue};
    cursor: pointer;
  }
  display: inline-flex;
  align-items: center;
  border: 1px solid;
  border-radius: 24px;
  padding: 0.2rem 0.6rem;
  font-size: small;
`;

export const DropMenu = styled(Menu)`
  border-radius: 14px;
  padding: 10px 14px;
`;

export const DropMenuLabel = styled.span`
  font-weight: bold;
  font-size: smaller;
  color: dimgray;
`;

export const MenuOption = styled(Option)<{$MenuIndex: number}>`
  border-top: ${({$MenuIndex = 0}) => ($MenuIndex === 0 ? 'none' : `1px solid ${colors.border}`)};
  padding: 0.9rem 0.2rem;
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
