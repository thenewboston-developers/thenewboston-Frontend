import styled from 'styled-components';
import {colors, fonts} from 'styles';

import UCopyContainer from 'components/CopyContainer';
import Qr from 'components/Qr';

export const Container = styled.div`
  margin-top: 16px;
`;

export const CopyContainer = styled(UCopyContainer)`
  margin-top: 16px;
`;

export const QR = styled(Qr)`
  display: block;
  height: auto;
  width: 100%;
`;
export const LeftCornerBorders = styled.div`
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;

  &::before,
  &::after {
    border: 2px solid ${colors.palette.gray[400]};
    content: '';
    height: 25px;
    position: absolute;
    width: 25px;
  }

  &::before {
    border-bottom: none;
    border-radius: 15px 0 0 0;
    border-right: none;
    left: 10px;
    top: 10px;
  }

  &::after {
    border-left: none;
    border-radius: 0 0 15px 0;
    border-top: none;
    bottom: 10px;
    right: 10px;
  }
`;

export const RightCornerBorders = styled.div`
  height: 100%;
  position: absolute;
  right: 0;
  top: 0;
  width: 100%;

  &::before,
  &::after {
    border: 2px solid ${colors.palette.gray[400]};
    content: '';
    height: 25px;
    position: absolute;
    width: 25px;
  }

  &::before {
    border-bottom: none;
    border-left: none;
    border-radius: 0px 15px 0 0;
    right: 10px;
    top: 10px;
  }

  &::after {
    border-radius: 0 0 0 15px;
    border-right: none;
    border-top: none;
    bottom: 10px;
    left: 10px;
  }
`;
export const QrWrapper = styled.div`
  background: ${colors.background};
  border-radius: 16px;
  border: 2px solid ${colors.border};
  box-shadow: 0 3px 6px rgb(140 149 159 / 15%);
  display: inline-block;
  padding: 25px;
  position: relative;
`;

export const DepositAccountRow = styled.div`
  display: flex;
  gap: 10px;
  justify-content: space-between;
  padding: 12px 0px;
  width: 100%;
`;

export const DepositLeft = styled.div`
  width: 100%;
`;

export const IconWrapper = styled.div`
  align-items: center;
  display: flex;
  margin-left: 6px;
`;

export const RefreshIconContainer = styled.div`
  align-items: center;
  background: ${colors.background};
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 12px;
`;

export const Top = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
`;

export const Text = styled.div`
  color: ${colors.gray};
  font-weight: ${fonts.weight.bold};
`;

export const Balance = styled.div`
  font-size: 24px;
  font-weight: ${fonts.weight.semiBold};
`;
export const Div = styled.div`
  padding: 20px 0px;
`;

export const Title = styled.div`
  color: ${colors.gray};
  font-size: 18px;
  font-weight: ${fonts.weight.semiBold};
`;
