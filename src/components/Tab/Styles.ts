import styled from 'styled-components';

import {colors} from 'styles';

export const Container = styled.div<{$isActive?: boolean}>`
  background: ${({$isActive}) => ($isActive ? colors.palette.blue['400'] : 'transparent')};
  border-radius: 4px;
  color: ${({$isActive}) => ($isActive ? '#fff' : colors.black)};
  font-size: 13px;
  font-weight: 500;
  padding: 8px 16px;

  &:hover {
    color: ${({$isActive}) => ($isActive ? '#fff' : '#4458b8')};
    cursor: pointer;
  }
`;
