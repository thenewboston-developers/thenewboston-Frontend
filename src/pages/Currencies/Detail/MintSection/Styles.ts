import styled from 'styled-components';

import UPagination from 'components/Pagination';
import {colors, fonts} from 'styles';

export const Amount = styled.div`
  font-size: 16px;
  font-weight: ${fonts.weight.semiBold};
`;

export const Container = styled.div``;

export const Date = styled.div`
  color: ${colors.secondary};
`;

export const EmptyState = styled.div`
  background-color: ${colors.white};
  border-radius: 12px;
  padding: 60px 20px;
  text-align: center;
`;

export const EmptySubtext = styled.div`
  color: ${colors.secondary};
  font-size: 14px;
`;

export const EmptyText = styled.div`
  color: ${colors.primary};
  font-size: 16px;
  font-weight: ${fonts.weight.medium};
  margin-bottom: 8px;
`;

export const Pagination = styled(UPagination)`
  margin-top: 24px;
`;

export const Table = styled.table`
  background-color: ${colors.white};
  border-radius: 12px;
  box-shadow: 0 2px 4px rgb(0 0 0 / 8%);
  overflow: hidden;
  width: 100%;
`;

export const TableBody = styled.tbody``;

export const TableData = styled.td`
  color: ${colors.primary};
  font-size: 14px;
  padding: 16px 24px;
`;

export const TableHead = styled.th`
  border-bottom: 1px solid ${colors.border};
  color: ${colors.palette.gray[500]};
  font-size: 11px;
  font-weight: ${fonts.weight.semiBold};
  padding: 12px 24px;
  text-align: left;
  text-transform: uppercase;
`;

export const TableHeader = styled.thead``;

export const TableRow = styled.tr`
  &:not(:last-child) td {
    border-bottom: 1px solid ${colors.border};
  }
`;
