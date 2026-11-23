import styled, {css} from 'styled-components';

import UPagination from 'components/Pagination';
import {breakpoints, colors, fonts, radii} from 'styles';

import {
  emptyStateStyle,
  emptySubtextStyle,
  emptyTextStyle,
  loaderPanelStyle,
  tableBodyStyle,
  tableDataStyle,
  tableHeadStyle,
  tableStyle,
  tableWrapperStyle,
} from '../mixins';

const BALANCE_COLUMN_MINI_WIDTH = 108;
const BALANCE_COLUMN_MOBILE_WIDTH = 120;
const PERCENTAGE_COLUMN_MOBILE_WIDTH = 96;
const PERCENTAGE_WIDTH = 56;
const RANK_COLUMN_MOBILE_WIDTH = 48;
const RANK_COLUMN_WIDTH = 72;
const SHARE_TRACK_WIDTH = 96;

// Shared by the head and the data cells. Small screens use a fixed table layout (see tableStyle), which reads the column
// widths from the first row: the rank and the numeric columns are explicit, so the user column takes what is left and
// truncates the username instead of growing the table
const columnMixin = css`
  &:first-child {
    padding-left: 16px;
    padding-right: 8px;
    text-align: center;
    width: ${`${RANK_COLUMN_WIDTH}px`};
  }

  @media (max-width: ${breakpoints.mobile}) {
    &:first-child {
      padding-left: 12px;
      padding-right: 0;
      width: ${`${RANK_COLUMN_MOBILE_WIDTH}px`};
    }

    &:nth-child(3) {
      padding-left: 0;
      width: ${`${BALANCE_COLUMN_MOBILE_WIDTH}px`};
    }

    &:nth-child(4) {
      padding-left: 0;
      width: ${`${PERCENTAGE_COLUMN_MOBILE_WIDTH}px`};
    }
  }

  /* Phones have no room for the percentage column, StackedPercentage shows the value below the balance instead */
  @media (max-width: ${breakpoints.mini}) {
    &:nth-child(3) {
      width: ${`${BALANCE_COLUMN_MINI_WIDTH}px`};
    }

    &:nth-child(4) {
      display: none;
    }
  }
`;

export const Balance = styled.div`
  font-size: 15px;
  font-variant-numeric: tabular-nums;
  font-weight: ${fonts.weight.semiBold};
  text-align: right;
  white-space: nowrap;

  @media (max-width: ${breakpoints.mini}) {
    font-size: 14px;
  }
`;

export const Container = styled.div``;

export const EmptyState = styled.div`
  ${emptyStateStyle};
`;

export const EmptySubtext = styled.div`
  ${emptySubtextStyle};
`;

export const EmptyText = styled.div`
  ${emptyTextStyle};
`;

export const LoaderPanel = styled.div`
  ${loaderPanelStyle};
`;

export const Pagination = styled(UPagination)`
  margin-top: 24px;
`;

// The fixed width keeps the bars of every row aligned, whatever the number of digits next to them
export const Percentage = styled.div`
  color: ${colors.secondary};
  font-size: 14px;
  font-variant-numeric: tabular-nums;
  font-weight: ${fonts.weight.medium};
  min-width: ${`${PERCENTAGE_WIDTH}px`};
  text-align: right;
  white-space: nowrap;
`;

export const Rank = styled.div`
  color: ${colors.secondary};
  font-size: 14px;
  font-variant-numeric: tabular-nums;
  font-weight: ${fonts.weight.semiBold};

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 13px;
  }
`;

export const RankBadge = styled.img`
  display: block;
  height: 32px;
  margin: 0 auto;
  width: 32px;

  @media (max-width: ${breakpoints.mobile}) {
    height: 28px;
    width: 28px;
  }
`;

export const Share = styled.div`
  align-items: center;
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`;

export const ShareFill = styled.div`
  background: ${colors.palette.blue[500]};
  border-radius: ${radii.pill};
  height: 100%;
  min-width: 2px;
`;

// Tablets and phones give the column a fixed width that only fits the number
export const ShareTrack = styled.div`
  background: ${colors.palette.gray[200]};
  border-radius: ${radii.pill};
  flex-shrink: 0;
  height: 6px;
  overflow: hidden;
  width: ${`${SHARE_TRACK_WIDTH}px`};

  @media (max-width: ${breakpoints.mobile}) {
    display: none;
  }
`;

// Only rendered on phones, where the percentage column is hidden (see columnMixin)
export const StackedPercentage = styled.div`
  color: ${colors.secondary};
  display: none;
  font-size: 12px;
  font-variant-numeric: tabular-nums;
  font-weight: ${fonts.weight.medium};
  line-height: 1.4;
  margin-top: 2px;
  text-align: right;
  white-space: nowrap;

  @media (max-width: ${breakpoints.mini}) {
    display: block;
  }
`;

export const Table = styled.table`
  ${tableStyle};
`;

export const TableBody = styled.tbody`
  ${tableBodyStyle};
`;

export const TableData = styled.td`
  ${tableDataStyle};
  ${columnMixin};
`;

export const TableHead = styled.th`
  ${tableHeadStyle};
  ${columnMixin};

  &:nth-child(3),
  &:last-child {
    text-align: right;
  }
`;

export const TableHeader = styled.thead``;

export const TableRow = styled.tr``;

export const TableWrapper = styled.div`
  ${tableWrapperStyle};
`;
