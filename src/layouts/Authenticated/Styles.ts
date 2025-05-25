import styled from 'styled-components';
import {breakpoints} from 'styles';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 260px 1fr;
  height: 100vh;
  overflow: hidden;

  @media (max-width: ${breakpoints.tablet}) {
    grid-template-columns: min-content 1fr;
  }
`;
