import styled from 'styled-components';

import {breakpoints} from 'styles';

export const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;

  /* Full width buttons are easier to reach on phones */
  @media (max-width: ${breakpoints.mini}) {
    flex-direction: column;

    > * {
      width: 100%;
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin: 0 auto;
  max-width: 720px;
  width: 100%;
`;
