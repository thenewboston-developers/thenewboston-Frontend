import styled from 'styled-components';

import {analyticsScrollRoot} from 'utils/analyticsAttributes';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
`;

export const OutletContainer = styled.div.attrs(analyticsScrollRoot)`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
`;
