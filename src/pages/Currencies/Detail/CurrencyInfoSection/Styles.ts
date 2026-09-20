import styled from 'styled-components';

import UCurrencyLogo from 'components/CurrencyLogo';
import UIcon from 'components/Icon';
import {breakpoints, cardStyle, colors, fonts, radii, shadows} from 'styles';

const BANNER_HEIGHT = 96;
const LOGO_RING_WIDTH = 4;
const LOGO_WIDTH = 88;
const LOGO_OVERLAP = (LOGO_WIDTH + LOGO_RING_WIDTH * 2) / 2;

export const ActionButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: flex-end;
  margin-top: 12px;
`;

export const Banner = styled.div`
  background:
    radial-gradient(circle at 88% -40%, ${colors.palette.blue[100]} 0%, transparent 60%),
    linear-gradient(135deg, ${colors.palette.blue[50]} 0%, ${colors.palette.gray[100]} 100%);
  border-bottom: 1px solid ${colors.borderSubtle};
  height: ${`${BANNER_HEIGHT}px`};
`;

export const Body = styled.div`
  padding: 0 24px 24px;

  @media (max-width: ${breakpoints.mobile}) {
    padding: 0 16px 16px;
  }
`;

export const CurrencyDescription = styled.p`
  color: ${colors.secondary};
  font-size: 15px;
  line-height: 1.6;
  margin: 16px 0 0;
  max-width: 70ch;
  overflow-wrap: anywhere;
`;

// Identity aligns its children to flex-start, which sizes them to fit their content on the cross axis. min-width has no
// effect on that axis, so max-width is what keeps a long domain inside of the panel and lets the text truncate
export const CurrencyDomain = styled.div`
  align-items: center;
  color: ${colors.secondary};
  display: flex;
  font-size: 14px;
  gap: 6px;
  max-width: 100%;
  min-width: 0;
`;

export const CurrencyDomainText = styled.span`
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const CurrencyLogo = styled(UCurrencyLogo)`
  background: ${colors.white};
  border: ${`${LOGO_RING_WIDTH}px`} solid ${colors.white};
  border-radius: 50%;
  box-shadow: ${shadows.card};
  margin-top: ${`-${LOGO_OVERLAP}px`};
  position: relative;
`;

export const CurrencyName = styled.h1`
  color: ${colors.primary};
  font-size: 28px;
  font-weight: ${fonts.weight.bold};
  letter-spacing: -0.01em;
  line-height: 1.2;
  margin: 0;
  overflow-wrap: anywhere;
`;

export const CurrencyPanel = styled.div`
  ${cardStyle};
  overflow: hidden;
`;

export const DomainIcon = styled(UIcon)`
  flex-shrink: 0;
`;

export const HeaderRow = styled.div`
  align-items: flex-start;
  display: flex;
  gap: 24px;
  justify-content: space-between;
  margin-top: 12px;

  @media (max-width: ${breakpoints.mobile}) {
    flex-direction: column;
    gap: 16px;
  }
`;

export const Identity = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;

  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
  }
`;

export const InternalChip = styled.span`
  background: ${colors.palette.blue[50]};
  border-radius: ${radii.pill};
  color: ${colors.palette.blue[600]};
  font-size: 11px;
  font-weight: ${fonts.weight.semiBold};
  line-height: 1.5;
  padding: 2px 8px;
`;

export const MetadataRow = styled.div`
  align-items: center;
  border-top: 1px solid ${colors.borderSubtle};
  display: flex;
  gap: 24px;
  justify-content: space-between;
  margin-top: 20px;
  padding-top: 16px;

  @media (max-width: ${breakpoints.mobile}) {
    align-items: flex-start;
    flex-direction: column;
    gap: 16px;

    /* The stacked children are sized to fit their content, the limit lets a long owner username truncate */
    > * {
      max-width: 100%;
    }
  }
`;

export const StatLabel = styled.span`
  color: ${colors.secondary};
  font-size: 11px;
  font-weight: ${fonts.weight.semiBold};
  letter-spacing: 0.06em;
  text-transform: uppercase;
`;

export const StatTile = styled.div`
  background: ${colors.palette.gray[50]};
  border: 1px solid ${colors.borderSubtle};
  border-radius: ${radii.medium};
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  gap: 4px;
  min-width: 180px;
  padding: 12px 16px;

  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
  }
`;

export const StatValue = styled.span`
  color: ${colors.primary};
  font-size: 24px;
  font-variant-numeric: tabular-nums;
  font-weight: ${fonts.weight.semiBold};
  letter-spacing: -0.01em;
  line-height: 1.2;
`;

export const TopRow = styled.div`
  align-items: flex-start;
  display: flex;
  gap: 16px;
  justify-content: space-between;
`;
