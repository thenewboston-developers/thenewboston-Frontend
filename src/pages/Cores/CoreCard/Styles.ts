import styled from 'styled-components';

import {colors} from 'styles';

export const Container = styled.div`
  border-radius: 4px;
  border: 1px solid ${colors.border};
  display: flex;
  justify-content: space-between;
  padding: 8px 5px 8px 14px;
  background-color: ${colors.white};
  border-radius: 14px;
`;
