import styled from 'styled-components';

import {colors} from 'styles';

export const Container = styled.nav`
  background: ${colors.backgroundDark};
  border-top: 1px solid ${colors.border};
  display: flex;
  flex-shrink: 0;
  justify-content: space-around;
  padding: 8px 0;
`;
