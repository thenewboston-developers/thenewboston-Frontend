import styled from 'styled-components';

import {colors} from 'styles';

export const Container = styled.div`
  background-color: ${colors.white};
  border-radius: 14px;
  border: 1px solid ${colors.border};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 8px 5px 8px 14px;
`;
