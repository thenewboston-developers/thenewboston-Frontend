import MdiIcon from '@mdi/react';

import styled from 'styled-components';

const HEIGHT = '24px';

export const Container = styled.div<{$isActive: boolean}>`
  align-items: center;
  background: ${({$isActive}) => ($isActive ? 'rgba(208, 215, 222, 0.32)' : 'transparent')};
  display: flex;
  justify-content: space-between;
  padding: 8px 12px;
  transition: background 0.3s ease;

  &:hover {
    background: rgba(208, 215, 222, 0.32);
    cursor: pointer;
    text-decoration: none;
  }
`;

export const Icon = styled(MdiIcon)`
  color: #777;
`;

export const IconWrapper = styled.div`
  align-items: center;
  border-radius: 50%;
  display: flex;
  height: ${HEIGHT};
  justify-content: center;
  padding: 4px;
  transition: background-color 0.3s, color 0.3s;
  width: ${HEIGHT};

  &:hover {
    background: rgba(208, 215, 222, 0.64);
  }
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
