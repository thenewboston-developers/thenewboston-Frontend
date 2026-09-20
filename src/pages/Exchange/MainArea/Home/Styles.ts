import {Link as ULink} from 'react-router-dom';
import UMdiIcon from '@mdi/react';
import styled, {css} from 'styled-components';

import UPagination from 'components/Pagination';
import {breakpoints, colors, fonts, pagePadding, radii, shadows} from 'styles';

import {
  contentWidthStyle,
  emptyStateStyle,
  emptySubtextStyle,
  emptyTextStyle,
  loaderPanelStyle,
  NEGATIVE_TEXT_COLOR,
  POSITIVE_TEXT_COLOR,
  tableBodyStyle,
  tableDataStyle,
  tableHeadStyle,
  tableStyle,
  tableWrapperStyle,
  visuallyHiddenStyle,
} from '../mixins';

// Viewport widths (the sidebar included) below which the table runs out of room for its lower priority columns. The
// remaining steps reuse the shared breakpoints
const HIDE_SPARKLINE_BREAKPOINT = '1320px';
const HIDE_VOLUME_BREAKPOINT = '1200px';

// Shared by the head and the data cells. Columns: 1 coin, 2 price, 3 1h, 4 24h, 5 7d, 6 24h volume, 7 market cap and
// 8 sparkline. The lower priority columns are dropped one step at a time as the viewport narrows, until phones are left
// with coin, price and 24h, which fit without scrolling. Whichever column ends up last gets the outer padding of the card.
// The first column is sticky for the rare case where the wrapper still has to scroll horizontally
const columnMixin = css`
  &:first-child {
    left: 0;
    padding-left: 24px;
    position: sticky;
    z-index: 1;
  }

  &:last-child {
    padding-right: 24px;
  }

  @media (max-width: ${HIDE_SPARKLINE_BREAKPOINT}) {
    &:nth-child(7) {
      padding-right: 24px;
    }

    &:nth-child(8) {
      display: none;
    }
  }

  @media (max-width: ${HIDE_VOLUME_BREAKPOINT}) {
    &:nth-child(6) {
      display: none;
    }
  }

  @media (max-width: ${breakpoints.tablet}) {
    &:nth-child(3) {
      display: none;
    }
  }

  @media (max-width: ${breakpoints.mobile}) {
    &:first-child {
      padding-left: 16px;
    }

    &:nth-child(5) {
      display: none;
    }

    &:nth-child(7) {
      padding-right: 16px;
    }
  }

  @media (max-width: ${breakpoints.mini}) {
    &:nth-child(4) {
      padding-right: 16px;
    }

    &:nth-child(7) {
      display: none;
    }
  }
`;

// The triangle only fills the middle of its viewBox, the negative margin pulls it closer to the value
export const ChangeIcon = styled(UMdiIcon)`
  flex-shrink: 0;
  margin: 0 -2px 0 -4px;
`;

// The padding leaves room for the focus ring, the negative margin keeps the logo aligned with the column header
export const CoinLink = styled(ULink)`
  align-items: center;
  border-radius: ${radii.small};
  color: ${colors.primary};
  display: inline-flex;
  gap: 12px;
  margin-left: -4px;
  outline: none;
  padding: 4px 8px 4px 4px;

  &:focus-visible {
    box-shadow: ${shadows.focusRing};
  }

  &:hover {
    text-decoration: none;
  }

  @media (max-width: ${breakpoints.mini}) {
    gap: 8px;
  }
`;

export const Container = styled.div`
  ${pagePadding};
  min-height: 100%;
`;

export const Content = styled.div`
  ${contentWidthStyle};
`;

export const DataCell = styled.td<{$align?: 'left' | 'right'}>`
  ${tableDataStyle};
  ${columnMixin};
  font-variant-numeric: tabular-nums;
  text-align: ${({$align}) => $align || 'left'};
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

export const ErrorMessage = styled.div`
  ${emptyStateStyle};
  ${emptySubtextStyle};
`;

export const HeaderCell = styled.th<{$align?: 'left' | 'right'}>`
  ${tableHeadStyle};
  ${columnMixin};
  text-align: ${({$align}) => $align || 'left'};
`;

export const LoaderPanel = styled.div`
  ${loaderPanelStyle};
`;

export const Logo = styled.img`
  border-radius: 50%;
  flex-shrink: 0;
  height: 32px;
  object-fit: cover;
  width: 32px;

  @media (max-width: ${breakpoints.mini}) {
    height: 28px;
    width: 28px;
  }
`;

export const Pagination = styled(UPagination)`
  margin-top: 24px;
`;

export const PercentageChange = styled.div<{$direction: 'down' | 'flat' | 'up'}>`
  align-items: center;
  color: ${({$direction}) => {
    if ($direction === 'down') return NEGATIVE_TEXT_COLOR;
    if ($direction === 'up') return POSITIVE_TEXT_COLOR;
    return colors.secondary;
  }};
  display: inline-flex;
  font-weight: ${fonts.weight.medium};
  justify-content: flex-end;
  position: relative;
`;

// The button inherits the eyebrow typography of its header cell. The negative margin keeps the label aligned with the
// values of the column, while the padding leaves room for the focus ring
export const SortButton = styled.button<{$isActive: boolean}>`
  align-items: center;
  background: none;
  border: none;
  border-radius: ${radii.small};
  color: ${({$isActive}) => ($isActive ? colors.primary : colors.secondary)};
  cursor: pointer;
  display: inline-flex;
  font: inherit;
  gap: 2px;
  letter-spacing: inherit;
  margin: 0 -6px;
  outline: none;
  padding: 4px 6px;
  text-transform: inherit;
  transition: color 0.15s ease;
  user-select: none;
  white-space: nowrap;

  &:focus-visible {
    box-shadow: ${shadows.focusRing};
  }

  @media (hover: hover) {
    &:hover {
      color: ${colors.primary};
    }
  }
`;

export const SortIcon = styled(UMdiIcon)`
  flex-shrink: 0;
`;

export const SparklineContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
  width: 120px;
`;

export const Table = styled.table`
  ${tableStyle};
`;

export const TableBody = styled.tbody`
  ${tableBodyStyle};

  tr {
    cursor: pointer;
  }
`;

export const TableHeader = styled.thead``;

export const TableRow = styled.tr``;

export const TableWrapper = styled.div`
  ${tableWrapperStyle};
`;

export const Ticker = styled.span`
  color: ${colors.primary};
  font-size: 14px;
  font-weight: ${fonts.weight.semiBold};
`;

export const VisuallyHidden = styled.span`
  ${visuallyHiddenStyle};
`;
