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

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Icon = styled.img`
  width: 40px;
  height: 20px;
`;

export const Img = styled.img`
  height: 100%;
  width: auto;
`;

export const ImgOverlay = styled.div`
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.6) 0%,
    transparent 20%,
    transparent 80%,
    rgba(255, 255, 255, 0.6) 100%
  );
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
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

export const Right = styled.div`
  height: 100%;
  position: relative;
`;

export const SubHeading = styled.div`
  color: ${colors.secondary};
  font-size: 14px;
  line-height: 24px;
  margin-top: 8px;
`;
