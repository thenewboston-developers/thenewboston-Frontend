import styled from 'styled-components';

import UButton from 'components/Button';
import {breakpoints, colors, fonts} from 'styles';

const USER_IMAGE_SIZE = 110;

export const Button = styled(UButton)`
  border-radius: 100px;
  border: none;
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

  @media (min-width: ${breakpoints.tablet}) {
    display: block;
  }
`;

export const Img = styled.img`
  border-radius: 50%;
  height: 100%;
  object-fit: cover;
  overflow: hidden;
  width: 100%;
  cursor: ponter;
`;

export const ImgWrapper = styled.div`
  background-color: ${colors.white};
  border-radius: 50%;
  height: ${USER_IMAGE_SIZE}px;
  overflow: hidden;
  padding: 8px;
  width: ${USER_IMAGE_SIZE}px;
  cursor: pointer;
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
  text-transform: capitalize;
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

export const Value = styled.span<{$flex?: boolean}>`
  ${({$flex}) => $flex && 'display: flex; align-items: center; gap: 5px;'}
  color: ${colors.black};
  font-size: 14px;
  font-weight: ${fonts.weight.bold};
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
