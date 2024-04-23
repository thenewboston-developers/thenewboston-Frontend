import styled from 'styled-components';
import {breakpoints} from 'styles';

interface RowProps {
  $horizontalGap?: string;
  $verticalGap?: string;
}

export const Row = styled.div<RowProps>`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: ${(props) => props.$verticalGap || '16px'} ${(props) => props.$horizontalGap || '16px'};
`;

export const Col = styled.div<{size: number}>`
  grid-column: span ${(props) => props.size};

  @media (max-width: ${breakpoints.tablet}) {
    grid-column: span 12;
  }
`;
