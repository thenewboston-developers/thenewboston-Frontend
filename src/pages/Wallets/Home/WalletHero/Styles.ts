import styled, {css} from 'styled-components';

import {BANNER_ART_ACCENTS} from 'components/BannerArt';
import {BannerArtVariant} from 'enums';
import {colors, fonts, radii} from 'styles';

import {WIDE_LAYOUT_MIN_WIDTH} from '../constants';

const ACTION_HEIGHT = 44;
const COPY_COLOR = 'rgb(255 255 255 / 78%)';
const GLASS_BACKGROUND = 'rgb(255 255 255 / 10%)';
const GLASS_BORDER = 'rgb(255 255 255 / 22%)';
const GLASS_HOVER_BACKGROUND = 'rgb(255 255 255 / 18%)';
const LOGO_SIZE = 52;
const PRIMARY_HOVER_BACKGROUND = 'rgb(255 255 255 / 86%)';

const actionMixin = css`
  align-items: center;
  border-radius: ${radii.medium};
  cursor: pointer;
  display: inline-flex;
  font-family: ${fonts.family.default};
  font-size: 14px;
  font-weight: ${fonts.weight.semiBold};
  gap: 8px;
  justify-content: center;
  min-height: ${`${ACTION_HEIGHT}px`};
  padding: 0 18px;
  text-decoration: none;
  transition:
    background 0.15s ease,
    border-color 0.15s ease;

  &:focus-visible {
    outline: 2px solid ${colors.white};
    outline-offset: 3px;
  }
`;

export const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 24px;
  position: relative;
`;

export const Balance = styled.div`
  align-items: baseline;
  color: ${colors.white};
  display: flex;
  flex-wrap: wrap;
  font-size: clamp(32px, 7cqi, 48px);
  font-variant-numeric: tabular-nums;
  font-weight: ${fonts.weight.bold};
  gap: 0 12px;
  letter-spacing: -0.03em;
  line-height: 1.15;
  overflow-wrap: anywhere;
  position: relative;
`;

export const BalanceLabel = styled.div`
  color: ${BANNER_ART_ACCENTS[BannerArtVariant.coins]};
  font-size: 12px;
  font-weight: ${fonts.weight.semiBold};
  letter-spacing: 0.12em;
  margin: 28px 0 6px;
  position: relative;
  text-transform: uppercase;
`;

export const BalanceTicker = styled.span`
  color: ${COPY_COLOR};
  font-size: 0.45em;
  font-weight: ${fonts.weight.semiBold};
  letter-spacing: 0;
`;

// The surface and the artwork come from BannerArt, which fills the card behind everything else
export const Container = styled.section`
  border-radius: ${radii.large};
  color: ${colors.white};
  container-type: inline-size;
  isolation: isolate;
  overflow: hidden;
  padding: 28px;
  position: relative;

  @container wallets-page (max-width: 520px) {
    padding: 22px 20px;
  }
`;

export const Estimate = styled.p`
  color: ${COPY_COLOR};
  font-size: 14px;
  font-variant-numeric: tabular-nums;
  line-height: 1.5;
  margin: 8px 0 0;
  position: relative;
`;

export const Identity = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  gap: 14px;
  min-width: 0;
`;

export const IdentityText = styled.div`
  min-width: 0;
`;

export const Kind = styled.div`
  color: ${COPY_COLOR};
  font-size: 13px;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Logo = styled.img`
  background: ${GLASS_BACKGROUND};
  border-radius: 50%;
  box-shadow: 0 0 0 2px ${GLASS_BORDER};
  flex-shrink: 0;
  height: ${`${LOGO_SIZE}px`};
  object-fit: cover;
  width: ${`${LOGO_SIZE}px`};
`;

export const PrimaryAction = styled.button`
  ${actionMixin};
  background: ${colors.white};
  border: 1px solid ${colors.white};
  color: ${colors.primary};

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &:hover:not(:disabled) {
    background: ${PRIMARY_HOVER_BACKGROUND};
    border-color: transparent;
  }
`;

export const SecondaryAction = styled.button`
  ${actionMixin};
  background: ${GLASS_BACKGROUND};
  border: 1px solid ${GLASS_BORDER};
  color: ${colors.white};

  &:hover {
    background: ${GLASS_HOVER_BACKGROUND};
    color: ${colors.white};
    text-decoration: none;
  }
`;

// The wallet list sits beside the card on wide pages, so this way into it is only needed on narrow ones
export const SwitchButton = styled.button`
  ${actionMixin};
  background: ${GLASS_BACKGROUND};
  border: 1px solid ${GLASS_BORDER};
  color: ${colors.white};
  flex-shrink: 0;
  gap: 4px;
  min-height: 36px;
  padding: 0 10px 0 14px;

  &:hover {
    background: ${GLASS_HOVER_BACKGROUND};
  }

  @container wallets-page (min-width: ${WIDE_LAYOUT_MIN_WIDTH}) {
    display: none;
  }
`;

export const Ticker = styled.h2`
  color: ${colors.white};
  font-size: 22px;
  font-weight: ${fonts.weight.bold};
  letter-spacing: -0.02em;
  line-height: 1.25;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Top = styled.div`
  align-items: center;
  display: flex;
  gap: 16px;
  justify-content: space-between;
  position: relative;
`;
