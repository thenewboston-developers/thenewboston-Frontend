import styled from 'styled-components';

import {colors} from 'styles';

export const Container = styled.div`
  background: ${colors.background};
  display: grid;
  gap: 10px;
  grid-template-columns: 271px 1fr;
  height: 100%;
  padding: 20px 24px;
`;
