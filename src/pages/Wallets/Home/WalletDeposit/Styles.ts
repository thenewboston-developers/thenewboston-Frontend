import styled from 'styled-components';

import UCopyContainer from 'components/CopyContainer';
import Qr from 'components/Qr';
import {breakpoints, cardStyle, colors, eyebrowStyle, fonts} from 'styles';

export const Balance = styled.div`
  color: ${colors.primary};
  font-size: 18px;
  font-variant-numeric: tabular-nums;
  font-weight: ${fonts.weight.bold};
  margin-top: 2px;
`;

export const Container = styled.section`
  ${cardStyle};
  padding: 20px 24px 24px;

  @media (max-width: ${breakpoints.mobile}) {
    padding: 18px 16px 20px;
  }
`;

export const CopyContainer = styled(UCopyContainer)`
  margin-top: 16px;
`;

export const DepositAccountRow = styled.div`
  align-items: center;
  display: flex;
  gap: 10px;
  justify-content: space-between;
  padding: 16px 0;
  width: 100%;
`;

export const DepositLeft = styled.div`
  width: 100%;
`;

export const DepositSection = styled.div`
  margin-top: 24px;
`;

export const Heading = styled.h3`
  color: ${colors.primary};
  font-size: 18px;
  font-weight: ${fonts.weight.bold};
  letter-spacing: -0.02em;
  line-height: 1.3;
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

export const SubHeading = styled.p`
  color: ${colors.secondary};
  font-size: 13px;
  line-height: 1.6;
  margin: 4px 0 0;
  max-width: 560px;
`;

export const Text = styled.div`
  ${eyebrowStyle};
`;

export const Title = styled.h4`
  color: ${colors.primary};
  font-size: 15px;
  font-weight: ${fonts.weight.semiBold};
  margin-bottom: 8px;
`;

export const Top = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin: 24px 0;
`;
