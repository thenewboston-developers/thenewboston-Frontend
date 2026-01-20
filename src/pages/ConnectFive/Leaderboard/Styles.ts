import styled from 'styled-components';

import UAvatar from 'components/Avatar';
import UPagination from 'components/Pagination';
import {colors, fonts, hiddenScroll, pagePadding} from 'styles';

export const Avatar = styled(UAvatar)`
  border: 2px solid ${colors.white};
`;

export const Container = styled.div`
  ${hiddenScroll};
  ${pagePadding};
  height: 100%;
  overflow-y: auto;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin: 0 auto;
  max-width: 960px;
`;

export const EmptyState = styled.div`
  color: ${colors.secondary};
  font-size: 14px;
  padding: 32px 0;
  text-align: center;
`;

export const Header = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

export const LeaderboardTitle = styled.h1`
  color: ${colors.primary};
  font-size: 22px;
  margin: 0;
`;

export const Pagination = styled(UPagination)`
  align-self: center;
  margin-top: 12px;
`;

export const Record = styled.span`
  color: ${colors.primary};
  font-weight: ${fonts.weight.semiBold};
`;

export const Table = styled.table`
  background-color: ${colors.white};
  border: 1px solid ${colors.border};
  border-radius: 16px;
  box-shadow: 0 2px 6px rgb(0 0 0 / 8%);
  overflow: hidden;
  width: 100%;
`;

export const TableBody = styled.tbody``;

export const TableData = styled.td`
  color: ${colors.primary};
  font-size: 14px;
  padding: 16px 20px;

  &:first-child {
    color: ${colors.palette.gray[600]};
    font-weight: ${fonts.weight.semiBold};
    text-align: center;
    width: 60px;
  }

  &:last-child {
    text-align: right;
  }
`;

export const TableHead = styled.th`
  border-bottom: 1px solid ${colors.border};
  color: ${colors.palette.gray[500]};
  font-size: 11px;
  font-weight: ${fonts.weight.semiBold};
  padding: 12px 20px;
  text-align: left;
  text-transform: uppercase;

  &:first-child {
    text-align: center;
    width: 60px;
  }

  &:last-child {
    text-align: right;
  }
`;

export const TableHeader = styled.thead``;

export const TableRow = styled.tr`
  &:not(:last-child) td {
    border-bottom: 1px solid ${colors.border};
  }
`;

export const TableWrapper = styled.div`
  width: 100%;
`;

export const UserCell = styled.div`
  align-items: center;
  display: flex;
  gap: 12px;
`;

export const Username = styled.span`
  color: ${colors.primary};
  font-weight: ${fonts.weight.semiBold};
  text-decoration: none;

  &:hover {
    color: ${colors.palette.blue[700]};
  }
`;
