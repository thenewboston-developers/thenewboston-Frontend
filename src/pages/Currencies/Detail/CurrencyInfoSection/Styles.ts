import styled from 'styled-components';

import UCurrencyLogo from 'components/CurrencyLogo';
import {colors, fonts} from 'styles';

export const CurrencyContent = styled.div`
  padding: 100px 24px 24px 24px; /* Top padding for logo overlap */
`;

export const CurrencyDescription = styled.p`
  color: ${colors.secondary};
  font-size: 14px;
  line-height: 1.5;
  margin: 12px 0 0;
`;

export const CurrencyDomain = styled.p`
  color: ${colors.secondary};
  font-size: 16px;
  margin: 0;
`;

export const CurrencyInfo = styled.div`
  flex: 1;
`;

export const CurrencyInfoContainer = styled.div`
  align-items: flex-start;
  display: flex;
  gap: 48px;
  justify-content: space-between;
`;

export const CurrencyLogo = styled(UCurrencyLogo)`
  background: ${colors.white};
  border-radius: 50%;
  box-shadow:
    0 4px 6px rgba(0, 0, 0, 0.1),
    0 1px 3px rgba(0, 0, 0, 0.08);
  left: 24px;
  padding: 4px;
  position: absolute;
  top: -75px;
`;

export const CurrencyName = styled.h1`
  color: ${colors.primary};
  font-size: 28px;
  font-weight: ${fonts.weight.bold};
  margin: 0 0 8px;
`;

export const CurrencyPanel = styled.div`
  background: ${colors.white};
  border: 1px solid ${colors.border};
  border-radius: 12px;
  box-shadow: 0 2px 4px rgb(0 0 0 / 8%);
  margin-bottom: 32px;
  margin-top: 75px;
  padding: 0;
  position: relative;
`;

export const MetadataRow = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
`;

export const TotalMintedInfo = styled.div`
  align-items: flex-end;
  display: flex;
  flex-direction: column;
`;

export const TotalMintedLabel = styled.span`
  color: ${colors.secondary};
  font-size: 14px;
  font-weight: ${fonts.weight.regular};
  margin-bottom: 4px;
`;

export const TotalMintedValue = styled.span`
  color: ${colors.primary};
  font-size: 24px;
  font-weight: ${fonts.weight.semiBold};
`;

export const TradeButtonContainer = styled.div`
  margin-top: 16px;
`;
