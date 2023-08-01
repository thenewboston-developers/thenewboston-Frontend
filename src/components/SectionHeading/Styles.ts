import styled from 'styled-components';

import {colors} from 'styles';

export const Container = styled.div``;

export const Contents = styled.div`
  align-items: flex-end;
  display: flex;
  justify-content: space-between;
  padding-bottom: 8px;
`;

export const Heading = styled.div`
  font-size: 24px;
  font-weight: 700;
  line-height: 1.2;
`;

export const Left = styled.div`
  align-items: baseline;
  display: flex;
`;

export const Right = styled.div``;

export const SubHeading = styled.div`
  color: ${colors.secondary};
  font-size: 13px;
  margin-left: 10px;
`;
