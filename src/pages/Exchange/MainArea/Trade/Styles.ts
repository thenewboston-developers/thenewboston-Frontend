import styled from 'styled-components';

import {breakpoints, colors} from 'styles';

export const Container = styled.div`
  padding: 16px;
`;

export const Grid = styled.div`
  display: grid;
  gap: 12px;
  grid-template-columns: min-content auto;
  margin-top: 12px;

  @media (max-width: ${breakpoints.mobile}) {
    grid-template-columns: auto;
  }
`;

export const Tab = styled.div<{$isActive?: boolean}>`
  background: ${({$isActive}) => ($isActive ? colors.palette.blue['400'] : 'transparent')};
  border-radius: 4px;
  color: ${({$isActive}) => ($isActive ? '#fff' : colors.primary)};
  font-size: 13px;
  font-weight: 500;
  padding: 8px 16px;

  &:hover {
    color: ${({$isActive}) => ($isActive ? '#fff' : '#4458b8')};
    cursor: pointer;
  }
`;

export const TabContent = styled.div`
  border-radius: 4px;
  border: 1px solid ${colors.border};
  padding: 16px;
`;

export const Tabs = styled.div`
  display: flex;
  margin-top: 16px;
`;
