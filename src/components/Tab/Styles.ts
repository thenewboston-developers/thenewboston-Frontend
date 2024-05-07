import styled from 'styled-components';

import {colors} from 'styles';

const HEIGHT = 34;
const BORDER_RADIUS = HEIGHT / 2;

export const Container = styled.div<{$isActive?: boolean}>`
  align-items: center;
  background: ${({$isActive}) => ($isActive ? colors.white : 'transparent')};
  border-radius: ${`${BORDER_RADIUS}px`};
  box-shadow: ${({$isActive}) => ($isActive ? '0 2px 4px rgb(0 0 0 / 8%)' : 'none')};
  color: ${({$isActive}) => ($isActive ? colors.black : colors.primary)};
  display: flex;
  font-size: 13px;
  font-weight: ${({$isActive}) => ($isActive ? 600 : 400)};
  gap: 10px;
  height: ${`${HEIGHT}px`};
  padding: 8px 16px;

  &:hover {
    color: ${({$isActive}) => ($isActive ? colors.black : '#4458b8')};
    cursor: pointer;
  }
`;
