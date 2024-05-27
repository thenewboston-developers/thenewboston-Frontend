import styled from 'styled-components';
import {breakpoints} from 'styles';

export const Container = styled.div`
  height: 100%;
  width: 100%;
`;
export const Grid = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(12, 1fr);
  word-break: break-word;
  width: 100%;
  @media (max-width: ${breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;
