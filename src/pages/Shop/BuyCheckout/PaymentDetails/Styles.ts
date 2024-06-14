import styled from 'styled-components';

import UButton from 'components/Button';
import {breakpoints, colors, fonts} from 'styles';

const IMAGE_SIZE = 24;

export const Amount = styled.div`
  font-size: 14px;
  font-weight: ${fonts.weight.semiBold};
  margin-left: 8px;
`;

export const Button = styled(UButton)`
  margin-top: 12px;
  width: 40%;
  @media (max-width: ${breakpoints.desktop}) {
    width: 100%;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  margin-top: 12px;
  width: 100%;
`;

export const CoreLogo = styled.img`
  border-radius: 50%;
  height: ${`${IMAGE_SIZE}px`};
  width: ${`${IMAGE_SIZE}px`};
`;

export const ErrorMessage = styled.div`
  color: ${colors.palette.red['400']};
  font-size: 11px;
  margin-top: 12px;
`;

export const PriceContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const Div = styled.div`
  align-items: center;
  display: flex;
  gap: 10px;
`;

export const Ticker = styled.div`
  font-weight: ${fonts.weight.semiBold};
`;

export const Input = styled.div`
  align-items: center;
  border-radius: 8px;
  border: 1px solid ${colors.border};
  display: flex;
  display: flex;
  font-weight: ${fonts.weight.bold};
  justify-content: space-between;
  padding: 10px;
  text-align: right;
  width: 100%;
`;

export const Logo = styled.div`
  display: flex;
  gap: 5px;
`;

export const Img = styled.img`
  border-radius: 50%;
  height: ${`${IMAGE_SIZE}px`};
  width: ${`${IMAGE_SIZE}px`};
`;

export const Box = styled.div`
  align-items: center;
  display: flex;
  gap: 10px;
  justify-content: space-between;
  padding: 10px 0px;
`;

export const Text = styled.div`
  font-weight: ${fonts.weight.semiBold};
`;
