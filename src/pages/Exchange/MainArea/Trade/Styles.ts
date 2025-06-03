import styled from 'styled-components';

import {breakpoints} from 'styles';

export const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  min-height: 100%;
  padding: 24px 32px;

  @media (max-width: ${breakpoints.mobile}) {
    padding: 16px 24px;
  }
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
