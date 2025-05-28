import styled, {css} from 'styled-components';

import UCurrencyLogo from 'components/CurrencyLogo';
import {colors, fonts} from 'styles';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
`;

export const Header = styled.div`
  background: ${colors.white};
  border-bottom: 1px solid ${colors.border};
  padding: 20px 24px;
`;

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  color: ${colors.secondary};
  cursor: pointer;
  font-size: 14px;
  padding: 0;
  font-weight: ${fonts.weight.medium};
  transition: color 0.2s;

  &:hover {
    color: ${colors.primary};
  }

  span {
    font-family: ${fonts.family.default};
  }
`;

export const Content = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 24px;
`;

export const CurrencyPanel = styled.div`
  background: ${colors.white};
  border: 1px solid ${colors.border};
  border-radius: 12px;
  padding: 0;
  margin-top: 24px;
  margin-bottom: 32px;
  position: relative;
  display: flex;
  align-items: flex-start;
`;

export const CurrencyLogo = styled(UCurrencyLogo)`
  position: absolute;
  top: -28px;
  left: 24px;
  border: 3px solid ${colors.white};
  border-radius: 50%;
  background: ${colors.white};
`;

export const CurrencyContent = styled.div`
  flex: 1;
  padding: 24px;
  padding-top: 36px;
`;

export const CurrencyHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

export const CurrencyHeaderInfo = styled.div``;

export const CurrencyName = styled.h1`
  font-size: 28px;
  font-weight: ${fonts.weight.bold};
  color: ${colors.primary};
  margin: 0 0 8px 0;
`;

export const CurrencyDomain = styled.p`
  font-size: 16px;
  color: ${colors.secondary};
  margin: 0;
`;

export const TypeBadge = styled.span<{$internal: boolean}>`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: ${fonts.weight.medium};
  margin-top: 8px;

  ${({$internal}) =>
    $internal
      ? css`
          background: ${colors.palette.blue[200]};
          color: ${colors.palette.blue[700]};
        `
      : css`
          background: ${colors.palette.green[200]};
          color: ${colors.palette.green[600]};
        `}
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: ${fonts.weight.semiBold};
  color: ${colors.primary};
  margin: 0;
`;

export const MintsTable = styled.table`
  width: 100%;
  background-color: ${colors.white};
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
`;

export const MintsTableHeader = styled.thead``;

export const MintsTableBody = styled.tbody``;

export const MintsTableRow = styled.tr`
  border-bottom: 1px solid ${colors.border};

  &:last-child {
    border-bottom: none;
  }
`;

export const MintsTableHead = styled.th`
  padding: 12px 20px;
  text-align: left;
  font-size: 11px;
  font-weight: ${fonts.weight.semiBold};
  text-transform: uppercase;
  color: ${colors.palette.gray[500]};
  letter-spacing: 0.5px;
  border-bottom: 1px solid ${colors.border};
`;

export const MintsTableData = styled.td`
  padding: 20px;
  font-size: 14px;
  color: ${colors.primary};
`;

export const MintAmount = styled.div`
  font-weight: ${fonts.weight.semiBold};
  font-size: 16px;
`;

export const MintDate = styled.div`
  color: ${colors.secondary};
`;

export const EmptyMints = styled.div`
  text-align: center;
  padding: 60px 20px;
  background-color: ${colors.white};
  border-radius: 12px;
`;

export const EmptyMintsText = styled.div`
  font-size: 16px;
  font-weight: ${fonts.weight.medium};
  color: ${colors.primary};
  margin-bottom: 8px;
`;

export const EmptyMintsSubtext = styled.div`
  font-size: 14px;
  color: ${colors.secondary};
`;

export const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-top: 32px;
`;

export const PageInfo = styled.div`
  font-size: 14px;
  color: ${colors.secondary};
  font-weight: ${fonts.weight.medium};
`;
