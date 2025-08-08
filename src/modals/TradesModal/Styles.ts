import styled from 'styled-components';

import UModal from 'components/Modal';
import {breakpoints, colors, fonts} from 'styles';

export const Amount = styled.span`
  font-weight: ${fonts.weight.semiBold};
`;

export const DateContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const Modal = styled(UModal)`
  width: 60%;

  @media (max-width: ${breakpoints.tablet}) {
    width: 90%;
  }
`;

export const Price = styled.span`
  font-weight: ${fonts.weight.medium};
`;

export const Table = styled.table`
  background-color: ${colors.white};
  border-radius: 12px;
  margin-top: 0;
  overflow: hidden;
  width: 100%;
  min-width: 575px;
  border-collapse: collapse;
`;

export const TableBody = styled.tbody``;

export const TableData = styled.td`
  color: ${colors.primary};
  font-size: 14px;
  padding: 16px;

  &:first-child {
    font-weight: ${fonts.weight.semiBold};
    width: 60px;
  }
`;

export const TableHead = styled.th`
  border-bottom: 1px solid ${colors.border};
  color: ${colors.palette.gray[500]};
  font-size: 11px;
  font-weight: ${fonts.weight.semiBold};
  padding: 12px 16px;
  text-align: left;
  text-transform: uppercase;

  &:first-child {
    width: 60px;
  }
`;

export const TableHeader = styled.thead``;

export const TableRow = styled.tr`
  border-bottom: 1px solid ${colors.border};

  &:last-child {
    border-bottom: none;
  }
`;

export const TextMuted = styled.div`
  color: ${colors.secondary};
  font-size: 12px;
  margin-top: 2px;
`;
