import styled from 'styled-components';

import {breakpoints, colors} from 'styles';

export const Container = styled.div`
  display: grid;
  grid-template-rows: min-content min-content;

  @media (min-width: ${breakpoints.tablet}) {
    grid-template-columns: 30% 1fr;
    grid-template-rows: none;
  }
`;

export const FormContainer = styled.div`
  border-bottom: 1px solid ${colors.border};
  overflow-y: auto;
  padding: 24px 16px;

  @media (min-width: ${breakpoints.tablet}) {
    border-bottom: none;
  }
`;

export const ImagesContainer = styled.div`
  padding: 24px 16px;
`;
