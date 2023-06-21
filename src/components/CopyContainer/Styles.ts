import styled from 'styled-components';

import {fonts} from 'styles';

export const Container = styled.div`
  align-items: center;
  background: #f1f6fa;
  border-radius: 8px;
  display: flex;
  font-size: 12px;
  padding: 8px;
`;

export const CopyText = styled.div`
  cursor: pointer;
  font-weight: ${fonts.weight.bold};
`;

export const Text = styled.div`
  color: #697386;
  margin-right: 16px;
  overflow-wrap: anywhere;
`;
