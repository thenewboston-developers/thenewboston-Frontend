import styled from 'styled-components';

import {toolbarStyle} from 'styles';

export const Container = styled.div`
  ${toolbarStyle};
  gap: 16px;
`;

export const Left = styled.div`
  flex: 1;
`;

export const MenuItems = styled.div<{$isCentered: boolean}>`
  align-items: center;
  display: flex;
  gap: 8px;
  justify-content: ${({$isCentered}) => ($isCentered ? 'center' : 'flex-start')};
`;

export const Right = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
`;
