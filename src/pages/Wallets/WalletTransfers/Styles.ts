import styled from 'styled-components';

import UPagination from 'components/Pagination';
import {breakpoints, colors} from 'styles';

export const Amount = styled.div<{$isReceived: boolean}>`
  color: ${({$isReceived}) => ($isReceived ? colors.palette.green[600] : colors.palette.red[600])};
  font-size: 16px;
  font-weight: 600;
  text-align: right;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const Date = styled.div`
  color: ${colors.palette.gray[600]};
  font-size: 12px;
`;

export const EmptyPageWrapper = styled.div`
  background: ${colors.white};
  border: 1px solid ${colors.border};
  border-radius: 14px;
  box-shadow: 0 3px 6px rgb(140 149 159 / 15%);
  padding: 24px 16px;

  @media (max-width: ${breakpoints.mobile}) {
    padding: 18px 10px;
  }
`;

export const LoaderWrapper = styled.div`
  align-items: center;
  background: ${colors.white};
  border: 1px solid ${colors.border};
  border-radius: 14px;
  box-shadow: 0 3px 6px rgb(140 149 159 / 15%);
  display: flex;
  justify-content: center;
  padding: 24px;
`;

export const Pagination = styled(UPagination)`
  margin-top: 24px;
`;

export const Time = styled.div`
  color: ${colors.palette.gray[500]};
  font-size: 12px;
`;

export const TransferContent = styled.div`
  color: ${colors.palette.gray[800]};
  font-size: 15px;
  line-height: 1.4;
  margin-top: 12px;
  overflow-wrap: break-word;
  white-space: pre-wrap;
  word-wrap: break-word;
`;

export const TransferHeader = styled.div`
  align-items: center;
  display: flex;
`;

export const TransferItem = styled.div`
  align-items: center;
  border-bottom: 1px solid ${colors.palette.gray[200]};
  display: flex;
  justify-content: space-between;
  padding: 16px 0;

  &:last-child {
    border-bottom: none;
  }
`;

export const TransferLeft = styled.div`
  flex: 1;
  min-width: 0;
`;

export const TransferMeta = styled.div`
  align-items: flex-end;
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-top: 4px;
`;

export const TransferRight = styled.div`
  align-items: flex-end;
  display: flex;
  flex-direction: column;
  margin-left: 16px;
`;

export const TransfersList = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 16px;

  @media (max-width: ${breakpoints.mobile}) {
    padding: 0 10px;
  }
`;

export const WhitePanel = styled.div`
  background: ${colors.white};
  border: 1px solid ${colors.border};
  border-radius: 14px;
  box-shadow: 0 3px 6px rgb(140 149 159 / 15%);
`;
