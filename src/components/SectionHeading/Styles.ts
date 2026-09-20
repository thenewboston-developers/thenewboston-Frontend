import styled from 'styled-components';

import ULine from 'components/Line';
import {colors, fonts} from 'styles';

export const Container = styled.div``;

export const Contents = styled.div`
  align-items: flex-end;
  display: flex;
  gap: 16px;
  justify-content: space-between;
  padding-bottom: 8px;
`;

export const Heading = styled.div`
  color: ${colors.primary};
  font-size: 24px;
  font-weight: ${fonts.weight.bold};
  letter-spacing: -0.01em;
  line-height: 1.2;
`;

export const Left = styled.div`
  align-items: baseline;
  display: flex;
  flex-wrap: wrap;
  min-width: 0;
`;

export const Line = styled(ULine)`
  border-top-color: ${colors.borderSubtle};
`;

export const Right = styled.div`
  flex-shrink: 0;
`;

export const SubHeading = styled.div`
  color: ${colors.secondary};
  font-size: 13px;
  font-variant-numeric: tabular-nums;
  margin-left: 10px;
`;
