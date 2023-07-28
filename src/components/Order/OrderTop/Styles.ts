import styled from 'styled-components';

import {colors} from 'styles';

export const Container = styled.div`
  background: #f5f8fa;
  border-bottom: 1px solid ${colors.border};
  padding: 12px 24px;
`;

export const Detail = styled.div`
  display: flex;
  flex-direction: column;
`;

export const DetailLabel = styled.div`
  color: ${colors.secondary};
  font-size: 11px;
`;

export const DetailValue = styled.div`
  font-size: 13px;
  margin-top: 4px;
`;
