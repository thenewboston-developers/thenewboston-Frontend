import styled from 'styled-components';
import {breakpoints} from 'styles';

interface RowProps {
  horizontalgap?: string;
  verticalgap?: string;
}

export const Row = styled.div<RowProps>`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: ${(props) => props.verticalgap || '16px'} ${(props) => props.horizontalgap || '16px'};
`;

export const Col = styled.div<{size: number}>`
  grid-column: span ${(props) => props.size};

  @media (max-width: ${breakpoints.tablet}) {
    grid-column: span 12;
  }
`;
