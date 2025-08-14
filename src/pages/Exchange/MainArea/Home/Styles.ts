import styled, {css} from 'styled-components';

import {breakpoints, colors, fonts} from 'styles';

export const CoinInfo = styled.div`
  align-items: center;
  display: flex;
  gap: 12px;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-height: 100%;
  padding: 24px;

  @media (max-width: ${breakpoints.mobile}) {
    padding: 16px;
  }
`;

export const DataCell = styled.td<{$align?: 'left' | 'right'; $clickable?: boolean; $sticky?: boolean}>`
  background: ${colors.white};
  color: ${colors.primary};
  font-size: 14px;
  padding: 12px 24px;
  text-align: ${({$align}) => $align || 'left'};
  white-space: nowrap;

  ${({$clickable}) =>
    $clickable &&
    css`
      cursor: pointer;
      transition: background-color 0.2s;

      &:hover {
        background-color: ${colors.palette.gray[50]};
      }
    `}

  ${({$sticky}) =>
    $sticky &&
    css`
      left: 0;
      position: sticky;
      z-index: 1;

      @media (max-width: ${breakpoints.tablet}) {
        box-shadow: 2px 0 4px rgba(0, 0, 0, 0.05);
      }
    `}
`;

export const ErrorMessage = styled.div`
  align-items: center;
  color: ${colors.palette.gray[500]};
  display: flex;
  font-size: 16px;
  height: 100%;
  justify-content: center;
`;

export const HeaderCell = styled.th<{$align?: 'left' | 'right'; $clickable?: boolean; $sticky?: boolean}>`
  background: ${colors.white};
  border-bottom: 1px solid ${colors.border};
  color: ${colors.palette.gray[500]};
  font-size: 11px;
  font-weight: ${fonts.weight.semiBold};
  padding: 12px 24px;
  text-align: ${({$align}) => $align || 'left'};
  text-transform: uppercase;

  &:first-child {
    border-top-left-radius: 12px;
  }

  &:last-child {
    border-top-right-radius: 12px;
  }

  ${({$clickable}) =>
    $clickable &&
    css`
      cursor: pointer;
      transition: background-color 0.2s;
      user-select: none;

      &:hover {
        background-color: ${colors.palette.gray[50]};
      }
    `}

  ${({$sticky}) =>
    $sticky &&
    css`
      left: 0;
      position: sticky;
      z-index: 2;
    `}
`;

export const HeaderContent = styled.div<{$align?: 'left' | 'right'}>`
  align-items: center;
  display: flex;
  justify-content: ${({$align}) => ($align === 'right' ? 'flex-end' : 'flex-start')};
`;

export const LoaderContainer = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
`;

export const Logo = styled.img`
  border-radius: 50%;
  height: 32px;
  width: 32px;
`;

export const PercentageChange = styled.div<{$isPositive: boolean}>`
  align-items: center;
  color: ${({$isPositive}) => ($isPositive ? colors.palette.green[600] : colors.palette.red[600])};
  display: inline-flex;
  font-weight: ${fonts.weight.medium};
  justify-content: flex-end;
`;

export const SparklineContainer = styled.div`
  display: inline-block;
  width: 120px;

  @media (max-width: ${breakpoints.desktop}) {
    width: 100px;
  }
`;

export const Table = styled.table`
  background-color: ${colors.white};
  border-collapse: separate;
  border-spacing: 0;
  width: 100%;
`;

export const TableBody = styled.tbody``;

export const TableHeader = styled.thead``;

export const TableRow = styled.tr`
  &:not(:last-child) td {
    border-bottom: 1px solid ${colors.border};
  }

  &:last-child td:first-child {
    border-bottom-left-radius: 12px;
  }

  &:last-child td:last-child {
    border-bottom-right-radius: 12px;
  }
`;

export const TableWrapper = styled.div`
  background-color: ${colors.white};
  border-radius: 12px;
  box-shadow: 0 2px 4px rgb(0 0 0 / 8%);
  overflow-x: auto;

  @media (max-width: ${breakpoints.tablet}) {
    ${Table} {
      min-width: 900px;
    }
  }
`;

export const TickerPair = styled.span`
  color: ${colors.palette.gray[900]};
  font-size: 14px;
  font-weight: ${fonts.weight.medium};
`;
