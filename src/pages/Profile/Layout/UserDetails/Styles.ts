import styled from 'styled-components';

import UButton from 'components/Button';
import {breakpoints, colors, fonts} from 'styles';

const USER_IMAGE_SIZE = 110;

export const Button = styled(UButton)`
  border: none;
  border-radius: 100px;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.15);
  font-weight: ${fonts.weight.semiBold};
  height: 44px;

  & svg {
    & path {
      fill: ${colors.black} !important;
    }
  }
`;

export const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  margin-bottom: 20px;

  @media (min-width: ${breakpoints.tablet}) {
    display: block;
  }
`;

export const Flex = styled.div`
  align-items: center;
  display: flex;
`;

export const Img = styled.img`
  border-radius: 50%;
  cursor: pointer;
  height: 100%;
  object-fit: cover;
  overflow: hidden;
  width: 100%;
`;

export const ImgWrapper = styled.div`
  background-color: ${colors.white};
  border-radius: 50%;
  cursor: pointer;
  height: ${USER_IMAGE_SIZE}px;
  overflow: hidden;
  padding: 8px;
  width: ${USER_IMAGE_SIZE}px;
`;

export const Separator = styled.span`
  background-color: ${colors.palette.gray[400]};
  border-radius: 50%;
  display: none;
  height: 6px;
  margin: 0 20px;
  width: 6px;

  @media (min-width: ${breakpoints.mobile}) {
    display: block;
  }
`;

export const StateBalanceWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  row-gap: 10px;

  @media (min-width: ${breakpoints.mobile}) {
    flex-direction: row;
    gap: 0;
  }
`;

export const Title = styled.p`
  color: ${colors.black};
  font-size: 14px;
  font-weight: ${fonts.weight.regular};
  margin: 0 5px 0 0;
`;

export const TNBLogo = styled.img`
  border-radius: 50%;
  margin: 0 3px;
  width: 20px;
`;

export const Username = styled.h1`
  font-size: 24px;
  font-weight: ${fonts.weight.bold};
  margin-top: 16px;
`;

export const Value = styled.span<{$flex?: boolean}>`
  ${({$flex}) => $flex && 'display: flex; align-items: center; gap: 5px;'}
  color: ${colors.black};
  font-size: 14px;
  font-weight: ${fonts.weight.bold};
`;

export const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 10px;

  @media (min-width: ${breakpoints.tablet}) {
    flex-direction: row;
    gap: 0;
    justify-content: space-between;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media (min-width: ${breakpoints.mobile}) {
    flex-direction: row;
  }
`;
