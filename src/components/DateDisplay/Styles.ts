import styled from 'styled-components';

import {colors, fonts} from 'styles';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  gap: 4px;
`;

export const DateLabel = styled.span`
  color: ${colors.secondary};
  font-size: 12px;
`;

export const DateRow = styled.div`
  align-items: baseline;
  display: flex;
  gap: 12px;
  justify-content: space-between;
  line-height: 1.4;
  white-space: nowrap;
`;

export const DateValue = styled.span`
  color: ${colors.primary};
  font-size: 12px;
  font-variant-numeric: tabular-nums;
  font-weight: ${fonts.weight.medium};
`;
