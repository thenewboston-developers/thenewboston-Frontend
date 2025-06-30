import styled from 'styled-components';

import {breakpoints} from 'styles';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;
  max-width: 1200px;
  padding: 24px 16px;
  width: 100%;

  @media (max-width: ${breakpoints.tablet}) {
    padding: 16px;
  }
`;

export const Content = styled.div`
  max-width: 600px;
  width: 100%;
`;
