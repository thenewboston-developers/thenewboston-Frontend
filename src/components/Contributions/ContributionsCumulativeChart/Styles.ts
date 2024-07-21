import styled from 'styled-components';

import {colors} from 'styles';

export const Amount = styled.div`
  font-size: 18px;
  font-weight: 600;
  margin-left: 6px;
`;

export const AmountContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  line-height: 1.2;
  margin-bottom: 10px;
`;

export const Container = styled.div`
  background: ${colors.white};
  border-radius: 14px;
  box-shadow: 0 2px 4px rgb(0 0 0 / 8%);
  padding: 24px 32px;
`;

export const ChartHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
