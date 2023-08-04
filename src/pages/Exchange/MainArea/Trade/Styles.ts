import styled from 'styled-components';

import UTabs from 'components/Tabs';
import {breakpoints} from 'styles';

export const Container = styled.div`
  height: 100%;
  padding: 16px;
`;

export const Grid = styled.div`
  display: grid;
  gap: 12px;
  grid-template-columns: min-content auto;
  margin-top: 12px;

  @media (max-width: ${breakpoints.mobile}) {
    grid-template-columns: auto;
  }
`;

export const TabContent = styled.div``;

export const Tabs = styled(UTabs)`
  margin-top: 16px;
`;
