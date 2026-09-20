import {Link as ULink} from 'react-router-dom';
import styled from 'styled-components';

import {colors, fonts, radii, shadows} from 'styles';

export const Amount = styled.span`
  color: ${colors.primary};
  font-size: 12px;
  font-variant-numeric: tabular-nums;
  font-weight: ${fonts.weight.semiBold};
  line-height: 1;
`;

export const Container = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  justify-content: flex-end;
  min-width: 0;
`;

export const CurrencyLogo = styled.img`
  border-radius: 50%;
  flex-shrink: 0;
  height: 16px;
  object-fit: cover;
  width: 16px;
`;

export const TipItem = styled(ULink)`
  align-items: center;
  background: ${colors.palette.gray[50]};
  border: 1px solid ${colors.borderSubtle};
  border-radius: ${radii.pill};
  display: flex;
  gap: 6px;
  height: 28px;
  padding: 0 10px 0 6px;
  text-decoration: none;
  transition:
    background 0.15s ease,
    border-color 0.15s ease;

  &:focus-visible {
    box-shadow: ${shadows.focusRing};
    outline: none;
  }

  /* GlobalStyle underlines every hovered anchor, which includes the sticky hover a tap leaves behind on touch screens */
  &:hover {
    text-decoration: none;
  }

  @media (hover: hover) {
    &:hover {
      background: ${colors.whiteHover};
      border-color: ${colors.borderDarker};
    }
  }
`;
