import styled from 'styled-components';

import UButton from 'components/Button';
import {breakpoints, colors, fonts} from 'styles';

const USER_IMAGE_SIZE = 110;

export const Button = styled(UButton)`
  border-radius: 100px;
  border: none;
  height: 44px;
  background-color: ${colors.white};
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.15);
  font-weight: ${fonts.weight.semiBold};
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

  @media (min-width: ${breakpoints.tablet}) {
    display: block;
  }
`;

export const Img = styled.img`
  height: 100%;
  object-fit: cover;
  width: 100%;
  border-radius: 50%;
  overflow: hidden;
`;

export const ImgWrapper = styled.div`
  border-radius: 50%;
  height: ${USER_IMAGE_SIZE}px;
  overflow: hidden;
  width: ${USER_IMAGE_SIZE}px;
  background-color: ${colors.white};
  padding: 8px;
`;

export const TNBLogo = styled.img`
  border-radius: 50%;
  width: 20px;
  margin: 0 3px;
`;

export const Stats = styled.div`
  align-items: center;
  display: flex;
  justify-content: start;
  margin-top: 10px;
  padding: 5px 0;

  & > b {
    margin: 0 5px;
  }
`;

export const Username = styled.h1`
  margin-top: 16px;
  text-transform: capitalize;
  font-size: 24px;
  font-weight: ${fonts.weight.bold};
`;

export const StateBalanceWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  row-gap: 10px;

  @media (min-width: ${breakpoints.mobile}) {
    flex-direction: row;
    gap: 0;
  }
`;

export const Flex = styled.div`
  display: flex;
  align-items: center;
`;

export const Title = styled.p`
  margin: 0 5px 0 0;
  font-size: 14px;
  color: ${colors.black};
  font-weight: ${fonts.weight.regular};
`;

export const Value = styled.span<{flex?: boolean}>`
  font-weight: ${fonts.weight.bold};
  font-size: 14px;
  color: ${colors.black};
  ${({flex}) => flex && 'display: flex; align-items: center; gap: 5px;'}
`;

export const WalletBalance = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

export const Separator = styled.span`
  background-color: ${colors.palette.gray[400]};
  width: 6px;
  height: 6px;
  border-radius: 50%;
  margin: 0 20px;
  display: none;

  @media (min-width: ${breakpoints.mobile}) {
    display: block;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
  gap: 20px;

  @media (min-width: ${breakpoints.tablet}) {
    justify-content: space-between;
    flex-direction: row;
    gap: 0;
  }
`;
