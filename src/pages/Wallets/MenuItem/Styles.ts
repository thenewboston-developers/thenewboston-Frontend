import styled from 'styled-components';

import {colors, fonts} from 'styles';

export const Balance = styled.div`
  color: ${colors.secondary};
  font-size: 13px;
  margin-top: 8px;
`;

export const BalanceAmount = styled.span`
  color: ${colors.primary};
  font-weight: ${fonts.weight.semiBold};
`;

export const Container = styled.div<{$isActive: boolean}>`
  background: ${({$isActive}) => ($isActive ? colors.palette.blue[100] : 'transparent')};
  border-bottom: 1px solid ${colors.border};
  padding: 12px 16px;
  transition: background 0.2s ease;

  &:first-child {
    border-top-left-radius: 14px;
    border-top-right-radius: 14px;
  }

  &:last-child {
    border-bottom: none;
    border-bottom-left-radius: 14px;
    border-bottom-right-radius: 14px;
  }

  &:hover {
    background: ${colors.palette.blue[50]};
    cursor: pointer;
  }
`;

export const CurrencyDetails = styled.div`
  flex: 1;
`;

export const CurrencyInfo = styled.div`
  align-items: center;
  display: flex;
  gap: 8px;
`;

export const Domain = styled.div`
  color: ${colors.secondary};
  font-size: 12px;
  margin-top: 2px;
`;

export const Ticker = styled.div<{$isActive: boolean}>`
  color: ${colors.black};
  font-size: 16px;
  font-weight: ${fonts.weight.semiBold};
`;
