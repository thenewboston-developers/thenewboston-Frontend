import styled from 'styled-components';

import {colors} from 'styles';

export const ChartTitle = styled.h3`
  color: ${colors.black};
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
`;

export const ChartWrapper = styled.div`
  background: ${colors.white};
  border: 1px solid ${colors.border};
  border-radius: 12px;
  padding: 24px;
`;

export const Container = styled.div`
  margin-bottom: 32px;
`;

export const LoaderWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  min-height: 300px;
`;
