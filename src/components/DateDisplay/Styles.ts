import styled from 'styled-components';

import {colors, fonts} from 'styles';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const DateLabel = styled.span`
  color: ${colors.primary};
  font-size: 13px;
  font-weight: ${fonts.weight.semiBold};
  margin-right: 4px;
`;

export const DateRow = styled.div`
  align-items: center;
  display: flex;
`;

export const DateValue = styled.span`
  color: ${colors.secondary};
  font-size: 13px;
`;
