import styled, {css} from 'styled-components';

import {colors, fonts} from 'styles';

export const Container = styled.div`
  padding: 24px;
  max-width: 800px;
  margin: 0 auto;
`;

export const Header = styled.div`
  margin-bottom: 32px;
`;

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  color: ${colors.palette.gray[600]};
  cursor: pointer;
  font-size: 14px;
  padding: 0;

  &:hover {
    color: ${colors.palette.gray[700]};
  }
`;

export const CurrencyInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 48px;
  padding: 24px;
  background: ${colors.palette.gray[100]};
  border-radius: 8px;
`;

export const CurrencyDetails = styled.div`
  flex: 1;
`;

export const Ticker = styled.h1`
  margin: 0 0 8px 0;
  font-size: 32px;
  font-weight: ${fonts.weight.bold};
`;

export const Domain = styled.p`
  margin: 0 0 12px 0;
  color: ${colors.palette.gray[600]};
  font-size: 16px;
`;

export const TypeBadge = styled.span<{$internal: boolean}>`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: ${fonts.weight.semiBold};

  ${({$internal}) =>
    $internal
      ? css`
          background: ${colors.palette.blue[100]};
          color: ${colors.palette.blue[700]};
        `
      : css`
          background: ${colors.palette.green[100]};
          color: ${colors.palette.green[600]};
        `}
`;

export const MintSection = styled.div`
  background: white;
  border: 1px solid ${colors.border};
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 24px;
`;

export const SectionTitle = styled.h2`
  margin: 0 0 24px 0;
  font-size: 20px;
  font-weight: ${fonts.weight.semiBold};
`;

export const MintInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
`;

export const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;

  span {
    color: ${colors.palette.gray[600]};
  }

  strong {
    font-weight: ${fonts.weight.semiBold};
  }
`;

export const MintForm = styled.div`
  display: flex;
  gap: 12px;
  align-items: flex-start;
`;

export const Input = styled.input`
  flex: 1;
  padding: 10px 12px;
  border: 1px solid ${colors.border};
  border-radius: 4px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: ${colors.palette.blue[500]};
  }

  &:disabled {
    background: ${colors.palette.gray[100]};
    cursor: not-allowed;
  }
`;

export const Warning = styled.p`
  margin: 16px 0 0 0;
  padding: 12px;
  background: ${colors.palette.orange[100]};
  color: ${colors.palette.orange[500]};
  border-radius: 4px;
  font-size: 14px;
`;

export const InfoSection = styled.div`
  margin-bottom: 24px;
`;

export const InfoText = styled.div`
  padding: 24px;
  background: ${colors.palette.gray[100]};
  border-radius: 8px;

  strong {
    display: block;
    margin-bottom: 8px;
    font-weight: ${fonts.weight.semiBold};
    font-size: 16px;
  }

  p {
    margin: 0;
    color: ${colors.palette.gray[600]};
    font-size: 14px;
    line-height: 1.5;
  }
`;

export const MintsSection = styled.div`
  background: white;
  border: 1px solid ${colors.border};
  border-radius: 8px;
  padding: 24px;
  margin-top: 24px;
`;

export const MintsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const MintItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: ${colors.palette.gray[100]};
  border-radius: 6px;
`;

export const MintAmount = styled.div`
  font-size: 18px;
  font-weight: ${fonts.weight.semiBold};
`;

export const MintDate = styled.div`
  font-size: 14px;
  color: ${colors.palette.gray[600]};
`;

export const EmptyMints = styled.div`
  text-align: center;
  padding: 40px;
  color: ${colors.palette.gray[500]};
  font-size: 16px;
`;

export const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid ${colors.border};
`;

export const PageInfo = styled.div`
  font-size: 14px;
  color: ${colors.palette.gray[600]};
`;
