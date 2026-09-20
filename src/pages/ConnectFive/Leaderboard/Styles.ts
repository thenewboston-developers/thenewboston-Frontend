import styled, {css} from 'styled-components';

import {Img as AvatarImg} from 'components/Avatar/Styles';
import UEmptyText from 'components/EmptyText';
import UPagination from 'components/Pagination';
import UUserLabel from 'components/UserLabel';
import {breakpoints, cardStyle, colors, fonts, pagePadding, radii} from 'styles';

import {
  loaderPanelStyle,
  tableBodyStyle,
  tableDataStyle,
  tableHeadStyle,
  tableStyle,
  tableWrapperStyle,
} from '../mixins';

const ELO_COLUMN_MINI_WIDTH = 96;
const ELO_COLUMN_MOBILE_WIDTH = 72;
const ELO_COLUMN_WIDTH = 140;
const MOBILE_AVATAR_SIZE = 32;
const RANK_COLUMN_MOBILE_WIDTH = 48;
const RANK_COLUMN_WIDTH = 72;
const RECORD_COLUMN_MOBILE_WIDTH = 104;
const RECORD_COLUMN_WIDTH = 180;

// Shared by the head and the data cells. Small screens use a fixed table layout (see tableStyle), which reads the column
// widths from the first row: the rank and the numeric columns are explicit, so the player column takes what is left and
// truncates the username instead of growing the table
const columnMixin = css`
  &:first-child {
    padding-left: 16px;
    padding-right: 8px;
    text-align: center;
    width: ${`${RANK_COLUMN_WIDTH}px`};
  }

  &:nth-child(3) {
    text-align: right;
    width: ${`${ELO_COLUMN_WIDTH}px`};
  }

  &:nth-child(4) {
    text-align: right;
    width: ${`${RECORD_COLUMN_WIDTH}px`};
  }

  @media (max-width: ${breakpoints.mobile}) {
    &:first-child {
      padding-left: 12px;
      padding-right: 0;
      width: ${`${RANK_COLUMN_MOBILE_WIDTH}px`};
    }

    &:nth-child(3) {
      padding-left: 0;
      width: ${`${ELO_COLUMN_MOBILE_WIDTH}px`};
    }

    &:nth-child(4) {
      padding-left: 0;
      width: ${`${RECORD_COLUMN_MOBILE_WIDTH}px`};
    }
  }

  /* Phones have no room for the record column, StackedRecord shows the value below the ELO instead */
  @media (max-width: ${breakpoints.mini}) {
    &:nth-child(3) {
      width: ${`${ELO_COLUMN_MINI_WIDTH}px`};
    }

    &:nth-child(4) {
      display: none;
    }
  }
`;

export const Container = styled.div`
  ${pagePadding};
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin: 0 auto;
  max-width: 960px;
  width: 100%;
`;

export const Elo = styled.div`
  font-size: 15px;
  font-variant-numeric: tabular-nums;
  font-weight: ${fonts.weight.semiBold};
  white-space: nowrap;

  @media (max-width: ${breakpoints.mini}) {
    font-size: 14px;
  }
`;

export const EmptyText = styled(UEmptyText)`
  ${cardStyle};
  font-size: 14px;
  padding: 64px 24px;
`;

export const LoaderPanel = styled.div`
  ${loaderPanelStyle};
`;

export const Pagination = styled(UPagination)`
  align-self: center;
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

export const Record = styled.div`
  color: ${colors.secondary};
  font-size: 14px;
  font-variant-numeric: tabular-nums;
  font-weight: ${fonts.weight.medium};
  white-space: nowrap;
`;

export const SelfChip = styled.span`
  background: ${colors.palette.blue[100]};
  border-radius: ${radii.pill};
  color: ${colors.palette.blue[600]};
  flex-shrink: 0;
  font-size: 11px;
  font-weight: ${fonts.weight.semiBold};
  line-height: 1.5;
  padding: 2px 8px;
`;

// Only rendered on phones, where the record column is hidden (see columnMixin)
export const StackedRecord = styled.div`
  color: ${colors.secondary};
  display: none;
  font-size: 12px;
  font-variant-numeric: tabular-nums;
  font-weight: ${fonts.weight.medium};
  line-height: 1.4;
  margin-top: 2px;
  white-space: nowrap;

  @media (max-width: ${breakpoints.mini}) {
    display: block;
  }
`;

// The fixed layout lets the player column take the remaining width, so a long username truncates at every breakpoint
export const Table = styled.table`
  ${tableStyle};
  table-layout: fixed;
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

// The tint has to survive the row hover of tableBodyStyle ("tbody tr:hover"), hence the raised specificity
export const TableRow = styled.tr<{$isSelf?: boolean}>`
  ${({$isSelf}) =>
    $isSelf &&
    css`
      &&& {
        background: ${colors.palette.blue[50]};
      }
    `}
`;

export const TableWrapper = styled.div`
  ${tableWrapperStyle};
`;

export const UserCell = styled.div`
  align-items: center;
  display: flex;
  gap: 8px;
  min-width: 0;
`;

export const UserLabel = styled(UUserLabel)`
  @media (max-width: ${breakpoints.mobile}) {
    ${AvatarImg} {
      height: ${`${MOBILE_AVATAR_SIZE}px`};
      width: ${`${MOBILE_AVATAR_SIZE}px`};
    }
  }
`;
