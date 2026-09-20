import styled from 'styled-components';

import {breakpoints, pagePadding} from 'styles';

import {contentWidthStyle} from '../mixins';

const ORDER_TOOLS_WIDTH = 300;

export const Container = styled.div`
  ${pagePadding};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  min-height: 100%;
`;

// minmax(0, 1fr) lets the chart column shrink below the width of the rendered svg when the window gets narrower
export const Grid = styled.div`
  ${contentWidthStyle};
  align-items: start;
  display: grid;
  gap: 16px;
  grid-template-columns: ${`${ORDER_TOOLS_WIDTH}px`} minmax(0, 1fr);

  @media (max-width: ${breakpoints.tablet}) {
    grid-template-columns: minmax(0, 1fr);
  }
`;
