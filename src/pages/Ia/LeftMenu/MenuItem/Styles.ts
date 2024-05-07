import MdiIcon from '@mdi/react';
import styled from 'styled-components';

import UDropdownMenu from 'components/DropdownMenu';
import {colors} from 'styles';

const HEIGHT = '24px';

export const Container = styled.div<{$isActive: boolean}>`
  align-items: center;
  color: ${({$isActive}) => ($isActive ? `${colors.palette.blue[300]}` : `${colors.black}`)};
  display: flex;
  justify-content: space-between;
  padding: 12px 12px;
  transition: background 0.3s ease;

  &:hover {
    background: ${colors.palette.blue[100]};
    cursor: pointer;
    text-decoration: none;
  }
`;

export const DropdownMenu = styled(UDropdownMenu)`
  margin-right: -8px;
  height: 24px;
  width: 24px;
`;

export const Icon = styled(MdiIcon)`
  color: #888;
`;

export const Text = styled.div`
  display: flex;
  flex-direction: column;
  line-height: ${HEIGHT};
  margin-left: 8px;
`;

export const Tools = styled.div`
  align-items: center;
  display: flex;
  gap: 2px;
`;
