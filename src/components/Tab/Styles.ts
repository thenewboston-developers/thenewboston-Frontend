import styled from 'styled-components';

import {colors} from 'styles';

export const Container = styled.div<{$isActive?: boolean}>`
  background: ${({$isActive}) => ($isActive ? colors.white : 'transparent')};
  border-radius: 100px;
  color: ${({$isActive}) => ($isActive ? colors.black : colors.primary)};
  font-size: 13px;
  font-weight: ${({$isActive}) => ($isActive ? 600 : 400)};
  padding: 8px 16px;
  display: flex;
  align-items: center;
  box-shadow: ${({$isActive}) => ($isActive ? '0px 2px 2px 0px rgba(155, 156, 157, 0.25)' : 'none')};
  gap: 10px;

  &:hover {
    color: ${({$isActive}) => ($isActive ? colors.black : '#4458b8')};
    cursor: pointer;
  }
`;
