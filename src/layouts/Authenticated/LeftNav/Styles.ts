import styled from 'styled-components';

import {colors} from 'styles';

export const Bottom = styled.div``;

export const Container = styled.div`
  background: ${colors.backgroundDark};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: auto;
  padding: 24px 16px;
`;

export const Top = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
