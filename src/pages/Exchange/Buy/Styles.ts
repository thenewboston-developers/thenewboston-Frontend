import styled from 'styled-components';

import {colors, fonts} from 'styles';

export const AvailableRow = styled.div`
  border-bottom: 1px solid ${colors.border};
  display: flex;
  justify-content: space-between;
  padding-bottom: 4px;
`;

export const AvailableTotal = styled.div`
  margin-bottom: 32px;
`;

export const Container = styled.div``;

export const TotalRow = styled.div`
  display: flex;
  font-weight: ${fonts.weight.bold};
  justify-content: space-between;
  padding-top: 4px;
`;
