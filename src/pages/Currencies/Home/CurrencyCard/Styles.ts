import styled from 'styled-components';

import UCurrencyLogo from 'components/CurrencyLogo';
import {Img} from 'components/CurrencyLogo/Styles';
import {Container as UserLabelContainer} from 'components/UserLabel/Styles';
import {cardStyle, colors, fonts, radii, shadows} from 'styles';

export const Activity = styled.div`
  color: ${colors.secondary};
  flex-shrink: 0;
  font-size: 12px;
  font-variant-numeric: tabular-nums;
  line-height: 1.4;
  white-space: nowrap;
`;

export const Container = styled.div`
  ${cardStyle};
  cursor: pointer;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-width: 0;
  outline: none;
  padding: 20px;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.2s ease;

  &:hover {
    border-color: ${colors.borderDarker};
    box-shadow: ${shadows.cardHover};
  }

  /* The border shares the color of shadows.focusRing, so the border and the ring read as a single outline */
  &:focus-visible {
    border-color: ${colors.palette.blue[500]};
    box-shadow: ${shadows.card}, ${shadows.focusRing};
  }

  @media (prefers-reduced-motion: no-preference) {
    &:hover {
      transform: translateY(-2px);
    }
  }
`;

export const CurrencyLogo = styled(UCurrencyLogo)`
  ${Img} {
    background: ${colors.white};
    box-shadow: 0 0 0 4px ${colors.palette.gray[100]};
  }
`;

export const Description = styled.div`
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  color: ${colors.secondary};
  display: -webkit-box;
  font-size: 14px;
  line-height: 1.55;
  margin-top: 18px;
  overflow: hidden;
  overflow-wrap: anywhere;
`;

export const Domain = styled.div`
  align-items: center;
  color: ${colors.secondary};
  display: flex;
  font-size: 13px;
  gap: 5px;
  line-height: 1.4;
  max-width: 100%;

  svg {
    flex-shrink: 0;
  }
`;

export const DomainText = styled.span`
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Footer = styled.div`
  align-items: center;
  display: flex;
  gap: 12px;
  justify-content: space-between;
  margin-top: auto;
  padding-top: 20px;
`;

export const Header = styled.div`
  align-items: flex-start;
  display: flex;
  gap: 16px;
  min-width: 0;
`;

// The logo is 56px tall, the text block is centered against it
export const HeaderText = styled.div`
  align-items: flex-start;
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 6px;
  justify-content: center;
  min-height: 56px;
  min-width: 0;
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

// The arrow in the corner of the card, tinted while the card is hovered
export const OpenIcon = styled.span`
  align-items: center;
  border-radius: 50%;
  color: ${colors.palette.gray[500]};
  display: flex;
  flex-shrink: 0;
  height: 32px;
  justify-content: center;
  margin: -4px -6px 0 0;
  transition:
    background 0.2s ease,
    color 0.2s ease;
  width: 32px;

  ${Container}:hover & {
    background: ${colors.palette.blue[50]};
    color: ${colors.palette.blue[600]};
  }
`;

// The negative margin and padding leave room for the 2px focus ring of the username link, which would otherwise be
// clipped by the hidden overflow
export const Owner = styled.div`
  margin: -4px;
  min-width: 0;
  overflow: hidden;
  padding: 4px;

  ${UserLabelContainer} {
    gap: 8px;
  }
`;

export const Ticker = styled.div`
  color: ${colors.primary};
  font-size: 18px;
  font-weight: ${fonts.weight.bold};
  letter-spacing: -0.02em;
  line-height: 1.3;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
