import styled from 'styled-components';

import {colors} from 'styles';

export const Container = styled.nav`
  background: ${colors.backgroundDark};
  border-top: 1px solid ${colors.border};
  bottom: 0;
  display: flex;
  justify-content: space-around;
  left: 0;
  padding: 8px 0;
  position: fixed;
  right: 0;
  z-index: 1000;
`;
