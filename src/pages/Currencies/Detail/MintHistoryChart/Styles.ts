import styled from 'styled-components';

import {breakpoints, cardStyle, colors, fonts} from 'styles';

export const ChartCaption = styled.p`
  color: ${colors.secondary};
  font-size: 14px;
  line-height: 1.5;
  margin: 4px 0 0;
`;

export const ChartHeader = styled.div`
  margin-bottom: 20px;
`;

export const ChartTitle = styled.h2`
  color: ${colors.primary};
  font-size: 18px;
  font-weight: ${fonts.weight.semiBold};
  letter-spacing: -0.02em;
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
