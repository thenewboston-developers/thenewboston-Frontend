import styled from 'styled-components';

import {analyticsScrollRoot} from 'utils/analyticsAttributes';

export const Container = styled.div.attrs(analyticsScrollRoot)`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
`;
