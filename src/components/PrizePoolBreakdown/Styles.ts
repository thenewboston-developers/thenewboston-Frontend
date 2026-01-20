import styled from 'styled-components';

import {colors, fonts} from 'styles';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
`;

export const Row = styled.div`
  display: flex;
  gap: 16px;
  justify-content: space-between;
`;

export const Rows = styled.div`
  border-bottom: 1px solid ${colors.border};
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding-bottom: 4px;
`;

export const Text = styled.span`
  text-align: right;
  word-break: break-word;
`;

export const TotalRow = styled.div`
  display: flex;
  font-weight: ${fonts.weight.bold};
  gap: 16px;
  justify-content: space-between;
  padding-top: 4px;
`;
