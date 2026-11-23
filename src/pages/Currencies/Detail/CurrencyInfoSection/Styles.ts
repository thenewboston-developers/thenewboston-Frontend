import styled from 'styled-components';

import UCurrencyLogo from 'components/CurrencyLogo';
import {Img} from 'components/CurrencyLogo/Styles';
import UIcon from 'components/Icon';
import {Container as UserLabelContainer} from 'components/UserLabel/Styles';
import {breakpoints, cardStyle, colors, eyebrowStyle, fonts, radii} from 'styles';

const LOGO_MOBILE_WIDTH = 64;
const LOGO_WIDTH = 88;

// On phones the buttons move below the logo and the identity, where they share the full width of the panel
export const ActionButtonContainer = styled.div`
  display: flex;
  flex-shrink: 0;
  gap: 8px;

  @media (max-width: ${breakpoints.mini}) {
    flex-basis: 100%;

    > * {
      flex: 1;
    }
  }
`;

export const CurrencyDescription = styled.p`
  color: ${colors.palette.gray[800]};
  font-size: 15px;
  line-height: 1.7;
  margin: 24px 0 0;
  max-width: 76ch;
  overflow-wrap: anywhere;
  white-space: pre-line;
`;

export const CurrencyDomain = styled.div`
  align-items: center;
  color: ${colors.secondary};
  display: flex;
  font-size: 14px;
  gap: 6px;
  min-width: 0;
`;

export const CurrencyDomainText = styled.span`
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const CurrencyLogo = styled(UCurrencyLogo)`
  width: ${`${LOGO_WIDTH}px`};

  ${Img} {
    background: ${colors.white};
    box-shadow: 0 0 0 5px ${colors.palette.gray[100]};
  }

  @media (max-width: ${breakpoints.mini}) {
    width: ${`${LOGO_MOBILE_WIDTH}px`};
  }
`;

export const CurrencyName = styled.h1`
  color: ${colors.primary};
  font-size: 32px;
  font-weight: ${fonts.weight.bold};
  letter-spacing: -0.03em;
  line-height: 1.2;
  margin: 0;
  overflow-wrap: anywhere;

  @media (max-width: ${breakpoints.mini}) {
    font-size: 26px;
  }
`;

export const CurrencyPanel = styled.div`
  ${cardStyle};
  padding: 32px;

  @media (max-width: ${breakpoints.mobile}) {
    padding: 24px 20px;
  }
`;

export const DomainIcon = styled(UIcon)`
  flex-shrink: 0;
`;

export const Identity = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 10px;
  min-width: 0;
`;

export const InternalChip = styled.span`
  background: ${colors.palette.blue[50]};
  border-radius: ${radii.pill};
  color: ${colors.palette.blue[600]};
  flex-shrink: 0;
  font-size: 12px;
  font-weight: ${fonts.weight.semiBold};
  line-height: 1.5;
  padding: 3px 10px;
`;

export const OwnerPrefix = styled.span`
  color: ${colors.secondary};
  flex-shrink: 0;
  font-size: 14px;
`;

export const OwnerRow = styled.div`
  align-items: center;
  display: flex;
  gap: 8px;
  min-width: 0;

  ${UserLabelContainer} {
    gap: 8px;
  }
`;

export const StatLabel = styled.span`
  ${eyebrowStyle};
`;

export const Stats = styled.div`
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  margin-top: 28px;

  @media (max-width: ${breakpoints.tablet}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

export const StatTile = styled.div`
  background: ${colors.palette.gray[50]};
  border-radius: ${radii.medium};
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
  padding: 16px 18px;

  @media (max-width: ${breakpoints.mini}) {
    padding: 14px;
  }
`;

export const StatValue = styled.span`
  color: ${colors.palette.blue[900]};
  font-size: 22px;
  font-variant-numeric: tabular-nums;
  font-weight: ${fonts.weight.bold};
  letter-spacing: -0.03em;
  line-height: 1.25;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: ${breakpoints.mini}) {
    font-size: 17px;
  }
`;

export const Summary = styled.div`
  align-items: center;
  display: flex;
  gap: 24px;

  @media (max-width: ${breakpoints.mini}) {
    flex-wrap: wrap;
    gap: 16px;
  }
`;

export const TitleRow = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 8px 12px;
  min-width: 0;
`;
