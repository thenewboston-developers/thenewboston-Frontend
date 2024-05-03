import styled from 'styled-components';
import {breakpoints, colors, fonts} from 'styles';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: ${colors.white};
  border-radius: 16px;
  min-height: 154px;

  @media (min-width: ${breakpoints.mobile}) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

export const Left = styled.div`
  padding: 24px;
`;

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  align-items: center;

  @media (min-width: ${breakpoints.mobile}) {
    align-items: normal;
  }
`;

export const Header = styled.div`
  h1 {
    font-size: 22px;
    font-weight: ${fonts.weight.semiBold};
    line-height: 32px;
    text-align: center;
  }

  img {
    display: none;
  }

  @media (min-width: ${breakpoints.mini}) {
    display: flex;
    justify-content: center;
    gap: 8px;
    img {
      display: block;
    }
  }

  @media (min-width: ${breakpoints.mobile}) {
    justify-content: flex-start;
  }
`;

export const SubHeader = styled.h2`
  font-weight: ${fonts.weight.regular};
  font-size: 14px;
  line-height: 24px;
  color: ${colors.gray};
  max-width: 454px;
  text-align: center;

  @media (min-width: ${breakpoints.mobile}) {
    text-align: start;
  }
`;

export const Right = styled.div`
  position: relative;
  margin-right: 26px;
  display: none;

  @media (min-width: ${breakpoints.mobile}) {
    display: block;
    flex-direction: row;
    justify-content: space-between;
  }
`;

export const Img = styled.img`
  height: 100%;
  max-width: 353px;
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
