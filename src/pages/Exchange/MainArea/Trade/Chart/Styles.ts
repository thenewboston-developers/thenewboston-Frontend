import styled from 'styled-components';
import {colors} from 'styles';

export const Container = styled.div`
  overflow: hidden;
`;

export const LastPrice = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-bottom: 8px;
`;

export const ChartBackground = styled.div`
  background: ${colors.white};
  border-radius: 16px;
  box-shadow: 0 2px 4px rgb(0 0 0 / 8%);
  padding: 20px;
`;
