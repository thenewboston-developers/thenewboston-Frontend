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
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 5px;
`;

export const Right = styled.div``;

export const Title = styled.span`
  font-weight: 600;
  margin-right: 10px;
`;
export const Dot = styled.span<{$marginLeft?: string}>`
  margin-left: ${({$marginLeft}) => $marginLeft || '10px'};
  margin-right: 5px;
  font-weight: 600;
`;
