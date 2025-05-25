import styled from 'styled-components';

import {colors} from 'styles';

const HEIGHT = 48;
const BORDER_RADIUS = HEIGHT / 2;

export const Container = styled.div`
  background: ${colors.lightGray};
  border-radius: ${`${BORDER_RADIUS}px`};
  border: 1px solid #dfdfdf;
  display: flex;
  height: ${`${HEIGHT}px`};
  overflow-x: auto;
  padding: 6px;
  width: fit-content;
`;
