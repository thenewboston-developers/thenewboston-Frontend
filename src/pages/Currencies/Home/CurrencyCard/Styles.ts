import styled from 'styled-components';

import UCurrencyLogo from 'components/CurrencyLogo';
import {Img} from 'components/CurrencyLogo/Styles';
import ULine from 'components/Line';
import {colors, fonts} from 'styles';

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

export const Container = styled.div`
  background-color: ${colors.white};
  border: 1px solid ${colors.border};
  border-radius: 14px;
  box-shadow: 0 2px 4px rgb(0 0 0 / 8%);
  cursor: pointer;
  display: flex;
  height: 100%;
  justify-content: space-between;
  padding: 16px 18px;
  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
`;

export const CurrencyLogo = styled(UCurrencyLogo)`
  ${Img} {
    box-shadow: 0 2px 4px rgb(0 0 0 / 20%);
  }
`;

export const Description = styled.div`
  color: ${colors.palette.gray[600]};
  font-size: 13px;
  margin-top: 6px;
`;

export const Domain = styled.div`
  color: ${colors.palette.gray[600]};
  font-size: 12px;
`;

export const HeaderSection = styled.div`
  display: flex;
  width: 100%;
`;

export const InternalBadge = styled.span`
  background: ${colors.palette.blue[100]};
  border-radius: 4px;
  color: ${colors.palette.blue[700]};
  font-size: 11px;
  font-weight: ${fonts.weight.semiBold};
  padding: 2px 8px;
`;

export const Line = styled(ULine)`
  margin-top: 10px;
`;

export const OwnerRow = styled.div`
  margin-top: 10px;
`;

export const Spacer = styled.div`
  flex: 1;
`;

export const Text = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin: 4px 0 0 16px;
`;

export const Ticker = styled.div`
  font-size: 20px;
  font-weight: ${fonts.weight.semiBold};
`;

export const TickerRow = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;
