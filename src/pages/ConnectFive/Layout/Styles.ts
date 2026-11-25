import styled from 'styled-components';

import {analyticsScrollRoot} from 'utils/analyticsAttributes';

export const Container = styled.div`
  background: #f5f0e8;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
`;

export const OutletContainer = styled.div.attrs(analyticsScrollRoot)`
  height: 100%;
  overflow-y: auto;
`;
