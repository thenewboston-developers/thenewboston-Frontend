import styled from 'styled-components';

import {colors} from 'styles';

export const Container = styled.div`
  border-right: 1px solid ${colors.border};
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: 24px 16px;
`;
