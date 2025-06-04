import styled from 'styled-components';

import {breakpoints, pagePadding} from 'styles';

export const Container = styled.div`
  ${pagePadding};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  min-height: 100%;
`;

export const Grid = styled.div`
  align-items: start;
  display: grid;
  gap: 12px;
  grid-template-columns: min-content auto;

  @media (max-width: ${breakpoints.tablet}) {
    grid-template-columns: auto;
  }
`;
