import {Link as ULink} from 'react-router-dom';
import UMdiIcon from '@mdi/react';
import styled from 'styled-components';

import {breakpoints, colors, fonts, radii, shadows} from 'styles';

export const Amount = styled.div`
  align-items: baseline;
  display: flex;
  flex-shrink: 0;
  gap: 4px;
  margin-left: auto;
`;

export const AmountValue = styled.span`
  color: ${colors.primary};
  font-size: 16px;
  font-variant-numeric: tabular-nums;
  font-weight: ${fonts.weight.bold};
  letter-spacing: -0.01em;
`;

export const Arrow = styled(UMdiIcon)`
  color: ${colors.secondary};
  flex-shrink: 0;
`;

export const Container = styled.div`
  align-items: center;
  background: ${colors.palette.gray[50]};
  border: 1px solid ${colors.borderSubtle};
  border-radius: ${radii.medium};
  display: flex;
  flex-wrap: wrap;
  gap: 8px 12px;
  margin-top: 12px;
  padding: 12px 16px;

  @media (max-width: ${breakpoints.mini}) {
    margin-left: 16px;
    margin-right: 16px;
  }
`;

export const CurrencyLogo = styled.img`
  background: ${colors.white};
  border: 1px solid ${colors.borderSubtle};
  border-radius: 50%;
  flex-shrink: 0;
  height: 36px;
  object-fit: cover;
  width: 36px;
`;

export const Details = styled.div`
  display: flex;
  flex: 1 1 160px;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
`;

export const Label = styled.div`
  color: ${colors.secondary};
  font-size: 11px;
  font-weight: ${fonts.weight.semiBold};
  letter-spacing: 0.06em;
  text-transform: uppercase;
`;

export const Link = styled(ULink)`
  border-radius: 4px;
  color: ${colors.primary};
  font-size: 14px;
  font-weight: ${fonts.weight.semiBold};
  max-width: 100%;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &:focus-visible {
    box-shadow: ${shadows.focusRing};
    outline: none;
  }
`;

// Wrapping keeps a short name fully readable when the other name is long enough to need the ellipsis
export const Parties = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 0 6px;
  min-width: 0;
`;

export const Ticker = styled.span`
  color: ${colors.secondary};
  font-size: 12px;
  font-weight: ${fonts.weight.semiBold};
`;
