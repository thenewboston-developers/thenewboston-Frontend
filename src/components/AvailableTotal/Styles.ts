import styled from 'styled-components';

import {colors, fonts} from 'styles';

export const AvailableRow = styled.div`
  border-bottom: 1px solid ${colors.border};
  display: flex;
  gap: 16px;
  justify-content: space-between;
  padding-bottom: 4px;
`;

export const Container = styled.div`
  margin-bottom: 32px;
`;

export const TotalRow = styled.div<{$isTotalValid: boolean}>`
  color: ${({$isTotalValid}) => ($isTotalValid ? 'inherit' : colors.palette.red['500'])};
  display: flex;
  font-weight: ${fonts.weight.bold};
  gap: 16px;
  justify-content: space-between;
  padding-top: 4px;
`;

export const Text = styled.span`
  word-break: break-word;
`;
