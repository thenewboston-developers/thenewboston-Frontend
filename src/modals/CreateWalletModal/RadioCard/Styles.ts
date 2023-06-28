import styled from 'styled-components';

import {colors} from 'styles';

// TODO: Unify styling
export const Container = styled.div<{$isActive: boolean}>`
  align-items: center;
  border-radius: 4px;
  border: 2px solid ${({$isActive}) => ($isActive ? colors.palette.blue['300'] : colors.border)};
  display: flex;
  flex: auto;
  justify-content: center;
  margin: 6px;
  padding: 16px;
  white-space: nowrap;

  &:hover {
    cursor: pointer;
  }
`;
