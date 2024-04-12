import styled from 'styled-components';
import {breakpoints} from 'styles';

export const Container = styled.div`
  padding: 24px 32px;
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 16px;
`;

export const TopContributorsCard = styled.div`
  grid-column: span 4;

  @media (max-width: ${breakpoints.tablet}) {
    grid-column: span 12;
  }
`;

export const TotalContributionsChartCard = styled.div`
  grid-column: span 8;

  @media (max-width: ${breakpoints.tablet}) {
    grid-column: span 12;
  }
`;
