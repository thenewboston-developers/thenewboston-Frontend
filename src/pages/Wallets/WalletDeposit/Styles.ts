import styled from 'styled-components';

import UCopyContainer from 'components/CopyContainer';
import Qr from 'components/Qr';
import {colors} from 'styles';

export const Balance = styled.div`
  color: ${colors.primary};
  font-size: 16px;
  font-weight: 700;
`;

export const Container = styled.div`
  margin-top: 16px;
`;

export const CopyContainer = styled(UCopyContainer)`
  margin-top: 16px;
`;

export const DepositAccountRow = styled.div`
  display: flex;
  gap: 10px;
  justify-content: space-between;
  padding: 12px 0;
  width: 100%;
`;

export const DepositLeft = styled.div`
  width: 100%;
`;

export const DepositSection = styled.div`
  margin-top: 24px;
`;

export const EmptyState = styled.div`
  color: ${colors.secondary};
  padding: 60px 20px;
  text-align: center;

  p {
    font-size: 14px;
    margin: 0;
  }
`;

export const IconWrapper = styled.div`
  align-items: center;
  display: flex;
  margin-left: 6px;
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

export const QR = styled(Qr)`
  display: block;
  height: auto;
  width: 100%;
`;

export const QrWrapper = styled.div`
  background: ${colors.background};
  border: 2px solid ${colors.border};
  border-radius: 16px;
  box-shadow: 0 3px 6px rgb(140 149 159 / 15%);
  display: inline-block;
  padding: 25px;
  position: relative;
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
    border-radius: 0 15px 0 0;
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

export const Text = styled.div`
  color: ${colors.secondary};
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
`;

export const Title = styled.div`
  color: ${colors.primary};
  font-size: 15px;
  font-weight: 600;
`;

export const Top = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
`;

export const InternalCurrencyMessage = styled.div`
  padding: 40px;
  text-align: center;

  ${Title} {
    color: ${colors.primary};
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 16px;
  }

  ${Text} {
    color: ${colors.secondary};
    font-size: 14px;
    font-weight: 400;
    letter-spacing: normal;
    line-height: 1.5;
    text-transform: none;
  }
`;
