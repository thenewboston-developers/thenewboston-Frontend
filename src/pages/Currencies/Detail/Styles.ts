import styled, {css} from 'styled-components';

import UCurrencyLogo from 'components/CurrencyLogo';
import {colors, fonts} from 'styles';

export const BackButton = styled.button`
  align-items: center;
  background: none;
  border: none;
  color: ${colors.secondary};
  cursor: pointer;
  display: flex;
  font-size: 14px;
  font-weight: ${fonts.weight.medium};
  gap: 8px;
  padding: 0;
  transition: color 0.2s;

  &:hover {
    color: ${colors.primary};
  }

  span {
    font-family: ${fonts.family.default};
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
`;

export const Content = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 24px;
`;

export const CurrencyContent = styled.div`
  flex: 1;
  padding: 24px;
  padding-top: 56px;
`;

export const CurrencyDomain = styled.p`
  color: ${colors.secondary};
  font-size: 16px;
  margin: 0;
`;

export const CurrencyHeader = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
`;

export const CurrencyHeaderInfo = styled.div``;

export const CurrencyLogo = styled(UCurrencyLogo)`
  background: ${colors.white};
  border: 4px solid ${colors.white};
  border-radius: 50%;
  left: 24px;
  position: absolute;
  top: -48px;
`;

export const CurrencyName = styled.h1`
  color: ${colors.primary};
  font-size: 28px;
  font-weight: ${fonts.weight.bold};
  margin: 0 0 8px 0;
`;

export const CurrencyPanel = styled.div`
  align-items: flex-start;
  background: ${colors.white};
  border: 1px solid ${colors.border};
  border-radius: 12px;
  display: flex;
  margin-bottom: 32px;
  margin-top: 48px;
  padding: 0;
  position: relative;
`;

export const Header = styled.div`
  background: ${colors.white};
  border-bottom: 1px solid ${colors.border};
  padding: 20px 24px;
`;

export const OwnerInfo = styled.div`
  color: ${colors.secondary};
  font-size: 14px;
  margin-top: 12px;
`;

export const TypeBadge = styled.span<{$internal: boolean}>`
  border-radius: 12px;
  display: inline-block;
  font-size: 14px;
  font-weight: ${fonts.weight.medium};
  margin-top: 8px;
  padding: 4px 12px;

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
