import styled from 'styled-components';

import Icon from 'components/Icon';
import {colors, fonts} from 'styles';
import {Menu, Option} from 'styles/components/DropMenuStyle';

export const Div = styled.div<{$label: string}>`
  align-items: center;
  color: ${({$label = ''}) => ($label === 'Delete' ? colors.palette.red[500] : colors.palette.gray[700])};
  display: flex;
  font-weight: ${fonts.weight.medium};
  justify-content: flex-start;
  transition: color 0.15s ease;

  &:hover {
    color: ${({$label = ''}) => ($label === 'Delete' ? colors.palette.red[600] : colors.black)};
  }
`;

export const DropMenu = styled(Menu)<{$isOpen?: boolean}>`
  animation: fadeIn 0.2s ease;
  background: ${colors.white};
  border: 1px solid ${colors.palette.gray[200]};
  border-radius: 10px;
  box-shadow:
    0 10px 25px rgba(0, 0, 0, 0.1),
    0 4px 10px rgba(0, 0, 0, 0.05);
  min-width: 160px;
  overflow: hidden;
  padding: 4px;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const MenuIcon = styled(Icon)<{$isOpen: boolean}>`
  background: ${({$isOpen = false}) => ($isOpen ? 'rgba(144, 157, 171, 0.08)' : 'transparent')};
  border-radius: 6px;
  color: ${({$isOpen = false}) => ($isOpen ? colors.palette.gray[700] : colors.palette.gray[600])};
  padding: 2px;
  transition:
    background 0.3s ease,
    color 0.2s ease;

  &:hover {
    background: rgba(144, 157, 171, 0.08);
    color: ${colors.palette.gray[700]};
    cursor: pointer;
  }
`;

export const MenuOption = styled(Option)<{$MenuIndex: number}>`
  background: transparent;
  border-radius: 6px;
  font-size: 13px;
  margin: 1px 0;
  padding: 8px 10px;
  transition: background 0.25s ease;

  &:hover {
    background: rgba(144, 157, 171, 0.08);
  }

  &:active {
    background: rgba(144, 157, 171, 0.12);
  }
`;
