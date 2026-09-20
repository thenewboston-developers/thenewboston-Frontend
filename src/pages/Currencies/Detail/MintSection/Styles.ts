import styled, {css} from 'styled-components';

import UPagination from 'components/Pagination';
import {breakpoints, colors, fonts} from 'styles';

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

const AMOUNT_COLUMN_MOBILE_WIDTH = 132;

// Shared by the head and the data cells. Small screens use a fixed table layout (see tableStyle), which reads the column
// widths from the first row: the amount column is explicit, so the date column takes what is left and wraps its text
const columnMixin = css`
  @media (max-width: ${breakpoints.mobile}) {
    &:first-child {
      width: ${`${AMOUNT_COLUMN_MOBILE_WIDTH}px`};
    }
  }
`;

export const Amount = styled.div`
  font-size: 15px;
  font-variant-numeric: tabular-nums;
  font-weight: ${fonts.weight.semiBold};
  white-space: nowrap;
`;

export const Container = styled.div``;

export const Date = styled.div`
  color: ${colors.secondary};
  font-variant-numeric: tabular-nums;
`;

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
`;

export const TableHeader = styled.thead``;

export const TableRow = styled.tr``;

export const TableWrapper = styled.div`
  ${tableWrapperStyle};
`;
