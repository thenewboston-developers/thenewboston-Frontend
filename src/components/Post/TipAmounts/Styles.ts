import styled from 'styled-components';

import {colors} from 'styles';

export const Amount = styled.div`
  font-size: 14px;
  font-weight: 600;
`;

export const Container = styled.div`
  background: ${colors.background};
  border-radius: 8px;
  padding: 12px 16px;
`;

export const CurrencyLogo = styled.img`
  border-radius: 50%;
  height: 32px;
  object-fit: cover;
  width: 32px;
`;

export const Ticker = styled.div`
  color: ${colors.palette.gray[600]};
  font-size: 12px;
`;

export const TipInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TipItem = styled.div`
  align-items: center;
  display: flex;
  gap: 8px;
`;

export const TipsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Title = styled.h4`
  color: ${colors.palette.gray[700]};
  font-size: 12px;
  font-weight: 600;
  margin: 0 0 12px 0;
  text-transform: uppercase;
`;
