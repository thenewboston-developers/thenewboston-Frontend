import styled from 'styled-components';

import {colors} from 'styles';

export const Container = styled.div`
  background: #fff;
  border-radius: 14px;
  border: 1px solid ${colors.border};
  box-shadow: 0 3px 6px rgb(140 149 159 / 15%);
  display: flex;
  justify-content: space-between;
  padding: 16px;
`;

export const Left = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 5px;
  justify-content: space-between;
`;

export const Right = styled.div``;

export const Title = styled.span`
  font-weight: 600;
  margin-right: 10px;
`;
export const Dot = styled.span<{$marginLeft?: string}>`
  font-weight: 600;
  margin-left: ${({$marginLeft}) => $marginLeft || '10px'};
  margin-right: 5px;
`;
