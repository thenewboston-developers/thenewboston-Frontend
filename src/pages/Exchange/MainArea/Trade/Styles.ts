import styled from 'styled-components';

import {breakpoints} from 'styles';

export const Container = styled.div`
  height: 100%;
  padding: 16px;
`;

export const Grid = styled.div`
  display: grid;
  gap: 12px;
  grid-template-columns: min-content auto;
  margin-top: 12px;

  @media (max-width: ${breakpoints.tablet}) {
    grid-template-columns: auto;
  }
`;
