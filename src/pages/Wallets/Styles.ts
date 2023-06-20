import styled from 'styled-components';

import {colors} from 'styles';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 240px 1fr;
  height: 100vh;
`;

export const LeftMenu = styled.div`
  border-right: 1px solid ${colors.border};
  overflow-y: auto;
  padding: 24px 0;
`;
