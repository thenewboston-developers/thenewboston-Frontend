import styled from 'styled-components';

import {breakpoints, cardStyle, colors, fonts} from 'styles';

export const ChartTitle = styled.h3`
  color: ${colors.primary};
  font-size: 16px;
  font-weight: ${fonts.weight.semiBold};
  letter-spacing: -0.01em;
  margin-bottom: 16px;
`;

export const ChartWrapper = styled.div`
  font-size: 12px;
  font-variant-numeric: tabular-nums;
  min-width: 0;
`;

export const Container = styled.div`
  ${cardStyle};
  min-width: 0;
  padding: 24px;

  @media (max-width: ${breakpoints.mobile}) {
    padding: 16px;
  }
`;

export const LoaderWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  min-height: 300px;
`;
