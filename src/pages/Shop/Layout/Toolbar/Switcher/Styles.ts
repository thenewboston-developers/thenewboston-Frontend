import styled from 'styled-components';
import UMdiIcon from '@mdi/react';

import {colors, fonts} from 'styles';

export const Container = styled.div`
  align-items: center;
  background: #f4f5f6;
  border-radius: 8px;
  display: flex;
  height: 38px;
  padding: 4px 5px;
`;

export const Icon = styled(UMdiIcon)<{$isActive?: boolean}>`
  color: ${({$isActive}) => ($isActive ? colors.primary : '#747474')};
  margin-right: 6px;
`;

export const Item = styled.div<{$isActive?: boolean}>`
  align-items: center;
  background: ${({$isActive}) => ($isActive ? '#fff' : 'transparent')};
  border-radius: 8px;
  box-shadow: ${({$isActive}) => ($isActive ? '0 2px 4px rgb(0 0 0 / 8%)' : 'none')};
  color: ${({$isActive}) => ($isActive ? colors.primary : '#747474')};
  display: flex;
  font-size: 12px;
  font-weight: ${fonts.weight.semiBold};
  height: 100%;
  padding: 0 16px;

  &:hover {
    cursor: pointer;
  }
`;
