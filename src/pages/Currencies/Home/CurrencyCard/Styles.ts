import styled from 'styled-components';

import UCurrencyLogo from 'components/CurrencyLogo';
import {Img} from 'components/CurrencyLogo/Styles';
import {cardStyle, colors, fonts, radii, shadows} from 'styles';

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  min-width: 0;
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
    border: 1px solid ${colors.borderSubtle};
  }
`;

export const Description = styled.div`
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  color: ${colors.secondary};
  display: -webkit-box;
  font-size: 14px;
  line-height: 1.5;
  margin-top: 14px;
  overflow: hidden;
  overflow-wrap: anywhere;
`;

export const Domain = styled.div`
  color: ${colors.secondary};
  font-size: 13px;
  line-height: 1.4;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Footer = styled.div`
  align-items: center;
  border-top: 1px solid ${colors.borderSubtle};
  display: flex;
  gap: 12px;
  justify-content: space-between;
  margin-top: auto;
  padding-top: 12px;
`;

export const Header = styled.div`
  align-items: center;
  display: flex;
  gap: 14px;
  min-width: 0;
`;

export const HeaderText = styled.div`
  align-items: flex-start;
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 4px;
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

// The negative margin and padding leave room for the 2px focus ring of the username link, which would otherwise be
// clipped by the hidden overflow
export const Owner = styled.div`
  margin: -4px;
  min-width: 0;
  overflow: hidden;
  padding: 4px;
`;

export const Ticker = styled.div`
  color: ${colors.primary};
  font-size: 17px;
  font-weight: ${fonts.weight.bold};
  letter-spacing: -0.01em;
  line-height: 1.3;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
