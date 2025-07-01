import styled from 'styled-components';

import UButton from 'components/Button';
import {breakpoints, colors, fonts} from 'styles';

import BannerImage from './assets/default-banner.jpg';

const USER_IMAGE_SIZE = 180;

export const Banner = styled.div`
  background-image: url(${BannerImage});
  background-position: center;
  background-size: cover;
  border-radius: 12px;
  box-shadow:
    0 4px 6px rgba(0, 0, 0, 0.1),
    0 1px 3px rgba(0, 0, 0, 0.08);
  height: 260px;
  margin-bottom: -${USER_IMAGE_SIZE / 2 + 4}px;
  width: 100%;
`;

export const Bio = styled.p`
  font-size: 14px;
  margin-top: 8px;
  max-width: 600px;
  text-align: center;

  @media (min-width: ${breakpoints.tablet}) {
    text-align: left;
  }
`;

export const Button = styled(UButton)`
  border: none;
  border-radius: 100px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.12);
  font-weight: ${fonts.weight.semiBold};
  height: 44px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media (min-width: ${breakpoints.mobile}) {
    flex-direction: row;
  }
`;

export const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  padding-left: 24px;

  @media (min-width: ${breakpoints.tablet}) {
    display: block;
  }
`;

export const Flex = styled.div`
  align-items: center;
  display: flex;
`;

export const Image = styled.img`
  border-radius: 50%;
  cursor: pointer;
  height: 100%;
  object-fit: cover;
  overflow: hidden;
  width: 100%;
`;

export const ImageWrapper = styled.div`
  background-color: ${colors.white};
  border-radius: 50%;
  box-shadow:
    0 4px 6px rgba(0, 0, 0, 0.1),
    0 1px 3px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  height: ${USER_IMAGE_SIZE}px;
  overflow: hidden;
  padding: 4px;
  position: relative;
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
  margin: 0 5px 0;
`;

export const TNBLogo = styled.img`
  border-radius: 50%;
  margin: 0 3px;
  width: 20px;
`;

export const UserBanner = styled.img`
  border-radius: 12px;
  box-shadow:
    0 4px 6px rgba(0, 0, 0, 0.1),
    0 1px 3px rgba(0, 0, 0, 0.08);
  height: 260px;
  margin-bottom: -${USER_IMAGE_SIZE / 2 + 4}px;
  object-fit: cover;
  width: 100%;
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
