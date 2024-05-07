import styled from 'styled-components';

import {breakpoints} from 'styles';

const HEIGHT = 48;
const BORDER_RADIUS = HEIGHT / 2;

export const Container = styled.div`
  background: #ececee;
  border-radius: ${`${BORDER_RADIUS}px`};
  border: 1px solid #dfdfdf;
  display: flex;
  height: ${`${HEIGHT}px`};
  overflow-x: auto;
  padding: 6px;

  @media (min-width: ${breakpoints.mobile}) {
    width: fit-content;
  }
`;
