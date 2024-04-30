import styled from 'styled-components';
import {colors, fonts} from 'styles';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  background: ${colors.white};
  border-radius: 16px;
  height: 154px;
`;

export const Left = styled.div`
  padding: 24px;
`;

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

export const Header = styled.div`
  display: flex;
  gap: 8px;

  h1 {
    font-size: 22px;
    font-weight: ${fonts.weight.semiBold};
    line-height: 32px;
  }
`;

export const SubHeader = styled.h2`
  font-weight: ${fonts.weight.regular};
  font-size: 14px;
  line-height: 24px;
  color: ${colors.gray};
  max-width: 454px;
`;

export const Right = styled.div`
  height: 100%;
  position: relative;
  margin-right: 26px;
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
