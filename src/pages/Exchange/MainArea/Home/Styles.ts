import styled, {css} from 'styled-components';

import {breakpoints, colors, fonts} from 'styles';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  padding: 24px;

  @media (max-width: ${breakpoints.mobile}) {
    padding: 16px;
  }
`;

export const DataCell = styled.td<{$sticky?: boolean}>`
  background: ${colors.white};
  font-size: 14px;
  padding: 16px 12px;
  white-space: nowrap;

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

export const HeaderCell = styled.th<{$sticky?: boolean}>`
  background: ${colors.white};
  color: ${colors.palette.gray[600]};
  font-size: 12px;
  font-weight: ${fonts.weight.semiBold};
  padding: 12px;
  text-align: left;
  text-transform: uppercase;

  ${({$sticky}) =>
    $sticky &&
    css`
      left: 0;
      position: sticky;
      z-index: 2;
    `}
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

export const MarketInfo = styled.div`
  align-items: center;
  display: flex;
  gap: 12px;
`;

export const PercentageChange = styled.span<{$isPositive: boolean}>`
  color: ${({$isPositive}) => ($isPositive ? colors.palette.green[600] : colors.palette.red[600])};
  font-weight: ${fonts.weight.medium};
`;

export const SparklineContainer = styled.div`
  width: 120px;

  @media (max-width: ${breakpoints.desktop}) {
    width: 100px;
  }
`;

export const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
`;

export const TableBody = styled.tbody``;

export const TableHeader = styled.thead`
  border-bottom: 1px solid ${colors.palette.gray[200]};
`;

export const TableRow = styled.tr`
  border-bottom: 1px solid ${colors.palette.gray[100]};

  &:hover {
    background: ${colors.palette.gray[50]};
  }
`;

export const TableWrapper = styled.div`
  flex: 1;
  overflow: auto;

  @media (max-width: ${breakpoints.tablet}) {
    overflow-x: auto;

    ${Table} {
      min-width: 800px;
    }
  }
`;

export const TickerPair = styled.span`
  color: ${colors.palette.gray[900]};
  font-size: 14px;
  font-weight: ${fonts.weight.medium};
`;
