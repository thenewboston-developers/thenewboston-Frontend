import styled from 'styled-components';

import UPrizePoolBreakdown from 'components/PrizePoolBreakdown';
import {
  Row as PrizePoolRow,
  Rows as PrizePoolRows,
  Text as PrizePoolText,
  TotalRow as PrizePoolTotalRow,
} from 'components/PrizePoolBreakdown/Styles';
import {colors, fonts, radii} from 'styles';

import {panelStyle, WHITE_PIECE_OUTLINE} from '../../mixins';

export const PrizePoolBreakdown = styled(UPrizePoolBreakdown)`
  gap: 8px;

  ${PrizePoolRow} {
    color: ${colors.secondary};
    font-size: 13px;
    line-height: 1.5;
  }

  ${PrizePoolRows} {
    border-bottom-color: ${colors.borderSubtle};
    gap: 6px;
    padding-bottom: 8px;
  }

  ${PrizePoolText} {
    color: ${colors.primary};
    font-variant-numeric: tabular-nums;
    font-weight: ${fonts.weight.medium};
  }

  ${PrizePoolTotalRow} {
    color: ${colors.primary};
    font-size: 14px;
    font-weight: ${fonts.weight.semiBold};
    line-height: 1.5;
    padding-top: 0;

    ${PrizePoolText} {
      font-weight: ${fonts.weight.semiBold};
    }
  }
`;

export const PrizePoolPanel = styled.div`
  ${panelStyle};
`;

export const PurchaseInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
`;

export const PurchaseLeft = styled.div`
  align-items: center;
  display: flex;
  gap: 12px;
  min-width: 0;
`;

export const PurchaseList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const PurchaseMeta = styled.span`
  color: ${colors.secondary};
  font-size: 12px;
  font-variant-numeric: tabular-nums;
  line-height: 1.4;
`;

export const PurchaseName = styled.span`
  color: ${colors.primary};
  font-size: 14px;
  font-weight: ${fonts.weight.semiBold};
  line-height: 1.3;
`;

export const PurchasePanel = styled.div`
  ${panelStyle};
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
  min-width: 0;
`;

// The white pieces get an outline on all sides, so they stay visible on top of the white panel
export const SpecialIcon = styled.svg<{$variant: 'black' | 'white'}>`
  color: ${({$variant}) => ($variant === 'black' ? colors.black : colors.white)};
  display: block;
  filter: ${({$variant}) => ($variant === 'white' ? WHITE_PIECE_OUTLINE : 'none')};
  flex-shrink: 0;
  height: 24px;
  width: 24px;
`;

export const SpendList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const SpendPanel = styled.div`
  ${panelStyle};
`;

export const SpendProgressBar = styled.div`
  background-color: ${colors.palette.gray[100]};
  border-radius: ${radii.pill};
  height: 6px;
  overflow: hidden;
  position: relative;
`;

export const SpendProgressFill = styled.div<{$percentage: number}>`
  background-color: ${colors.palette.blue[500]};
  border-radius: ${radii.pill};
  height: 100%;
  transition: width 0.3s ease;
  width: ${({$percentage}) => $percentage}%;
`;

export const SpendRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const SpendRowHeader = styled.div`
  align-items: baseline;
  display: flex;
  gap: 12px;
  justify-content: space-between;
  min-width: 0;
`;

export const SpendRowName = styled.span`
  color: ${colors.primary};
  font-size: 13px;
  font-weight: ${fonts.weight.semiBold};
  line-height: 1.4;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const SpendRowValue = styled.span`
  color: ${colors.secondary};
  flex-shrink: 0;
  font-size: 12px;
  font-variant-numeric: tabular-nums;
  font-weight: ${fonts.weight.medium};
  line-height: 1.4;
`;
