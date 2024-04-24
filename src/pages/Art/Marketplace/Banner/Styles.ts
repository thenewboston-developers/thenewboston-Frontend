import styled from 'styled-components';

import {colors, fonts} from 'styles';

export const Container = styled.div`
  background: #fff;
  border-radius: 16px;
  display: flex;
  height: 194px;
  justify-content: space-between;
  overflow: hidden;
  padding: 0 26px;
`;

export const Img = styled.img`
  height: 100%;
`;

export const Heading = styled.div`
  font-size: 22px;
  font-weight: ${fonts.weight.semiBold};
`;

export const Left = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px 0;
`;

export const Right = styled.div``;

export const SubHeading = styled.div`
  color: ${colors.secondary};
  font-size: 14px;
  line-height: 24px;
  margin-top: 8px;
`;
