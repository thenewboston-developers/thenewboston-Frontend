import styled from 'styled-components';

import {colors, fonts} from 'styles';

export const Balance = styled.div`
  color: ${colors.palette.gray[500]};
  font-size: 14px;
  margin-top: 2px;
`;

export const Container = styled.div`
  background: ${colors.white};
  border-radius: 14px;
  box-shadow: 0 2px 4px rgb(0 0 0 / 8%);
  cursor: pointer;
  padding: 12px 16px;
  position: relative;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${colors.palette.gray[50]};
  }
`;

export const Content = styled.div`
  align-items: center;
  display: flex;
  height: 40px;
  position: relative;
`;

export const EmptyText = styled.div`
  color: ${colors.palette.gray[500]};
  font-size: 16px;
`;

export const Image = styled.img`
  border-radius: 50%;
  box-shadow: 0 2px 4px rgb(0 0 0 / 20%);
  height: 32px;
  width: 32px;
`;

export const ImageContainer = styled.div`
  align-items: center;
  display: flex;
`;

export const Ticker = styled.div`
  font-size: 20px;
  font-weight: ${fonts.weight.semiBold};
`;

export const WalletInfo = styled.div`
  margin-left: 16px;
`;
