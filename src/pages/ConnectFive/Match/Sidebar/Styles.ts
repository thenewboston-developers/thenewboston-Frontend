import styled from 'styled-components';

import {colors, fonts} from 'styles';

export const PrizePoolPanel = styled.div`
  background: ${colors.white};
  border: 1px solid ${colors.border};
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  font-size: 13px;
  gap: 16px;
  padding: 16px;
`;

export const PurchaseInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const PurchaseLeft = styled.div`
  align-items: center;
  display: flex;
  gap: 12px;
`;

export const PurchaseList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const PurchaseMeta = styled.span`
  color: ${colors.secondary};
  font-size: 12px;
`;

export const PurchaseName = styled.span`
  color: ${colors.primary};
  font-size: 14px;
  font-weight: ${fonts.weight.medium};
`;

export const PurchasePanel = styled.div`
  background: ${colors.white};
  border: 1px solid ${colors.border};
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
`;

export const PurchaseRow = styled.div`
  align-items: center;
  display: flex;
  gap: 12px;
  justify-content: space-between;
`;

export const Sidebar = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const SpecialIcon = styled.svg<{$variant: 'black' | 'white'}>`
  color: ${({$variant}) => ($variant === 'black' ? colors.black : colors.white)};
  display: block;
  filter: ${({$variant}) => ($variant === 'white' ? 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.5))' : 'none')};
  height: 24px;
  width: 24px;
`;

export const SpendList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const SpendPanel = styled.div`
  background: ${colors.white};
  border: 1px solid ${colors.border};
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
`;

export const SpendProgressBar = styled.div`
  background-color: ${colors.palette.gray[200]};
  border-radius: 2px;
  height: 4px;
  overflow: hidden;
  position: relative;
`;

export const SpendProgressFill = styled.div<{$percentage: number}>`
  background-color: ${colors.palette.green[500]};
  height: 100%;
  transition: width 0.3s ease;
  width: ${({$percentage}) => $percentage}%;
`;

export const SpendRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const SpendRowHeader = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

export const SpendRowName = styled.span`
  color: ${colors.primary};
  font-size: 12px;
  font-weight: ${fonts.weight.semiBold};
`;

export const SpendRowValue = styled.span`
  color: ${colors.secondary};
  font-size: 12px;
  font-weight: ${fonts.weight.semiBold};
`;
