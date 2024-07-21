import styled from 'styled-components';
import {colors} from 'styles';

export const AmountContainer = styled.div`
  align-items: center;
  display: flex;
  gap: 10px;
  justify-content: space-between;
  line-height: 1.2;
  margin-bottom: 10px;
`;

export const Container = styled.div``;

export const ChartContainer = styled.div`
  background: ${colors.white};
  border-radius: 16px;
  border: 1px solid ${colors.border};
  box-shadow: 0 3px 6px rgb(140 149 159 / 15%);
  padding: 20px;
`;

export const ChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;
